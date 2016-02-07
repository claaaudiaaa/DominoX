/// <reference path = "../Interfaces.ts"/>
/// <reference path = "../dominoModels/DominoTile.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>
var dominox;
(function (dominox) {
    var TileRectangle = (function () {
        function TileRectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        TileRectangle.prototype.containsPoint = function (x, y) {
            var containsX = this.x <= x && x <= this.x + this.width;
            var containsY = this.y <= y && y <= this.y + this.height;
            return (containsX && containsY);
        };
        return TileRectangle;
    })();
    dominox.TileRectangle = TileRectangle;
    var SimpleCanvasTileBoardView = (function () {
        function SimpleCanvasTileBoardView(canvas, imagesContainer, matrixPresenter) {
            this.paddingLeft = 100;
            this.paddingTop = 100;
            this.tileWidth = 32;
            this.tileHeight = 64;
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.imagesContainer = imagesContainer;
            this.matrixPresenter = matrixPresenter;
            printChildren(imagesContainer);
        }
        SimpleCanvasTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        SimpleCanvasTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
        };
        SimpleCanvasTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            this.drawActualTilesFromMatrix(matrix);
            this.fillContextWithRectangles(matrix, this.context);
        };
        SimpleCanvasTileBoardView.prototype.drawActualTilesFromMatrix = function (matrix) {
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] != null) {
                        this.drawTileAtIndexes(matrix[i][j], i, j, matrix);
                    }
                }
            }
        };
        SimpleCanvasTileBoardView.prototype.drawTileAtIndexes = function (tile, line, column, matrix) {
            var rectangle = this.getRectangleForIndex(line, column);
            rectangle = this.getRectangleForTileAtIndexInMatrix(tile, line, column, matrix);
            console.log("Rectangle for tile " + tile.toString() + "is ");
            console.log("" + rectangle.x + ", " + rectangle.y + ", " + rectangle.width + ", " +
                rectangle.height);
            var rotationAngle = this.getRotationAngleInDegreesForTile(tile);
            var image = this.getImageForTile(tile);
            this.drawImageOnContext(this.context, image, rectangle, rotationAngle);
        };
        SimpleCanvasTileBoardView.prototype.computeCellSizeGivenWidthAndHeight = function (width, height) {
            return 64;
        };
        SimpleCanvasTileBoardView.prototype.getRectangleForIndex = function (line, column) {
            var x = column * this.tileWidth + this.paddingLeft;
            var y = line * this.tileHeight + this.paddingTop;
            console.log("x, y for " + line + ", " + column + " are " + x + ", " + y);
            console.log("width " + this.tileWidth + ", height " + this.tileHeight);
            return new TileRectangle(x, y, this.tileWidth, this.tileHeight);
        };
        SimpleCanvasTileBoardView.prototype.getRectangleForTileAtIndexInMatrix = function (tile, line, column, matrix) {
            var normalNonRotatedVerticalFirstUpRect = this.getRectangleForIndex(line, column);
            var orientation = tile.getOrientation();
            if (dominox.isVertical(orientation))
                return normalNonRotatedVerticalFirstUpRect;
            if (dominox.isHorizontal(orientation)) {
                return new TileRectangle(normalNonRotatedVerticalFirstUpRect.x, normalNonRotatedVerticalFirstUpRect.y + normalNonRotatedVerticalFirstUpRect.height / 4, normalNonRotatedVerticalFirstUpRect.height, normalNonRotatedVerticalFirstUpRect.width);
            }
            if (dominox.DominoTileOrientation.VerticalSecondUpFirstDown == orientation)
                return new TileRectangle(normalNonRotatedVerticalFirstUpRect.x +
                    normalNonRotatedVerticalFirstUpRect.width, normalNonRotatedVerticalFirstUpRect.y + normalNonRotatedVerticalFirstUpRect.height, normalNonRotatedVerticalFirstUpRect.width, normalNonRotatedVerticalFirstUpRect.height);
            return null;
        };
        SimpleCanvasTileBoardView.prototype.getRotationAngleInDegreesForTile = function (tile) {
            //the tile image is drawn as according to Vertical First Up Second Down
            var orientation = tile.getOrientation();
            switch (orientation) {
                case dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight:
                    return -90;
                    break;
                case dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight:
                    return 90;
                    break;
                case dominox.DominoTileOrientation.VerticalFirstUpSecondDown:
                    return 0;
                    break;
                case dominox.DominoTileOrientation.VerticalSecondUpFirstDown:
                    return 180;
                    break;
            }
            return 0;
        };
        SimpleCanvasTileBoardView.prototype.getImageForTile = function (tile) {
            var imageClassName = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond();
            var elements = this.imagesContainer.getElementsByClassName(imageClassName);
            var image = elements[0];
            console.log("image class name " + imageClassName);
            return image;
        };
        SimpleCanvasTileBoardView.prototype.drawImageOnContext = function (context, image, rectangle, rotatedAroundCenter) {
            var self = this;
            var imageCallback = function (event) {
                image.width = rectangle.width;
                image.height = rectangle.height;
                drawRotatedImage(self.context, image, rectangle.x, rectangle.y, rectangle.width, rectangle.height, rotatedAroundCenter);
            };
            if (image.complete)
                imageCallback(null);
            else
                image.onload = imageCallback;
        };
        SimpleCanvasTileBoardView.prototype.fillContextWithRectangles = function (matrix, context) {
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    var rectangle = this.getRectangleForIndex(i, j);
                    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                    context.stroke();
                }
            }
        };
        return SimpleCanvasTileBoardView;
    })();
    dominox.SimpleCanvasTileBoardView = SimpleCanvasTileBoardView;
    function drawRotatedImage(context, image, x, y, imageWidth, imageHeight, angle) {
        var TO_RADIANS = Math.PI / 180;
        // save the current co-ordinate system 
        // before we screw with it
        context.save();
        // move to the middle of where we want to draw our image
        context.translate(x, y);
        // rotate around that point, converting our 
        // angle from degrees to radians 
        context.rotate(angle * TO_RADIANS);
        // draw it up and to the left by half the width
        // and height of the image 
        context.drawImage(image, -(imageWidth / 2), -(imageHeight / 2));
        // and restore the co-ords to how they were when we began
        context.restore();
    }
    dominox.drawRotatedImage = drawRotatedImage;
    function printChildren(element) {
        var children = element.children;
        for (var i = 0; i < children.length; i++) {
            var c = children[i];
            console.log(c.tagName + " " + c.getAttribute("class"));
        }
    }
})(dominox || (dominox = {}));
//# sourceMappingURL=SimpleCanvasTileBoardView.js.map