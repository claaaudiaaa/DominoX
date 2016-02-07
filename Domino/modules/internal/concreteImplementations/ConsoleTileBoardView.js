/// <reference path="../Interfaces.ts"/>
//  <reference path="SimpleTileMatrixPresenter.ts"/>
var dominox;
(function (dominox) {
    var ConsoleTileBoardView = (function () {
        function ConsoleTileBoardView() {
            this.matrixPresenter = new dominox.SimpleTileMatrixPresenter();
            if (this.matrixPresenter == undefined || this.matrixPresenter == null) {
                console.log("OMG IT STILL DOESNT INCLUDE IT");
            }
            else {
                console.log("WE HAVE CREATED THE MATRIX PRESENTER");
                console.log(this.matrixPresenter);
            }
        }
        ConsoleTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
            console.log("Drawn " + tile.toString() + " as neighbour of tile on board: " + neighbour.toString());
            this.displayAsNormalTileBoard(board, null);
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsoleTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
            console.log("Highlighting list of tiles: " + dominox.stringifyTileList(tiles));
            this.displayAsNormalTileBoard(board, null);
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsoleTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            //console.log("Displaying tile board: " + stringifyTileList(tileBoard.getTileList()));
            console.log("Displaying tile board as matrix\n");
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            //console.log(matrix);
            console.log(dominox.stringifyTileMatrix(matrix));
            dominox.callIfNotNull(callbackWhenDone);
        };
        return ConsoleTileBoardView;
    })();
    dominox.ConsoleTileBoardView = ConsoleTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=ConsoleTileBoardView.js.map