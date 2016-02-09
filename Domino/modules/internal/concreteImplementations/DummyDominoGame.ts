/// <reference path= "../Interfaces.ts"/>

module dominox {

    export class DummyDominoGame implements dominox.DominoGame {

        getNeighbourListForTileFromBoard(tile: dominox.DominoTile, board: TileBoard): dominox.DominoTile[]
        {
            return board.getExternalTilesListMatchingTile(tile);
        }
        playerDidAddTileAsNeighbourToTileInBoard(player: Player,
            neighbour: dominox.DominoTile,
            tile: dominox.DominoTile, board: TileBoard)
        {
            player.setScore(player.getScore() + 1);
        }

        isGameOverWithPlayersAndBoard(firstPlayer: Player, secondPlayer: Player, board: TileBoard): boolean
        {
            if (firstPlayer.getScore() >= 10 || secondPlayer.getScore() >= 10)
                return true;
            return false;
        }

        canPlayerMakeMoveWithTileListOnBoard(playerTileList: dominox.DominoTile[], board: TileBoard): boolean
        {
            var anyMatchFound: boolean = false;
            for (var i = 0; i < playerTileList.length; i++)
            {
                var iTile = playerTileList[i];
                var matchableTiles: dominox.DominoTile[] = board.getExternalTilesListMatchingTile(iTile);
                //console.log("canPlayerMakeMove, matchable tiles for tile " + iTile + " are " + stringifyTileList(matchableTiles));
                if (matchableTiles.length > 0)
                    return true;
            }

            return anyMatchFound;
        }

        endOfGame(firstPlayer: Player, secondPlayer: Player, board: TileBoard): void {
        }

        final(firstPlayer: Player, secondPlayer: Player, board: TileBoard): boolean {
            return false;
        }

    }
}