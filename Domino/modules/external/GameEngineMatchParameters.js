// <reference path = "../internal/Interfaces.ts"/>
var dominox;
(function (dominox) {
    var GameEngineMatchDeserializedParams = (function () {
        function GameEngineMatchDeserializedParams() {
        }
        GameEngineMatchDeserializedParams.prototype.stringify = function () {
            var ob = {};
            ob.firstPlayerName = this.firstPlayerName;
            ob.firstPlayerScore = this.firstPlayerScore;
            ob.secondPlayerName = this.secondPlayerName;
            ob.secondPlayerScore = this.secondPlayerScore;
            ob.whichPlayer = this.whichPlayer;
            ob.firstPlayerTiles = this.createSimpleTilesFrom(this.firstPlayerTiles);
            ob.secondPlayerTiles = this.createSimpleTilesFrom(this.secondPlayerTileS);
            ob.boardTiles = this.createSimpleTilesFrom(this.boardTiles);
            ob.boardHasFirstTileSpinner = this.boardHasFirstTileSpinner;
            ob.timeAndDate = this.timeAndDate;
            ob.gameName = this.gameName;
            return JSON.stringify(ob);
        };
        GameEngineMatchDeserializedParams.prototype.initWithJSONString = function (jsonString) {
            var ob = JSON.parse(jsonString);
            console.log("inited with JSON object " + ob);
            this.firstPlayerName = ob.firstPlayerName;
            this.firstPlayerScore = ob.firstPlayerScore;
            this.secondPlayerName = ob.secondPlayerName;
            this.secondPlayerScore = ob.secondPlayerScore;
            this.whichPlayer = ob.whichPlayer;
            this.boardHasFirstTileSpinner = ob.boardHasFirstTileSpinner;
            this.gameName = ob.gameName;
            this.firstPlayerTiles = this.deserializeSimpleTilesIntoDominoTileArray(ob.firstPlayerTiles);
            this.secondPlayerTileS = this.deserializeSimpleTilesIntoDominoTileArray(ob.secondPlayerTiles);
            this.boardTiles = this.deserializeSimpleTilesIntoDominoTileArray(ob.boardTiles);
        };
        GameEngineMatchDeserializedParams.prototype.createSimpleTilesFrom = function (tileList) {
            var objectsArray = [];
            for (var i = 0; i < tileList.length; i++) {
                var ob = {};
                ob.first = tileList[i].getBone().getFirst();
                ob.second = tileList[i].getBone().getSecond();
                ob.orientation = tileList[i].getOrientation();
                this.putInObjectNeighbourIndexesOfTile(ob, tileList[i], tileList);
                objectsArray.push(ob);
            }
            return objectsArray;
        };
        GameEngineMatchDeserializedParams.prototype.putInObjectNeighbourIndexesOfTile = function (ob, tile, tilesList) {
            for (var i = 0; i < tilesList.length; i++) {
                var otherTile = tilesList[i];
                if (otherTile != tile) {
                    if (tile.getUpNeighbour() == otherTile)
                        ob.upNeighbourIndex = i;
                    if (tile.getLeftNeighbour() == otherTile)
                        ob.leftNeighbourIndex = i;
                    if (tile.getRightNeighbour() == otherTile)
                        ob.rightNeighbourIndex = i;
                    if (tile.getDownNeighbour() == otherTile)
                        ob.downNeighbourIndex = i;
                }
            }
        };
        GameEngineMatchDeserializedParams.prototype.deserializeSimpleTilesIntoDominoTileArray = function (simpleTiles) {
            var result = [];
            for (var i = 0; i < simpleTiles.length; i++) {
                var ob = simpleTiles[i];
                var dominoTile = new dominox.DominoTile(new dominox.DominoBone(ob.first, ob.second), ob.orientation);
                result.push(dominoTile);
            }
            for (var i = 0; i < simpleTiles.length; i++) {
                var ob = simpleTiles[i];
                var dominoTile = result[i];
                if (ob.upNeighbourIndex !== undefined)
                    dominoTile.setUpNeighbour(result[ob.upNeighbourIndex]);
                if (ob.leftNeighbourIndex !== undefined)
                    dominoTile.setLeftNeighbour(result[ob.leftNeighbourIndex]);
                if (ob.rightNeighbourIndex !== undefined)
                    dominoTile.setRightNeighbour(result[ob.rightNeighbourIndex]);
                if (ob.downNeighbourIndex !== undefined)
                    dominoTile.setDownNeighbour(result[ob.downNeighbourIndex]);
            }
            return result;
        };
        return GameEngineMatchDeserializedParams;
    })();
    dominox.GameEngineMatchDeserializedParams = GameEngineMatchDeserializedParams;
})(dominox || (dominox = {}));
//# sourceMappingURL=GameEngineMatchParameters.js.map