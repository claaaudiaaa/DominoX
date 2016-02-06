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
        getRandomTile(): dominox.DominoTile
        {
            var allTiles: dominox.DominoTile[] = this.createAllDominoTiles();
            var randomNo: number = dominox.randomIntFromInterval(0, 28);
            var tile: dominox.DominoTile = allTiles[randomNo];
            delete allTiles[randomNo];

            var bone: dominox.DominoBone = new dominox.DominoBone(first, second);
            var tile: dominox.DominoTile = new dominox.DominoTile(bone, dominox.DominoTileOrientation.HorizontalFirstLeft);

            return tile;
        }
    }
}