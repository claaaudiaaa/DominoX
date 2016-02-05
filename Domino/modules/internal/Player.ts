/// <reference path="dominoModels/DominoTile.ts"/>

module com.dominox.internal {

    export class Player
    {
        private name: String;
        private score: Number;
        private tileList: dominoModels.DominoTile[];

        constructor(name: String, tileList: dominoModels.DominoTile[])
        {
            this.tileList = tileList;
            this.name = name;
            this.score = 0;
        }


        public getName(): String {
            return this.name;
        }

        public getScore(): Number {
            return this.score;
        }

        public setScore(newScore: Number): void {
            this.score = newScore;
        }


        public getTileList(): dominoModels.DominoTile[] {
            return this.tileList;
        }

        public addTile(tile: dominoModels.DominoTile): void {
            this.tileList.push(tile);
        }

        public removeTile(tile: dominoModels.DominoTile): void {
            var index = this.tileList.indexOf(tile, 0);
            if (index != undefined && index != null) {
                this.tileList.splice(index, 1);
            }
        }
    }

}