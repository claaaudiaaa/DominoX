/// <reference path = "../Interfaces.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>

module dominox {

    export class TableTileBoardView implements TileBoardView
    {
        private tableContainer: HTMLDivElement;
        private table: HTMLTableElement;
        private imagesContainer: HTMLDivElement;
        private matrixPresenter: SimpleTileMatrixPresenter;

        constructor(table: HTMLTableElement, imagesContainer: HTMLDivElement)
        {
            this.table = table;
            this.imagesContainer = imagesContainer;
            dominox.removeAllChildNodesOfElement(this.table);
            this.matrixPresenter = new SimpleTileMatrixPresenter();

            console.log("The table is " + table);
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
            this.buildTableAccordingToMatrix(this.table, matrix);
            console.log(stringifyTileMatrix(matrix));
        }

       

        buildTableAccordingToMatrix(table: HTMLTableElement, matrix: DominoTile[][])
        {
            dominox.removeAllChildNodesOfElement(table);
            for (var i = 0; i < matrix.length; i++)
            {
                var row = <HTMLTableRowElement>table.insertRow(-1);
                for (var j = 0; j < matrix[i].length; j++)
                {
                    var cell = <HTMLTableCellElement>row.insertCell(-1);
                    cell.width = "40";
                    cell.height = "40";

                    if (matrix[i][j] != null)
                    {
                        var image = this.getImageForTile(matrix[i][j]);
                        this.rotateImageToDegrees(image, dominox.getRotationAngleInDegreesForTile(matrix[i][j]));
                        this.resizeImageTo(image, 32, 40);
                        cell.appendChild(image);
                    }

                }
            }
        }


        rotateImageToDegrees(image: HTMLImageElement, degrees: number)
        {
            var div : any = image;
            var deg = degrees;

            div.style.webkitTransform = 'rotate(' + deg + 'deg)';
            div.style.mozTransform = 'rotate(' + deg + 'deg)';
            div.style.msTransform = 'rotate(' + deg + 'deg)';
            div.style.oTransform = 'rotate(' + deg + 'deg)';
            div.style.transform = 'rotate(' + deg + 'deg)'; 
        }

        resizeImageTo(image: HTMLImageElement, width: number, height: number) {

            var onloadCallback = function (ev: any)
            {
                image.height = height;
                image.width = width;
            };

            if (image.complete)
                onloadCallback(null);
            else
                image.onload = onloadCallback;
        }


        getImageForTile(tile: DominoTile): HTMLImageElement {
            var imageClassName: string = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond();
            var elements = this.imagesContainer.getElementsByClassName(imageClassName);
            var image: HTMLImageElement = <HTMLImageElement>elements[0];

            console.log("image class name " + imageClassName);

            return <HTMLImageElement>image.cloneNode(true);
        }

        cssRotateImageAccordingToOrientation(img: HTMLImageElement,
            orientation: DominoTileOrientation)
        {
            
        }



    }
}