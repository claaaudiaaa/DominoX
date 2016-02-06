/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var ConsoleTileBoardView = (function () {
        function ConsoleTileBoardView() {
        }
        ConsoleTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
            console.log("Drawn " + tile.toString() + " as neighbour of tile on board: " + neighbour.toString());
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsoleTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
            console.log("Highlighting list of tiles: " + dominox.stringifyTileList(tiles));
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsoleTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            console.log("Displaying tile board: " + dominox.stringifyTileList(tileBoard.getTileList()));
            dominox.callIfNotNull(callbackWhenDone);
        };
        return ConsoleTileBoardView;
    })();
    dominox.ConsoleTileBoardView = ConsoleTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=ConsoleTileBoardView.js.map