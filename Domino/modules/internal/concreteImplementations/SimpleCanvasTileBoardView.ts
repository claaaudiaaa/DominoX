/// <reference path = "../Interfaces.ts"/>
/// <reference path = "../dominoModels/DominoTile.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>

module dominox
{
    export class TileRectangle {
        public x: number;
        public y: number;
        public width: number;
        public height: number;

        constructor(x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        public containsPoint(x: number, y: number): boolean
        {
            var containsX: boolean = this.x <= x && x <= this.x + this.width;
            var containsY: boolean = this.y <= y && y <= this.y + this.height;

            return (containsX && containsY);
        }
  
    }

    export class SimpleCanvasTileBoardView implements dominox.TileBoardView
    {
        private paddingLeft: number = 100;
        private paddingTop: number = 100;
        private tileWidth: number = 32;
        private tileHeight: number = 64;

        private context: CanvasRenderingContext2D;
        private canvas: HTMLCanvasElement;
        private imagesContainer: HTMLDivElement;
        private matrixPresenter: TileMatrixPresenter;

        constructor(canvas: HTMLCanvasElement, imagesContainer: HTMLDivElement, matrixPresenter: TileMatrixPresenter)
        {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.imagesContainer = imagesContainer;
            this.matrixPresenter = matrixPresenter;

            printChildren(imagesContainer);
        }

        drawTileAsNeighbourOfTileFromBoard(tile: dominox.DominoTile, neighbour: dominox.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback)
        {

        }

        highlightListOfTilesFromBoard(tiles: dominox.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void
        {

        }

        displayAsNormalTileBoard(tileBoard: TileBoard, callbackWhenDone: VoidCallback)
        {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            
            this.drawActualTilesFromMatrix(matrix);
            this.fillContextWithRectangles(matrix, this.context);

        }

        drawActualTilesFromMatrix(matrix: Array<Array<DominoTile>>)
        {
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] != null) {
                        this.drawTileAtIndexes(matrix[i][j], i, j, matrix);
                    }
                }
            }
        }

        drawTileAtIndexes(tile: DominoTile, line: number, column: number, matrix: DominoTile[][])
        {
            var rectangle = this.getRectangleForIndex(line, column);
            rectangle = this.getRectangleForTileAtIndexInMatrix(tile, line, column, matrix);

            console.log("Rectangle for tile " + tile.toString() + "is ");
            console.log("" + rectangle.x + ", " + rectangle.y + ", " + rectangle.width + ", " +
                rectangle.height);

            var rotationAngle = this.getRotationAngleInDegreesForTile(tile);
            var image = this.getImageForTile(tile);

            this.drawImageOnContext(this.context, image, rectangle, rotationAngle);
        }

        computeCellSizeGivenWidthAndHeight(width: number, height: number): number
        {
            return 64;
        }

        getRectangleForIndex(line: number, column: number): TileRectangle
        {
            var x = column * this.tileWidth + this.paddingLeft;
            var y = line * this.tileHeight + this.paddingTop;
            console.log("x, y for " + line + ", " + column + " are " + x + ", " + y);
            console.log("width " + this.tileWidth + ", height " + this.tileHeight);
            return new TileRectangle(x, y, this.tileWidth, this.tileHeight);
        }

        getRectangleForTileAtIndexInMatrix(tile: DominoTile, line: number, column: number, matrix:
            DominoTile[][]): TileRectangle
        {
            var normalNonRotatedVerticalFirstUpRect = this.getRectangleForIndex(line, column);

            var orientation = tile.getOrientation();
            if (dominox.isVertical(orientation))
                return normalNonRotatedVerticalFirstUpRect;

            if (dominox.isHorizontal(orientation))
            {

                return new TileRectangle(normalNonRotatedVerticalFirstUpRect.x,
                    normalNonRotatedVerticalFirstUpRect.y + normalNonRotatedVerticalFirstUpRect.height / 4,
                    normalNonRotatedVerticalFirstUpRect.height, normalNonRotatedVerticalFirstUpRect.width);
            }

            if (DominoTileOrientation.VerticalSecondUpFirstDown == orientation)
                return new TileRectangle(normalNonRotatedVerticalFirstUpRect.x +
                    normalNonRotatedVerticalFirstUpRect.width,
                    normalNonRotatedVerticalFirstUpRect.y + normalNonRotatedVerticalFirstUpRect.height,
                    normalNonRotatedVerticalFirstUpRect.width, normalNonRotatedVerticalFirstUpRect.height);
            return null;
        }

        getRotationAngleInDegreesForTile(tile: DominoTile): number
        {
            //the tile image is drawn as according to Vertical First Up Second Down
            var orientation = tile.getOrientation();

            switch (orientation)
            {
                case DominoTileOrientation.HorizontalFirstLeftSecondRight:
                    return -90; break;
                case DominoTileOrientation.HorizontalSecondLeftFirstRight:
                    return 90; break;
                case DominoTileOrientation.VerticalFirstUpSecondDown:
                    return 0; break;
                case DominoTileOrientation.VerticalSecondUpFirstDown:
                    return 180; break;
            }

            return 0;
        }

        getImageForTile(tile: DominoTile): HTMLImageElement
        {
            var imageClassName:string = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond();
            var elements = this.imagesContainer.getElementsByClassName(imageClassName);
            var image: HTMLImageElement = <HTMLImageElement>elements[0];

            console.log("image class name " + imageClassName);

            return image;
        }


        drawImageOnContext(context: CanvasRenderingContext2D,
            image: HTMLImageElement, rectangle: TileRectangle, rotatedAroundCenter: number): void
        {

            var self = this;

            var imageCallback = function (event: any)
            {
                image.width = rectangle.width;
                image.height = rectangle.height;

                drawRotatedImage(self.context, image,
                    rectangle.x, rectangle.y, rectangle.width,
                    rectangle.height, rotatedAroundCenter);
            };

            if (image.complete)
                imageCallback(null);
            else
                image.onload = imageCallback;

        }

        fillContextWithRectangles(matrix: Array<Array<DominoTile>>, context: CanvasRenderingContext2D)
        {
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++)
                {
                    var rectangle = this.getRectangleForIndex(i, j);
                    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                    context.stroke();
                }
            }
        }

    }


    export function drawRotatedImage(context: CanvasRenderingContext2D,
        image: HTMLImageElement, x: number, y: number, imageWidth: number,
        imageHeight: number, angle: number)
    { 
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

    function printChildren(element: HTMLElement)
    {
        var children = element.children;
        for (var i = 0; i < children.length; i++) {
            var c = children[i];
            console.log(c.tagName + " " + c.getAttribute("class"));
        }
    }
}