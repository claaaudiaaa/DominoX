/// <reference path="../Interfaces.ts"/>
//  <reference path="SimpleTileMatrixPresenter.ts"/>

module dominox
{
    export class ConsoleTileBoardView implements dominox.TileBoardView
    {
        matrixPresenter: SimpleTileMatrixPresenter;

        constructor() {
            this.matrixPresenter = new SimpleTileMatrixPresenter();
            if (this.matrixPresenter == undefined || this.matrixPresenter == null) {
                console.log("OMG IT STILL DOESNT INCLUDE IT");
            }
            else {
                console.log("WE HAVE CREATED THE MATRIX PRESENTER");
                console.log(this.matrixPresenter);
            }
        }

        public drawTileAsNeighbourOfTileFromBoard(tile: dominox.DominoTile, neighbour: dominox.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback)
        {
            console.log("Drawn " + tile.toString() + " as neighbour of tile on board: " + neighbour.toString());
            this.displayAsNormalTileBoard(board, null);
            callIfNotNull(callbackWhenDone);
        }

        public highlightListOfTilesFromBoard(tiles: dominox.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void
        {
            console.log("Highlighting list of tiles: " + stringifyTileList(tiles));
            this.displayAsNormalTileBoard(board, null);
            callIfNotNull(callbackWhenDone);
        }

        public displayAsNormalTileBoard(tileBoard: TileBoard, callbackWhenDone: VoidCallback): void
        {
            //console.log("Displaying tile board: " + stringifyTileList(tileBoard.getTileList()));
            console.log("Displaying tile board as matrix\n");

            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            //console.log(matrix);
            console.log(stringifyTileMatrix(matrix));

            callIfNotNull(callbackWhenDone);
        }

        
    }
}