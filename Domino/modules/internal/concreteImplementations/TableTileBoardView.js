/// <reference path = "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var TableTileBoardView = (function () {
        function TableTileBoardView(tableContainer) {
            this.tableContainer = tableContainer;
            this.table = tableContainer.getElementsByClassName("TilesTable")[0];
        }
        TableTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
        };
        return TableTileBoardView;
    })();
    dominox.TableTileBoardView = TableTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=TableTileBoardView.js.map