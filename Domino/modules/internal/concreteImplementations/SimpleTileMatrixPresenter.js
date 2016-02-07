/// <reference path = "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var TaggedDominoTile = (function () {
        function TaggedDominoTile(tile) {
            this.tile = tile;
            this.isVisited = false;
        }
        return TaggedDominoTile;
    })();
    dominox.TaggedDominoTile = TaggedDominoTile;
    function stringifyTileMatrix(matrix) {
        var str = "";
        var empty = "#############";
        for (var i = 0; i < matrix.length; i++) {
            str = str + "\n";
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == null)
                    str = str + empty;
                else
                    str = str + matrix[i][j].toString();
            }
        }
        //console.log("In stringify matrix, the length is " + matrix.length);
        return str;
    }
    dominox.stringifyTileMatrix = stringifyTileMatrix;
    ;
    var Index = (function () {
        function Index(line, column) {
            this.line = 0;
            this.column = 0;
            this.line = line;
            this.column = column;
        }
        Index.prototype.addIndex = function (index) {
            this.line = this.line + index.line;
            this.column = this.column + index.column;
        };
        Index.prototype.isGreaterThan = function (index) {
            if (this.line > index.line)
                return true;
            if (this.line == index.line && this.column > index.column)
                return true;
            return false;
        };
        Index.prototype.toString = function () {
            return "[" + this.line + "][" + this.column + "]";
        };
        return Index;
    })();
    dominox.Index = Index;
    var TileIndexPair = (function () {
        function TileIndexPair() {
        }
        TileIndexPair.prototype.toString = function () {
            return "TileIndex Pair: " + this.tile.toString() + ", " + this.index.toString();
        };
        return TileIndexPair;
    })();
    dominox.TileIndexPair = TileIndexPair;
    var SimpleTileMatrixPresenter = (function () {
        function SimpleTileMatrixPresenter() {
        }
        SimpleTileMatrixPresenter.prototype.buildIndexListWith = function (currentTile, indexList, currentTileLine, currentTileColumn, visitedTilesStack) {
            visitedTilesStack.push(currentTile);
            var pair = new TileIndexPair;
            pair.index = new Index(currentTileLine, currentTileColumn);
            pair.tile = currentTile;
            indexList.push(pair);
            if (currentTile.getLeftNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getLeftNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getLeftNeighbour(), indexList, currentTileLine, currentTileColumn - 1, visitedTilesStack);
            if (currentTile.getRightNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getRightNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getRightNeighbour(), indexList, currentTileLine, currentTileColumn + 1, visitedTilesStack);
            if (currentTile.getUpNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getUpNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getUpNeighbour(), indexList, currentTileLine - 1, currentTileColumn, visitedTilesStack);
            if (currentTile.getDownNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getDownNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getDownNeighbour(), indexList, currentTileLine + 1, currentTileColumn, visitedTilesStack);
        };
        SimpleTileMatrixPresenter.prototype.getIndexCoordinatesFrom = function (indexList, cmp) {
            var index = new Index(0, 0);
            for (var i = 0; i < indexList.length; i++) {
                var tileIndexPair = indexList[i];
                if (cmp(tileIndexPair.index.line, index.line))
                    index.line = tileIndexPair.index.line;
                if (cmp(tileIndexPair.index.column, index.column))
                    index.column = tileIndexPair.index.column;
            }
            return index;
        };
        SimpleTileMatrixPresenter.prototype.addIndexToTileList = function (index, indexPairList) {
            for (var i = 0; i < indexPairList.length; i++) {
                var indexPair = indexPairList[i];
                indexPair.index.addIndex(index);
            }
        };
        SimpleTileMatrixPresenter.prototype.createTaggedTilesFromList = function (list) {
            var resultList = [];
            for (var i = 0; i < list.length; i++) {
                var taggedTile = new TaggedDominoTile(list[i]);
                resultList.push(taggedTile);
            }
            return resultList;
        };
        SimpleTileMatrixPresenter.prototype.presentTileBoardAsTileMatrix = function (board) {
            //console.log("We are in presentTileBoardAsTileMatrix");
            var tileList = board.getTileList();
            if (tileList.length == 0) {
                console.log("The tile list is empty");
                return [];
            }
            //console.log("The tiles are " + stringifyTileList(tileList));
            var tileIndexPairList = [];
            var visitedTilesStack = [];
            this.buildIndexListWith(tileList[0], tileIndexPairList, 0, 0, visitedTilesStack);
            //console.log("We have built the index ");
            var smallestIndex = this.getIndexCoordinatesFrom(tileIndexPairList, function (a, b) {
                return a < b;
            });
            this.makeIndexOkToBeAdded(smallestIndex);
            this.addIndexToTileList(smallestIndex, tileIndexPairList);
            var biggestIndex = this.getIndexCoordinatesFrom(tileIndexPairList, function (a, b) {
                return a > b;
            });
            var matrix = this.createMultidimensionalArrayBasedOnGreatestPossibleIndex(biggestIndex);
            this.fillMatrixWithTiles(matrix, tileIndexPairList);
            //console.log("we have returned the following matrix");
            //console.log(stringifyTileMatrix(matrix));
            return matrix;
        };
        SimpleTileMatrixPresenter.prototype.fillMatrixWithTiles = function (matrix, indexTilePairList) {
            for (var i = 0; i < indexTilePairList.length; i++) {
                var tileIndexPair = indexTilePairList[i];
                matrix[tileIndexPair.index.line][tileIndexPair.index.column] = tileIndexPair.tile;
            }
        };
        SimpleTileMatrixPresenter.prototype.createMultidimensionalArrayBasedOnGreatestPossibleIndex = function (greatestIndex) {
            var array = new Array(greatestIndex.line + 1);
            for (var i = 0; i < array.length; i++) {
                array[i] = new Array(greatestIndex.column + 1);
                for (var j = 0; j < array[i].length; j++)
                    array[i][j] = null;
            }
            return array;
        };
        SimpleTileMatrixPresenter.prototype.makeIndexOkToBeAdded = function (index) {
            if (index.line < 0)
                index.line = -index.line;
            else
                index.line = 0;
            if (index.column < 0)
                index.column = -index.column;
            else
                index.column = 0;
        };
        return SimpleTileMatrixPresenter;
    })();
    dominox.SimpleTileMatrixPresenter = SimpleTileMatrixPresenter;
})(dominox || (dominox = {}));
//# sourceMappingURL=SimpleTileMatrixPresenter.js.map