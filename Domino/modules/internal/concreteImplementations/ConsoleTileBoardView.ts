/// <reference path="../Interfaces.ts"/>
module dominox
{
    export class ConsoleTileBoardView implements dominox.TileBoardView
    {
        public drawTileAsNeighbourOfTileFromBoard(tile: dominox.DominoTile, neighbour: dominox.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback)
        {
            console.log("Drawn " + tile.toString() + " as neighbour of tile on board: " + neighbour.toString());
            callIfNotNull(callbackWhenDone);
        }

        public highlightListOfTilesFromBoard(tiles: dominox.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void
        {
            console.log("Highlighting list of tiles: " + stringifyTileList(tiles));
            callIfNotNull(callbackWhenDone);
        }

        public displayAsNormalTileBoard(tileBoard: TileBoard, callbackWhenDone: VoidCallback): void
        {
            console.log("Displaying tile board: " + stringifyTileList(tileBoard.getTileList()));
            callIfNotNull(callbackWhenDone);
        }

        
    }
}