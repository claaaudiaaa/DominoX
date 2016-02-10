module dominox {

    export class Score {
        private firstPlayerName: String;
        private secondPlayerName: String;
        private firstPlayerScore: number;
        private secondPlayerScore: number;

        constructor(firstPlayerName: String, secondPlayerName: String, firstPlayerScore: number, secondPlayerScore: number) {
            this.firstPlayerName = firstPlayerName;
            this.secondPlayerName = secondPlayerName;
            this.firstPlayerScore = firstPlayerScore;
            this.secondPlayerScore = secondPlayerScore;
        }

        public getFirstPlayerName(): String {
            return this.firstPlayerName;
        }

        public getSecondPlayerName(): String {
            return this.secondPlayerName;
        }

        public getFirstPlayerScore(): number {
            return this.firstPlayerScore;
        }

        public getSecondPlayerScore(): number {
            return this.secondPlayerScore;
        }

        public toString(): string {
            return "<strong>" + this.firstPlayerName + " vs " + this.secondPlayerName + "<br>" + this.firstPlayerScore + "/" + this.secondPlayerScore + "</strong>";
        }
    }
}

