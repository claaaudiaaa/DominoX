/// <reference path = "../Interfaces.ts"/>

module dominox {

    export class SimplePlayerTurnHelper implements dominox.PlayerTurnHelper {

        public replenishTilesSoPlayerCanMakeMove(player: dominox.Player,
            playerTileListView: PlayerTileListView,
            dominoGame: DominoGame,
            tileBoard: TileBoard,
            tileProvider: DominoTileProvider,
            callbackWhenDone: VoidCallback): void
        {

            if (dominoGame.canPlayerMakeMoveWithTileListOnBoard(player.getTileList(),
                tileBoard) == true)
            {
                console.log("Player " + player.getName() + " has enough tiles now.");
                callIfNotNull(callbackWhenDone);
                return;
            }

            console.log("Player " + player.getName() + " does not have enough tiles.");

            var helperSelf: SimplePlayerTurnHelper = this;
            var newTile: dominox.DominoTile = tileProvider.getRandomTile();

            console.log("Added tile " + newTile.toString());

            player.addTile(newTile);
            playerTileListView.addTile(newTile, function () {
                callPseudoAsync(function () {
                    helperSelf.replenishTilesSoPlayerCanMakeMove(player,
                        playerTileListView, dominoGame, tileBoard, tileProvider, callbackWhenDone);
                });
            });
        }
    }
}