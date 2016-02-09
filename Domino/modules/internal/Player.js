/// <reference path="dominoModels/DominoTile.ts"/>
var dominox;
(function (dominox) {
    var Player = (function () {
        function Player(name, tileList) {
            this.tileList = tileList;
            this.name = name;
            // this.score = 0;
        }
        Player.prototype.getName = function () {
            return this.name;
        };
        Player.prototype.getScore = function () {
            return this.score;
        };
        Player.prototype.setScore = function (newScore) {
            this.score = newScore;
        };
        Player.prototype.getTileList = function () {
            return this.tileList;
        };
        Player.prototype.addTile = function (tile) {
            this.tileList.push(tile);
        };
        Player.prototype.removeTile = function (tile) {
            var index = this.tileList.indexOf(tile, 0);
            if (index != undefined && index != null) {
                this.tileList.splice(index, 1);
            }
        };
        return Player;
    })();
    dominox.Player = Player;
})(dominox || (dominox = {}));
//# sourceMappingURL=Player.js.map