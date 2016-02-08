/// <reference path = "../Interfaces.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>
var dominox;
(function (dominox) {
    var TableTileBoardView = (function () {
        function TableTileBoardView(table, imagesContainer, onTileSelected) {
            this.onTileSelected = onTileSelected;
            this.table = table;
            this.imagesContainer = imagesContainer;
            dominox.removeAllChildNodesOfElement(this.table);
            this.matrixPresenter = new dominox.SimpleTileMatrixPresenter();
            console.log("The table is " + table);
        }
        TableTileBoardView.prototype.drawTileAsNeighbourOfTileFromBoard = function (tile, neighbour, board, callbackWhenDone) {
        };
        TableTileBoardView.prototype.highlightListOfTilesFromBoard = function (tiles, board, callbackWhenDone) {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                var img = this.findImageForTile(tile);
                this.highlightImage(img);
            }
        };
        TableTileBoardView.prototype.highlightImage = function (img) {
            img.style.border = "50%";
            img.style.borderColor = "blue";
        };
        TableTileBoardView.prototype.displayAsNormalTileBoard = function (tileBoard, callbackWhenDone) {
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            this.displayedMatrixOfTiles = matrix;
            this.buildTableAccordingToMatrix(this.table, matrix);
            console.log(dominox.stringifyTileMatrix(matrix));
        };
        TableTileBoardView.prototype.buildTableAccordingToMatrix = function (table, matrix) {
            dominox.removeAllChildNodesOfElement(table);
            var self = this;
            this.imagesMatrix = [];
            for (var i = 0; i < matrix.length; i++) {
                var row = table.insertRow(-1);
                var imagesRow = [];
                this.imagesMatrix.push(imagesRow);
                for (var j = 0; j < matrix[i].length; j++) {
                    var cell = row.insertCell(-1);
                    cell.width = "40";
                    cell.height = "40";
                    if (matrix[i][j] != null) {
                        var image = this.getImageForTile(matrix[i][j]);
                        this.rotateImageToDegrees(image, dominox.getRotationAngleInDegreesForTile(matrix[i][j]));
                        this.resizeImageTo(image, 32, 40);
                        cell.appendChild(image);
                        var currentI = i;
                        var currentJ = j;
                        image.onclick = this.createCallbackForImageAtIndexes(image, currentI, currentJ, this);
                        imagesRow.push(image);
                    }
                    else
                        imagesRow.push(null);
                }
            }
        };
        TableTileBoardView.prototype.findImageForTile = function (tile) {
            var line = -1;
            var col = -1;
            for (var i = 0; i < this.displayedMatrixOfTiles.length; i++) {
                for (var j = 0; j < this.displayedMatrixOfTiles[i].length; j++) {
                    if (this.displayedMatrixOfTiles[i][j] === tile) {
                        line = i;
                        col = j;
                        break;
                    }
                }
            }
            if (line < 0 || col < 0)
                throw "Expected tile to be in matrix " + tile.toString();
            var image = this.imagesMatrix[line][col];
            return image;
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
            // console.log("image class name " + imageClassName);
            return image.cloneNode(true);
        };
        TableTileBoardView.prototype.createCallbackForImageAtIndexes = function (image, line, column, self) {
            return function (ev) {
                self.imageWasClickedAtIndexes(image, line, column);
            };
        };
        TableTileBoardView.prototype.imageWasClickedAtIndexes = function (img, line, column) {
            var tile = this.displayedMatrixOfTiles[line][column];
            if (tile == undefined || tile == null)
                throw "Expected tile to be in matrix " + tile.toString();
            console.log("image clicked at line " + line + ", column " + column);
            this.onTileSelected(tile);
        };
        return TableTileBoardView;
    })();
    dominox.TableTileBoardView = TableTileBoardView;
})(dominox || (dominox = {}));
//# sourceMappingURL=TableTileBoardView.js.map