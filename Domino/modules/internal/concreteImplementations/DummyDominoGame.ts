/// <reference path= "../Interfaces.ts"/>
/// <reference path="../../external/localstorageparametersrepository.ts" />

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

        setOnGameRequireReloadCallback(onRequireReloadCallbac: VoidCallback): void {
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

            if (firstPlayer.getScore() >= 2) {

                dominox.savePlayerScores(firstPlayer, secondPlayer);


                $("#myModal").css("visibility", "visible");
                $("#winner").append("The winner of this game is " + firstPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB: String = " " + firstPlayer.getName() + " and " + secondPlayer.getName() + " played DominoX and " + firstPlayer.getName() + " won!";
                var bool: String = "false";
                $("#msgFb").text(msgFB.valueOf());
                $("#firstGame").text(bool.valueOf());


                return true;
            }
            else if (secondPlayer.getScore() >= 2) {

                dominox.savePlayerScores(secondPlayer, firstPlayer);


                $("#myModal").css("visibility", "visible");
                $("#winner").text("The winner of this game is " + secondPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB: String = " " + secondPlayer.getName() + " and " + firstPlayer.getName() + " played DominoX and " + secondPlayer.getName() + " won!";
                $("#msgFb").append(msgFB.valueOf());


                return true;
            }
            return false;
        }

    }
}