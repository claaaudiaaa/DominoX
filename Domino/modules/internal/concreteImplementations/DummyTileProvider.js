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
            var first = dominox.randomIntFromInterval(0, 6);
            var second = dominox.randomIntFromInterval(0, 6);
            var bone = new dominox.DominoBone(first, second);
            var tile = new dominox.DominoTile(bone, dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
            return tile;
        };
        return DummyTileProvider;
    })();
    dominox.DummyTileProvider = DummyTileProvider;
})(dominox || (dominox = {}));
//# sourceMappingURL=DummyTileProvider.js.map