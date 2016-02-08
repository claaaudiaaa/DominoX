/// <reference path = "../Interfaces.ts"/>

module dominox
{
    export class TaggedDominoTile {
        public tile: DominoTile;
        public isVisited: boolean;

        constructor(tile: DominoTile) {
            this.tile = tile;
            this.isVisited = false;
        }
    }

    export function stringifyTileMatrix(matrix: Array<Array<DominoTile>>): string {
        var str: string = "";

        var empty: string = "#############";

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {

                if (matrix[i][j] == null)
                    str = str + empty;
                else
                    str = str + matrix[i][j].toString();
            }
            str = str + "\n";
        }

        return str;
    }

    export interface NumberComparisonTileIndexPair {
        (tileIndexPairNumber: number, indexNumber: number): boolean
    };

    export class Index {
        public line: number = 0;
        public column: number = 0;

        constructor(line: number, column: number) {
            this.line = line;
            this.column = column;
        }

        public addIndex(index: Index) {
            this.line = this.line + index.line;
            this.column = this.column + index.column;
        }

        public isGreaterThan(index: Index): boolean {
            if (this.line > index.line)
                return true;
            if (this.line == index.line && this.column > index.column)
                return true;

            return false;
        }

        toString() {
            return "[" + this.line + "][" + this.column + "]";
        }
    }

    export class TileIndexPair {
        public index: Index;
        public tile: DominoTile;

        toString() {
            return "TileIndex Pair: " + this.tile.toString() + ", " + this.index.toString();
        }
    }

    export function stringifyTileIndexPairList(list: TileIndexPair[]): string
    {
        var str: string = "";
        for (var i = 0; i < list.length; i++) {
            var pair = list[i];
            str = str + pair.toString() + ", ";
        }

        return str;
    }

    export class SimpleTileMatrixPresenter implements TileMatrixPresenter {

        constructor() {
        }


        buildIndexListWith(currentTile, indexList: TileIndexPair[], currentTileLine: number,
            currentTileColumn: number, visitedTilesStack: DominoTile[])
        {
            visitedTilesStack.push(currentTile);
            var pair = new TileIndexPair;
            pair.index = new Index(currentTileLine, currentTileColumn);
            pair.tile = currentTile;
            indexList.push(pair);

            if (currentTile.getLeftNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getLeftNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getLeftNeighbour(),
                    indexList, currentTileLine, currentTileColumn - 1, visitedTilesStack);

            if (currentTile.getRightNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getRightNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getRightNeighbour(),
                    indexList, currentTileLine, currentTileColumn + 1, visitedTilesStack);

            if (currentTile.getUpNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getUpNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getUpNeighbour(),
                    indexList, currentTileLine - 1, currentTileColumn, visitedTilesStack);

            if (currentTile.getDownNeighbour() != null &&
                visitedTilesStack.indexOf(currentTile.getDownNeighbour()) < 0)
                this.buildIndexListWith(currentTile.getDownNeighbour(),
                    indexList, currentTileLine + 1, currentTileColumn, visitedTilesStack);
        }

        getIndexCoordinatesFrom(indexList: TileIndexPair[], cmp: NumberComparisonTileIndexPair): Index {
            var index = new Index(0, 0);

            for (var i = 0; i < indexList.length; i++) {
                var tileIndexPair = indexList[i];
                if (cmp(tileIndexPair.index.line, index.line))
                    index.line = tileIndexPair.index.line;

                if (cmp(tileIndexPair.index.column, index.column))
                    index.column = tileIndexPair.index.column;
            }
            return index;
        }

        addIndexToTileList(index: Index, indexPairList: TileIndexPair[]) {
            for (var i = 0; i < indexPairList.length; i++) {
                var indexPair = indexPairList[i];
                indexPair.index.addIndex(index);
            }
        }

        createTaggedTilesFromList(list: DominoTile[]): TaggedDominoTile[] {
            var resultList: TaggedDominoTile[] = [];

            for (var i = 0; i < list.length; i++) {
                var taggedTile = new TaggedDominoTile(list[i]);
                resultList.push(taggedTile);
            }

            return resultList;
        }

        public presentTileBoardAsTileMatrix(board: TileBoard): Array<Array<DominoTile>>
        {
            //console.log("We are in presentTileBoardAsTileMatrix");
            var tileList: DominoTile[] = board.getTileList();
            if (tileList.length == 0)
            {
                console.log("The tile list is empty");
                return [];
            }

            //console.log("The tiles are " + stringifyTileList(tileList));

            var tileIndexPairList: TileIndexPair[] = [];
            var visitedTilesStack: DominoTile[] = [];
            this.buildIndexListWith(tileList[0], tileIndexPairList, 0, 0, visitedTilesStack);

            //console.log("We have built the index ");
            //console.log(stringifyTileIndexPairList(tileIndexPairList));

            var smallestIndex = this.getIndexCoordinatesFrom(tileIndexPairList,
                function (a: number, b: number) {
                    return a < b;
                });

            //console.log("smallest index is " + smallestIndex.toString());
            this.makeIndexOkToBeAdded(smallestIndex);
            //console.log("after normalizing: " + smallestIndex.toString());

            this.addIndexToTileList(smallestIndex, tileIndexPairList);
            //console.log("tile index pair list after adding " + stringifyTileIndexPairList(tileIndexPairList));

            var biggestIndex = this.getIndexCoordinatesFrom(tileIndexPairList, function (a: number, b: number) {
                return a > b;
            });

            var matrix = this.createMultidimensionalArrayBasedOnGreatestPossibleIndex(biggestIndex);
            this.fillMatrixWithTiles(matrix, tileIndexPairList);

            //console.log("we have returned the following matrix");
            //console.log(stringifyTileMatrix(matrix));

            return matrix;
        }


        fillMatrixWithTiles(matrix: Array<Array<DominoTile>>, indexTilePairList: TileIndexPair[]) {
            for (var i = 0; i < indexTilePairList.length; i++) {

                var tileIndexPair = indexTilePairList[i];
                matrix[tileIndexPair.index.line][tileIndexPair.index.column] = tileIndexPair.tile;
            }
        }

        createMultidimensionalArrayBasedOnGreatestPossibleIndex(greatestIndex: Index): Array<Array<DominoTile>> {
            var array = new Array<Array<DominoTile>>(greatestIndex.line + 1);
            for (var i = 0; i < array.length; i++) {
                array[i] = new Array<DominoTile>(greatestIndex.column + 1);
                for (var j = 0; j < array[i].length; j++)
                    array[i][j] = null;
            }

            return array;
        }

        makeIndexOkToBeAdded(index: Index) {
            if (index.line < 0)
                index.line = -index.line;
            else
                index.line = 0;

            if (index.column < 0)
                index.column = -index.column;
            else
                index.column = 0;
        }
    }
}