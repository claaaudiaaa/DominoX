/// <reference path="dominoModels/DominoTile.ts"/>
var com;
(function (com) {
    var dominox;
    (function (dominox) {
        var internal;
        (function (internal) {
            var Player = (function () {
                function Player(name, tileList) {
                    this.tileList = tileList;
                    this.name = name;
                    this.score = 0;
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
            internal.Player = Player;
        })(internal = dominox.internal || (dominox.internal = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=Player.js.map