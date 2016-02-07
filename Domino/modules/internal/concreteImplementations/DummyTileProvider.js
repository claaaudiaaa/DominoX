/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var DummyTileProvider = (function () {
        function DummyTileProvider() {
        }
        DummyTileProvider.prototype.getListOfRandomTilesOfCount = function (count) {
            var tileList = [];
            for (var i = 1; i <= count; i++)
                tileList.push(this.getRandomTile());
            return tileList;
        };
        DummyTileProvider.prototype.getRandomTile = function () {
            var allTiles = this.createAllDominoTiles();
            var randomNo = dominox.randomIntFromInterval(0, 27);
            var tile = allTiles[randomNo];
            if (tile == undefined)
                throw "Undefined tile!";
            delete allTiles[randomNo];
            return tile;
        };
        DummyTileProvider.prototype.createAllDominoTiles = function () {
            var allTiles = [];
            for (var i = 0; i < 7; i++) {
                for (var j = i; j < 7; j++) {
                    var bone = new dominox.DominoBone(i, j);
                    var tile = new dominox.DominoTile(bone, dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                    allTiles.push(tile);
                }
            }
            return allTiles;
        };
        return DummyTileProvider;
    })();
    dominox.DummyTileProvider = DummyTileProvider;
})(dominox || (dominox = {}));
//# sourceMappingURL=DummyTileProvider.js.map