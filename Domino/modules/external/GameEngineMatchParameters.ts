// <reference path = "../internal/Interfaces.ts"/>

module dominox
{

    export class GameEngineMatchDeserializedParams
    {
        public firstPlayerTiles: DominoTile[];
        public secondPlayerTileS: DominoTile[];
        public boardTiles: DominoTile[];
        public boardHasFirstTileSpinner: string; //"yes" "no"

        public firstPlayerName: string;
        public secondPlayerName: string;

        public firstPlayerScore: number;
        public secondPlayerScore: number;

        public whichPlayer: string; // "first" "second" 

        public timeAndDate: string;
        public gameName: string;

        public stringify(): string
        {
            var ob: any = {};

            ob.firstPlayerName = this.firstPlayerName;
            ob.firstPlayerScore = this.firstPlayerScore;

            ob.secondPlayerName = this.secondPlayerName;
            ob.secondPlayerScore = this.secondPlayerScore;

            ob.whichPlayer = this.whichPlayer;

            ob.firstPlayerTiles = this.createSimpleTilesFrom(this.firstPlayerTiles);
            ob.secondPlayerTiles = this.createSimpleTilesFrom(this.secondPlayerTileS);
            ob.boardTiles = this.createSimpleTilesFrom(this.boardTiles);

            ob.boardHasFirstTileSpinner = this.boardHasFirstTileSpinner;
            ob.timeAndDate = this.timeAndDate;
            ob.gameName = this.gameName;


            return JSON.stringify(ob);
        }


        public initWithJSONString(jsonString: string) {

            var ob: any = JSON.parse(jsonString);
            console.log("inited with JSON object " + ob);

            this.firstPlayerName = ob.firstPlayerName;
            this.firstPlayerScore = ob.firstPlayerScore;
            this.secondPlayerName = ob.secondPlayerName;
            this.secondPlayerScore = ob.secondPlayerScore;
            this.whichPlayer = ob.whichPlayer;
            this.boardHasFirstTileSpinner = ob.boardHasFirstTileSpinner;
            this.gameName = ob.gameName;

            this.firstPlayerTiles = this.deserializeSimpleTilesIntoDominoTileArray(ob.firstPlayerTiles);
            this.secondPlayerTileS = this.deserializeSimpleTilesIntoDominoTileArray(ob.secondPlayerTiles);
            this.boardTiles = this.deserializeSimpleTilesIntoDominoTileArray(ob.boardTiles);
        }

        createSimpleTilesFrom(tileList: DominoTile[]): any[]
        {
            var objectsArray: any[] = [];

            for (var i = 0; i < tileList.length; i++)
            {
                var ob: any = {};

                ob.first = tileList[i].getBone().getFirst();
                ob.second = tileList[i].getBone().getSecond();
                ob.orientation = tileList[i].getOrientation();

                this.putInObjectNeighbourIndexesOfTile(ob, tileList[i], tileList);

                objectsArray.push(ob);
            }

            return objectsArray;
        }


        putInObjectNeighbourIndexesOfTile(ob: any, tile: DominoTile, tilesList: DominoTile[]) {

            for (var i = 0; i < tilesList.length; i++) {

                var otherTile = tilesList[i];

                if (otherTile != tile) {

                    if (tile.getUpNeighbour() == otherTile)
                        ob.upNeighbourIndex = i;

                    if (tile.getLeftNeighbour() == otherTile)
                        ob.leftNeighbourIndex = i;

                    if (tile.getRightNeighbour() == otherTile)
                        ob.rightNeighbourIndex = i;

                    if (tile.getDownNeighbour() == otherTile)
                        ob.downNeighbourIndex = i;
                }
            }

        }

        deserializeSimpleTilesIntoDominoTileArray(simpleTiles: any[]): DominoTile[]
        {

            var result : DominoTile[] = [];

            for (var i = 0; i < simpleTiles.length; i++) {
                var ob = simpleTiles[i];

                var dominoTile = new DominoTile(new DominoBone(ob.first, ob.second),
                    <DominoTileOrientation>ob.orientation);

                result.push(dominoTile);
            }

            for (var i = 0; i < simpleTiles.length; i++) {
                var ob = simpleTiles[i];

                var dominoTile = result[i];

                if (ob.upNeighbourIndex !== undefined)
                    dominoTile.setUpNeighbour(result[ob.upNeighbourIndex]);

                if (ob.leftNeighbourIndex !== undefined)
                    dominoTile.setLeftNeighbour(result[ob.leftNeighbourIndex]);

                if (ob.rightNeighbourIndex !== undefined)
                    dominoTile.setRightNeighbour(result[ob.rightNeighbourIndex]);

                if (ob.downNeighbourIndex !== undefined)
                    dominoTile.setDownNeighbour(result[ob.downNeighbourIndex]);


            }

            return result;
        }

        
    }

}


