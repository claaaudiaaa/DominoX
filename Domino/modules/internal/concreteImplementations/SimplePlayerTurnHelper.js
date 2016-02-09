/// <reference path = "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var SimplePlayerTurnHelper = (function () {
        function SimplePlayerTurnHelper() {
        }
        SimplePlayerTurnHelper.prototype.replenishTilesSoPlayerCanMakeMove = function (player, playerTileListView, dominoGame, tileBoard, tileProvider, callbackWhenDone) {
            if (dominoGame.canPlayerMakeMoveWithTileListOnBoard(player.getTileList(), tileBoard) == true) {
                console.log("Player " + player.getName() + " has enough tiles now.");
                dominox.callIfNotNull(callbackWhenDone);
                return;
            }
            console.log("Player " + player.getName() + " does not have enough tiles.");
            var helperSelf = this;
            var newTile = tileProvider.getRandomTile();
            if (typeof newTile === "undefined")
                return;
            player.addTile(newTile);
            playerTileListView.addTile(newTile, function () {
                dominox.callPseudoAsync(function () {
                    helperSelf.replenishTilesSoPlayerCanMakeMove(player, playerTileListView, dominoGame, tileBoard, tileProvider, callbackWhenDone);
                });
            });
        };
        return SimplePlayerTurnHelper;
    })();
    dominox.SimplePlayerTurnHelper = SimplePlayerTurnHelper;
})(dominox || (dominox = {}));
//# sourceMappingURL=SimplePlayerTurnHelper.js.map