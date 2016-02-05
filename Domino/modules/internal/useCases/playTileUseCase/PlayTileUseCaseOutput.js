var com;
(function (com) {
    var dominox;
    (function (dominox) {
        var internal;
        (function (internal) {
            var useCases;
            (function (useCases) {
                var playTileUseCase;
                (function (playTileUseCase) {
                    (function (PlayTileUseCaseResult) {
                        PlayTileUseCaseResult[PlayTileUseCaseResult["Completed"] = 0] = "Completed";
                        PlayTileUseCaseResult[PlayTileUseCaseResult["Canceled"] = 1] = "Canceled";
                        PlayTileUseCaseResult[PlayTileUseCaseResult["Unknown"] = 2] = "Unknown";
                    })(playTileUseCase.PlayTileUseCaseResult || (playTileUseCase.PlayTileUseCaseResult = {}));
                    var PlayTileUseCaseResult = playTileUseCase.PlayTileUseCaseResult;
                    var PlayTileUseCaseOutput = (function () {
                        function PlayTileUseCaseOutput() {
                            this.resultOfUseCase = PlayTileUseCaseResult.Unknown;
                        }
                        return PlayTileUseCaseOutput;
                    })();
                    playTileUseCase.PlayTileUseCaseOutput = PlayTileUseCaseOutput;
                })(playTileUseCase = useCases.playTileUseCase || (useCases.playTileUseCase = {}));
            })(useCases = internal.useCases || (internal.useCases = {}));
        })(internal = dominox.internal || (dominox.internal = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=PlayTileUseCaseOutput.js.map