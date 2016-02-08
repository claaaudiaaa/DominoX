/// <reference path= "../Interfaces.ts"/>

module dominox {

    export class MugginsGame implements dominox.DominoGame {

        getNeighbourListForTileFromBoard(tile: dominox.DominoTile, board: TileBoard): dominox.DominoTile[] {
            return board.getExternalTilesListMatchingTile(tile);
        }

        playerDidAddTileAsNeighbourToTileInBoard(player: Player,
            neighbour: dominox.DominoTile,
            tile: dominox.DominoTile, board: TileBoard) {
            var externalTiles: dominox.DominoTile[] = board.getExternalTiles();
            player.setScore(player.getScore() + 1);
        }
    }
}