/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var DummyTileProvider = (function () {
        function DummyTileProvider() {
            this.createAllDominoTiles();
        }
        DummyTileProvider.prototype.getTilesLeft = function () {
            return this.allDominoTiles;
        };
        DummyTileProvider.prototype.getListOfRandomTilesOfCount = function (count) {
            var tileList = [];
            for (var i = 1; i <= count; i++)
                tileList.push(this.getRandomTile());
            return tileList;
        };
        DummyTileProvider.prototype.removeTile = function (to) {
            var firstPart = [];
            var secondPart = [];
            for (var i = 0; i < to; i++) {
                firstPart.push(this.allDominoTiles[i]);
            }
            for (var j = to + 1; j < this.allDominoTiles.length; j++)
                secondPart.push(this.allDominoTiles[j]);
            this.allDominoTiles = [];
            for (i = 0; i < firstPart.length; i++)
                this.allDominoTiles.push(firstPart[i]);
            for (i = 0; i < secondPart.length; i++)
                this.allDominoTiles.push(secondPart[i]);
        };
        DummyTileProvider.prototype.getFirstTile = function () {
            do {
                var randomNo = dominox.randomIntFromInterval(0, this.allDominoTiles.length - 1);
                var tile = this.allDominoTiles[randomNo];
            } while (!tile.isDoubleTile());
            this.removeTile(randomNo);
            // if (tile == undefined)
            //    throw "Undefined tile!";
            return tile;
        };
        DummyTileProvider.prototype.getRandomTile = function () {
            var allTiles = this.allDominoTiles;
            var randomNo = dominox.randomIntFromInterval(0, this.allDominoTiles.length - 1);
            var tile = allTiles[randomNo];
            //            if (tile == undefined)
            //               throw "Undefined tile!";
            this.removeTile(randomNo);
            return tile;
        };
        DummyTileProvider.prototype.createAllDominoTiles = function () {
            this.allDominoTiles = [];
            for (var i = 0; i < 7; i++) {
                for (var j = i; j < 7; j++) {
                    var bone = new dominox.DominoBone(i, j);
                    var tile = new dominox.DominoTile(bone, dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                    this.allDominoTiles.push(tile);
                }
            }
        };
        return DummyTileProvider;
    })();
    dominox.DummyTileProvider = DummyTileProvider;
})(dominox || (dominox = {}));
//# sourceMappingURL=DummyTileProvider.js.map