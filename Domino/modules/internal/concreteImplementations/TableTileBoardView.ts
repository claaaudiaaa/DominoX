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
            this.removeAllChildNodesOfElement(this.table);
            this.matrixPresenter = new SimpleTileMatrixPresenter();
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
        }

       

        buildTableAccordingToMatrix(table: HTMLTableElement, matrix: DominoTile[][])
        {
            this.removeAllChildNodesOfElement(table);
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
                        cell.appendChild(image);
                    }

                }
            }
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

        removeAllChildNodesOfElement(elem: HTMLElement)
        {
            while (elem.hasChildNodes())
                elem.removeChild(elem.lastChild);
        }

    }
}