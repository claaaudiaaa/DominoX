/// <reference path = "../Interfaces.ts"/>
/// <reference path = "../dominoModels/DominoTile.ts"/>
var dominox;
(function (dominox) {
    var SimpleCanvasTileBoardView = (function () {
        function SimpleCanvasTileBoardView() {
            this.tileWidth = 32;
            this.tileHeight = 64;
        }
        SimpleCanvasTileBoardView.prototype.setAndTestWithCanvas = function (canvas) {
        };
        SimpleCanvasTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        SimpleCanvasTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
        };
        SimpleCanvasTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
        };
        return SimpleCanvasTileBoardView;
    })();
    dominox.SimpleCanvasTileBoardView = SimpleCanvasTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=SimpleCanvasTileBoardView.js.map