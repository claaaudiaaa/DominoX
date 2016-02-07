/// <reference path = "../Interfaces.ts"/>

module dominox {

    export class TableTileBoardView implements TileBoardView
    {
        private tableContainer: HTMLDivElement;
        private table: HTMLTableElement;

        constructor(tableContainer: HTMLDivElement) {

            this.tableContainer = tableContainer;
            this.table = <HTMLTableElement>tableContainer.getElementsByClassName("TilesTable")[0];
        }

        drawTileAsNeighbourOfTileFromBoard(tile: dominox.DominoTile, neighbour: dominox.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback) {
        }

        highlightListOfTilesFromBoard(tiles: dominox.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void {
        }

        displayAsNormalTileBoard(tileBoard: TileBoard, callbackWhenDone: VoidCallback) {
        }

    }
}