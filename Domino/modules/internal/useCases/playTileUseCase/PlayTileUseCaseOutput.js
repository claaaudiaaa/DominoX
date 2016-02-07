var dominox;
(function (dominox) {
    (function (PlayTileUseCaseResult) {
        PlayTileUseCaseResult[PlayTileUseCaseResult["Completed"] = 0] = "Completed";
        PlayTileUseCaseResult[PlayTileUseCaseResult["Canceled"] = 1] = "Canceled";
        PlayTileUseCaseResult[PlayTileUseCaseResult["Unknown"] = 2] = "Unknown";
    })(dominox.PlayTileUseCaseResult || (dominox.PlayTileUseCaseResult = {}));
    var PlayTileUseCaseResult = dominox.PlayTileUseCaseResult;
    var PlayTileUseCaseOutput = (function () {
        function PlayTileUseCaseOutput() {
            this.resultOfUseCase = PlayTileUseCaseResult.Unknown;
        }
        return PlayTileUseCaseOutput;
    })();
    dominox.PlayTileUseCaseOutput = PlayTileUseCaseOutput;
})(dominox || (dominox = {}));
//# sourceMappingURL=PlayTileUseCaseOutput.js.map