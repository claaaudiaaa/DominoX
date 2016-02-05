/// <reference path="PlayTileUseCaseInput.ts"/>
/// <reference path="PlayTileUseCaseOutput.ts"/>
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
                    var PlayTileUseCase = (function () {
                        function PlayTileUseCase() {
                        }
                        PlayTileUseCase.prototype.beginWithInputAndCallback = function (input, callbackWhenDone) {
                            var output = new playTileUseCase.PlayTileUseCaseOutput();
                            var availableNeighbours = input.dominoGame.getNeighbourListForTileFromBoard(input.tile, input.tileBoard);
                            if (availableNeighbours.length == 0) {
                                output.resultOfUseCase = playTileUseCase.PlayTileUseCaseResult.Canceled;
                                callbackWhenDone(output);
                                return;
                            }
                            input.tileView.highlightListOfTilesFromBoard(availableNeighbours, input.tileBoard, null);
                            input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(function (tile) {
                                input.tileView.displayAsNormal(null);
                                if (this.isTileInArray(tile, availableNeighbours) == false) {
                                    output.resultOfUseCase = playTileUseCase.PlayTileUseCaseResult.Canceled;
                                    callbackWhenDone(output);
                                    return;
                                }
                                input.tileBoard.addTileAsNeighbourToTile(input.tile, tile);
                                input.dominoGame.playerDidAddTileAsNeighbourToTileInBoard(input.player, tile, input.tile, input.tileBoard);
                                input.tileView.drawTileAsNeighbourOfTileFromBoard(tile, input.tile, input.tileBoard, null);
                                input.userIntentionsObserver.setCallbackCaseDefault(null);
                                input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(null);
                                output.resultOfUseCase = playTileUseCase.PlayTileUseCaseResult.Completed;
                                callbackWhenDone(output);
                            });
                            input.userIntentionsObserver.setCallbackCaseDefault(function () {
                                input.tileView.displayAsNormal(null);
                                input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(null);
                                input.userIntentionsObserver.setCallbackCaseDefault(null);
                                output.resultOfUseCase = playTileUseCase.PlayTileUseCaseResult.Canceled;
                                callbackWhenDone(output);
                            });
                        };
                        PlayTileUseCase.prototype.isTileInArray = function (tile, array) {
                            for (var otherTile in array) {
                                if (otherTile.isEqualToTile(tile)) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        return PlayTileUseCase;
                    })();
                    playTileUseCase.PlayTileUseCase = PlayTileUseCase;
                })(playTileUseCase = useCases.playTileUseCase || (useCases.playTileUseCase = {}));
            })(useCases = internal.useCases || (internal.useCases = {}));
        })(internal = dominox.internal || (dominox.internal = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=PlayTileUseCase.js.map