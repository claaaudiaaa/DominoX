/// <reference path="../Interfaces.ts"/>
module dominox {

    export class DummyTileProvider implements dominox.DominoTileProvider {
        getListOfRandomTilesOfCount(count: Number): dominox.DominoTile[]
        {

            var tileList: dominox.DominoTile[] = [];

            for (var i = 1; i <= count; i++)
                tileList.push(this.getRandomTile());

            return tileList;

        }
        getRandomTile(): dominox.DominoTile {
            var allTiles: dominox.DominoTile[] = this.createAllDominoTiles();
            var randomNo: number = dominox.randomIntFromInterval(0, 28);
            var tile: dominox.DominoTile = allTiles[randomNo];
            delete allTiles[randomNo];

            return tile;
        }
        createAllDominoTiles(): dominox.DominoTile[] {
            var allTiles: dominox.DominoTile[];
            for (var i = 0; i < 7; i++) {
                for (var j = i; j < 7; j++) {
                    var bone: dominox.DominoBone = new dominox.DominoBone(i, j);
                    var tile: dominox.DominoTile = new dominox.DominoTile(bone, dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                    console.log(tile);
                    allTiles.push(tile);
                }
            }
            
            for (var k = 0; k < 28; k++) {
                console.log(allTiles[k]);
            }
            return allTiles;
        }
    }
}