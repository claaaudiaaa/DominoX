/// <reference path="dominoModels/DominoTile.ts"/>

module dominox {

    export class Player
    {
        private name: String;
        private score: number;
        private tileList: dominox.DominoTile[];

        constructor(name: String, tileList: dominox.DominoTile[])
        {
            this.tileList = tileList;
            this.name = name;
            this.score = 0;
        }


        public getName(): String {
            return this.name;
        }

        public getScore(): number {
            return this.score;
        }

        public setScore(newScore: number): void {
            this.score = newScore;
        }


        public getTileList(): dominox.DominoTile[]{
            return this.tileList;
        }

        public addTile(tile: dominox.DominoTile): void {
            this.tileList.push(tile);
        }

        public removeTile(tile: dominox.DominoTile): void {
            var index = this.tileList.indexOf(tile, 0);
            if (index != undefined && index != null) {
                this.tileList.splice(index, 1);
            }
        }
    }

}