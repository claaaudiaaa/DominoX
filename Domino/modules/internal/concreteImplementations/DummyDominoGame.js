/// <reference path= "../Interfaces.ts"/>
/// <reference path="../../external/localstorageparametersrepository.ts" />
var dominox;
(function (dominox) {
    var DummyDominoGame = (function () {
        function DummyDominoGame() {
        }
        DummyDominoGame.prototype.getNeighbourListForTileFromBoard = function (tile, board) {
            return board.getExternalTilesListMatchingTile(tile);
        };
        DummyDominoGame.prototype.playerDidAddTileAsNeighbourToTileInBoard = function (player, neighbour, tile, board) {
            player.setScore(player.getScore() + 1);
        };
        DummyDominoGame.prototype.setOnGameRequireReloadCallback = function (onRequireReloadCallbac) {
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
                //console.log("canPlayerMakeMove, matchable tiles for tile " + iTile + " are " + stringifyTileList(matchableTiles));
                if (matchableTiles.length > 0)
                    return true;
            }
            return anyMatchFound;
        };
        DummyDominoGame.prototype.endOfGame = function (firstPlayer, secondPlayer, board) {
        };
        DummyDominoGame.prototype.final = function (firstPlayer, secondPlayer, board) {
            if (firstPlayer.getScore() >= 5) {
                dominox.savePlayerScores(firstPlayer, secondPlayer);
                $("#myModal").css("visibility", "visible");
                $("#winner").append("The winner of this game is " + firstPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB = " " + firstPlayer.getName() + " and " + secondPlayer.getName() + " played DominoX and " + firstPlayer.getName() + " won!";
                var bool = "false";
                $("#msgFb").text(msgFB.valueOf());
                $("#firstGame").text(bool.valueOf());
                return true;
            }
            else if (secondPlayer.getScore() >= 5) {
                dominox.savePlayerScores(secondPlayer, firstPlayer);
                $("#myModal").css("visibility", "visible");
                $("#winner").text("The winner of this game is " + secondPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB = " " + secondPlayer.getName() + " and " + firstPlayer.getName() + " played DominoX and " + secondPlayer.getName() + " won!";
                $("#msgFb").append(msgFB.valueOf());
                return true;
            }
            return false;
        };
        return DummyDominoGame;
    })();
    dominox.DummyDominoGame = DummyDominoGame;
})(dominox || (dominox = {}));
//# sourceMappingURL=DummyDominoGame.js.map