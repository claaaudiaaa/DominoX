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

        private context: CanvasRenderingContext2D;
        private canvas: HTMLCanvasElement;
        private imagesContainer: HTMLElement;
        private matrixPresenter: TileMatrixPresenter;

        constructor(canvas: HTMLCanvasElement, imagesContainer: HTMLElement, matrixPresenter: TileMatrixPresenter)
        {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.imagesContainer = imagesContainer;
            this.matrixPresenter = matrixPresenter;
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
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);

            for (var i = 0; i < matrix.length; i++)
            {
                for (var j = 0; j < matrix[i].length; j++)
                {
                    if (matrix[i][j] != null)
                    {
                        this.drawTileAtIndexes(matrix[i][j], i, j);
                    }
                }
            }
        }


        drawTileAtIndexes(tile: DominoTile, line: number, column: number)
        {
            var rectangle = this.getRectangleForIndex(line, column);
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
            return new TileRectangle(column * 64 + this.paddingLeft, line * 64 + this.paddingTop, 64, 64);
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
            var imageClassName = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond;
            var image: HTMLImageElement = <HTMLImageElement>this.imagesContainer.getElementsByClassName(imageClassName)[0];
            return image;
        }


        drawImageOnContext(context: CanvasRenderingContext2D,
            image: HTMLImageElement, rectangle: TileRectangle, rotatedAroundCenter: number): void
        {
            image.width = rectangle.width;
            image.height = rectangle.height;
            var self = this;

            var imageCallback = function (event: any)
            {
                drawRotatedImage(self.context, image,
                    rectangle.x, rectangle.y, rotatedAroundCenter);
            };

            if (image.complete)
                imageCallback(null);
            else
                image.onload = imageCallback;

        }

    }


    export function drawRotatedImage(context: CanvasRenderingContext2D,
        image: HTMLImageElement, x: number, y: number, angle: number)
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
        context.drawImage(image, -(image.width / 2), -(image.height / 2));
 
        // and restore the co-ords to how they were when we began
        context.restore();
    }
}