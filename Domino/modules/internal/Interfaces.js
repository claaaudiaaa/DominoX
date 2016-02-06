/// <reference path="dominoModels/DominoTile.ts"/>
/// <reference path="Player.ts"/>
var dominox;
(function (dominox) {
    function callIfNotNull(callback) {
        if (callback != null)
            callback();
    }
    dominox.callIfNotNull = callIfNotNull;
    function stringifyTileList(tileList) {
        var str = "";
        for (var i = 0; i < tileList.length; i++) {
            var tile = tileList[i];
            str = str + " " + tile.toString() + ",";
        }
        return str;
    }
    dominox.stringifyTileList = stringifyTileList;
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    dominox.randomIntFromInterval = randomIntFromInterval;
    function callPseudoAsync(fun) {
        setTimeout(function () {
            fun();
        }, 1);
    }
    dominox.callPseudoAsync = callPseudoAsync;
    (function (TileMatchType) {
        TileMatchType[TileMatchType["FirstFirst"] = 0] = "FirstFirst";
        TileMatchType[TileMatchType["FirstSecond"] = 1] = "FirstSecond";
        TileMatchType[TileMatchType["SecondFirst"] = 2] = "SecondFirst";
        TileMatchType[TileMatchType["SecondSecond"] = 3] = "SecondSecond";
        TileMatchType[TileMatchType["NoMatch"] = 4] = "NoMatch";
    })(dominox.TileMatchType || (dominox.TileMatchType = {}));
    var TileMatchType = dominox.TileMatchType;
    function getTilesMatchType(first, second) {
        var tileOne = first;
        var tileTwo = second;
        // first == first
        if (tileOne.getBone().getFirst() == tileTwo.getBone().getFirst())
            return TileMatchType.FirstFirst;
        //first - second
        if (tileOne.getBone().getFirst() == tileTwo.getBone().getSecond())
            return TileMatchType.FirstSecond;
        //second - first
        if (tileOne.getBone().getSecond() == tileTwo.getBone().getFirst())
            return TileMatchType.SecondFirst;
        //second - second
        if (tileOne.getBone().getSecond() == tileTwo.getBone().getSecond())
            return TileMatchType.SecondSecond;
        return TileMatchType.NoMatch;
    }
    dominox.getTilesMatchType = getTilesMatchType;
    function tileHastMatchOnFirstOnTile(tileA, tileB) {
        var matchType = getTilesMatchType(tileA, tileB);
        return matchType == TileMatchType.FirstFirst || matchType == TileMatchType.SecondFirst;
    }
    dominox.tileHastMatchOnFirstOnTile = tileHastMatchOnFirstOnTile;
    function tileHasMatchOnSecondOnTile(tileA, tileB) {
        var matchType = getTilesMatchType(tileA, tileB);
        return matchType == TileMatchType.FirstSecond || matchType == TileMatchType.SecondSecond;
    }
    dominox.tileHasMatchOnSecondOnTile = tileHasMatchOnSecondOnTile;
    function getMatchableTilesForTile(tile, tileList) {
        var matchableTiles = [];
        for (var i = 0; i < tileList.length; i++) {
            var iTile = tileList[i];
            if (dominox.getTilesMatchType(iTile, tile) != dominox.TileMatchType.NoMatch)
                matchableTiles.push(iTile);
        }
        return matchableTiles;
    }
    dominox.getMatchableTilesForTile = getMatchableTilesForTile;
})(dominox || (dominox = {}));
//# sourceMappingURL=Interfaces.js.map