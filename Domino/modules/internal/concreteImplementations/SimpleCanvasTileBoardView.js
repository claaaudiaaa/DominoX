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
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.imagesContainer = imagesContainer;
            this.matrixPresenter = matrixPresenter;
        }
        SimpleCanvasTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        SimpleCanvasTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
        };
        SimpleCanvasTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] != null) {
                        this.drawTileAtIndexes(matrix[i][j], i, j);
                    }
                }
            }
        };
        SimpleCanvasTileBoardView.prototype.drawTileAtIndexes = function (tile, line, column) {
            var rectangle = this.getRectangleForIndex(line, column);
            var rotationAngle = this.getRotationAngleInDegreesForTile(tile);
            var image = this.getImageForTile(tile);
            this.drawImageOnContext(this.context, image, rectangle, rotationAngle);
        };
        SimpleCanvasTileBoardView.prototype.computeCellSizeGivenWidthAndHeight = function (width, height) {
            return 64;
        };
        SimpleCanvasTileBoardView.prototype.getRectangleForIndex = function (line, column) {
            return new TileRectangle(column * 64 + this.paddingLeft, line * 64 + this.paddingTop, 64, 64);
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
            var imageClassName = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond;
            var image = this.imagesContainer.getElementsByClassName(imageClassName)[0];
            return image;
        };
        SimpleCanvasTileBoardView.prototype.drawImageOnContext = function (context, image, rectangle, rotatedAroundCenter) {
            image.width = rectangle.width;
            image.height = rectangle.height;
            var self = this;
            var imageCallback = function (event) {
                drawRotatedImage(self.context, image, rectangle.x, rectangle.y, rotatedAroundCenter);
            };
            if (image.complete)
                imageCallback(null);
            else
                image.onload = imageCallback;
        };
        return SimpleCanvasTileBoardView;
    })();
    dominox.SimpleCanvasTileBoardView = SimpleCanvasTileBoardView;
    function drawRotatedImage(context, image, x, y, angle) {
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
        context.drawImage(image, -(image.width / 2), -(image.height / 2));
        // and restore the co-ords to how they were when we began
        context.restore();
    }
    dominox.drawRotatedImage = drawRotatedImage;
})(dominox || (dominox = {}));
//# sourceMappingURL=SimpleCanvasTileBoardView.js.map