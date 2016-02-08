/// <reference path= "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var MugginsGame = (function () {
        function MugginsGame() {
        }
        MugginsGame.prototype.getNeighbourListForTileFromBoard = function (tile, board) {
            return board.getExternalTilesListMatchingTile(tile);
        };
        MugginsGame.prototype.playerDidAddTileAsNeighbourToTileInBoard = function (player, neighbour, tile, board) {
            var externalTiles = board.getExternalTiles();
            player.setScore(player.getScore() + 1);
        };
        return MugginsGame;
    })();
    dominox.MugginsGame = MugginsGame;
})(dominox || (dominox = {}));
//# sourceMappingURL=MugginsGame.js.map