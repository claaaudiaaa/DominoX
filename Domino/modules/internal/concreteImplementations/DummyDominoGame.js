/// <reference path= "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var DummyDominoGame = (function () {
        function DummyDominoGame() {
        }
        DummyDominoGame.prototype.getNeighbourListForTileFromBoard = function (tile, board) {
            return dominox.getMatchableTilesForTile(tile, board.getExternalTilesListMatchingTile(tile));
        };
        DummyDominoGame.prototype.playerDidAddTileAsNeighbourToTileInBoard = function (player, neighbour, tile, board) {
            player.setScore(player.getScore() + 1);
        };
        DummyDominoGame.prototype.isGameOverWithPlayersAndBoard = function (firstPlayer, secondPlayer, board) {
            if (firstPlayer.getScore() >= 10 || secondPlayer.getScore() >= 10)
                return true;
            return false;
        };
        DummyDominoGame.prototype.canPlayerMakeMoveWithTileListOnBoard = function (playerTileList, board) {
            var anyMatchFound = false;
            for (var i = 0; i < playerTileList.length; i++) {
                var iTile = playerTileList[i];
                var matchableTiles = board.getExternalTilesListMatchingTile(iTile);
                if (matchableTiles.length > 0)
                    return true;
            }
            return anyMatchFound;
        };
        return DummyDominoGame;
    })();
    dominox.DummyDominoGame = DummyDominoGame;
})(dominox || (dominox = {}));
//# sourceMappingURL=DummyDominoGame.js.map