/// <reference path="../Interfaces.ts"/>
module dominox {

    export class DummyTileProvider implements dominox.DominoTileProvider {

        public allDominoTiles: dominox.DominoTile[];

        constructor() {
            this.createAllDominoTiles();
        }

        getTilesLeft(): dominox.DominoTile[] {
            return this.allDominoTiles;
        }

        getListOfRandomTilesOfCount(count: Number): dominox.DominoTile[]
        {

            var tileList: dominox.DominoTile[] = [];

            for (var i = 1; i <= count; i++)
                tileList.push(this.getRandomTile());

            return tileList;
        }

        removeTile(to){
            var firstPart: dominox.DominoTile[] = [];
            var secondPart: dominox.DominoTile[] = [];
            for (var i = 0; i < to; i++) {
                firstPart.push(this.allDominoTiles[i]);
            }
            for (var j = to + 1; j < this.allDominoTiles.length; j++)
                secondPart.push(this.allDominoTiles[j]);
            this.allDominoTiles = [];
            for (i = 0; i < firstPart.length; i++)
                this.allDominoTiles.push(firstPart[i]);
            for (i = 0; i < secondPart.length; i++)
                this.allDominoTiles.push(secondPart[i]);
        }

        getFirstTile(): dominox.DominoTile {
            do {
                var randomNo: number = dominox.randomIntFromInterval(0, this.allDominoTiles.length-1);
                var tile: dominox.DominoTile = this.allDominoTiles[randomNo];
            } while (!tile.isDoubleTile());
            this.removeTile(randomNo);
           // if (tile == undefined)
            //    throw "Undefined tile!";

            return tile;
        }

        getRandomTile(): dominox.DominoTile {
            var allTiles: dominox.DominoTile[] = this.allDominoTiles;
            var randomNo: number = dominox.randomIntFromInterval(0, this.allDominoTiles.length-1);
            var tile: dominox.DominoTile = allTiles[randomNo];
//            if (tile == undefined)
 //               throw "Undefined tile!";

            this.removeTile(randomNo);
            return tile;
        }
        createAllDominoTiles() {
            this.allDominoTiles = [];
            for (var i = 0; i < 7; i++) {
                for (var j = i; j < 7; j++) {
                    var bone: dominox.DominoBone = new dominox.DominoBone(i, j);
                    var tile: dominox.DominoTile = new dominox.DominoTile(bone,
                        dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                    
                    this.allDominoTiles.push(tile);
                }
            }
        }
    }
}