var dominox;
(function (dominox) {
    var Score = (function () {
        function Score(firstPlayerName, secondPlayerName, firstPlayerScore, secondPlayerScore) {
            this.firstPlayerName = firstPlayerName;
            this.secondPlayerName = secondPlayerName;
            this.firstPlayerScore = firstPlayerScore;
            this.secondPlayerScore = secondPlayerScore;
        }
        Score.prototype.getFirstPlayerName = function () {
            return this.firstPlayerName;
        };
        Score.prototype.getSecondPlayerName = function () {
            return this.secondPlayerName;
        };
        Score.prototype.getFirstPlayerScore = function () {
            return this.firstPlayerScore;
        };
        Score.prototype.getSecondPlayerScore = function () {
            return this.secondPlayerScore;
        };
        Score.prototype.toString = function () {
            return "<strong>" + this.firstPlayerName + " vs " + this.secondPlayerName + "<br>" + this.firstPlayerScore + "/" + this.secondPlayerScore + "</strong>";
        };
        return Score;
    })();
    dominox.Score = Score;
})(dominox || (dominox = {}));
//# sourceMappingURL=Score.js.map