/// <reference path = "../Interfaces.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>
var dominox;
(function (dominox) {
    var TableTileBoardView = (function () {
        function TableTileBoardView(table, imagesContainer) {
            this.table = table;
            this.imagesContainer = imagesContainer;
            dominox.removeAllChildNodesOfElement(this.table);
            this.matrixPresenter = new dominox.SimpleTileMatrixPresenter();
            console.log("The table is " + table);
        }
        TableTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            this.buildTableAccordingToMatrix(this.table, matrix);
            console.log(dominox.stringifyTileMatrix(matrix));
        };
        TableTileBoardView.prototype.buildTableAccordingToMatrix = function (table, matrix) {
            dominox.removeAllChildNodesOfElement(table);
            for (var i = 0; i < matrix.length; i++) {
                var row = table.insertRow(-1);
                for (var j = 0; j < matrix[i].length; j++) {
                    var cell = row.insertCell(-1);
                    cell.width = "40";
                    cell.height = "40";
                    if (matrix[i][j] != null) {
                        var image = this.getImageForTile(matrix[i][j]);
                        this.rotateImageToDegrees(image, dominox.getRotationAngleInDegreesForTile(matrix[i][j]));
                        this.resizeImageTo(image, 32, 40);
                        cell.appendChild(image);
                    }
                }
            }
        };
        TableTileBoardView.prototype.rotateImageToDegrees = function (image, degrees) {
            var div = image;
            var deg = degrees;
            div.style.webkitTransform = 'rotate(' + deg + 'deg)';
            div.style.mozTransform = 'rotate(' + deg + 'deg)';
            div.style.msTransform = 'rotate(' + deg + 'deg)';
            div.style.oTransform = 'rotate(' + deg + 'deg)';
            div.style.transform = 'rotate(' + deg + 'deg)';
        };
        TableTileBoardView.prototype.resizeImageTo = function (image, width, height) {
            var onloadCallback = function (ev) {
                image.height = height;
                image.width = width;
            };
            if (image.complete)
                onloadCallback(null);
            else
                image.onload = onloadCallback;
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
        return TableTileBoardView;
    })();
    dominox.TableTileBoardView = TableTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=TableTileBoardView.js.map