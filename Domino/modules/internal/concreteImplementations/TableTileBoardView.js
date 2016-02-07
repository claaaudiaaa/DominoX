/// <reference path = "../Interfaces.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>
var dominox;
(function (dominox) {
    var TableTileBoardView = (function () {
        function TableTileBoardView(table, imagesContainer) {
            this.table = table;
            this.imagesContainer = imagesContainer;
            this.removeAllChildNodesOfElement(this.table);
            this.matrixPresenter = new dominox.SimpleTileMatrixPresenter();
        }
        TableTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            this.buildTableAccordingToMatrix(this.table, matrix);
        };
        TableTileBoardView.prototype.buildTableAccordingToMatrix = function (table, matrix) {
            this.removeAllChildNodesOfElement(table);
            for (var i = 0; i < matrix.length; i++) {
                var row = table.insertRow(-1);
                for (var j = 0; j < matrix[i].length; j++) {
                    var cell = row.insertCell(-1);
                    cell.width = "40";
                    cell.height = "40";
                    if (matrix[i][j] != null) {
                        var image = this.getImageForTile(matrix[i][j]);
                        cell.appendChild(image);
                    }
                }
            }
        };
        TableTileBoardView.prototype.getImageForTile = function (tile) {
            var imageClassName = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond();
            var elements = this.imagesContainer.getElementsByClassName(imageClassName);
            var image = elements[0];
            console.log("image class name " + imageClassName);
            return image.cloneNode(true);
        };
        TableTileBoardView.prototype.cssRotateImageAccordingToOrientation = function (img, orientation) {
        };
        TableTileBoardView.prototype.removeAllChildNodesOfElement = function (elem) {
            while (elem.hasChildNodes())
                elem.removeChild(elem.lastChild);
        };
        return TableTileBoardView;
    })();
    dominox.TableTileBoardView = TableTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=TableTileBoardView.js.map