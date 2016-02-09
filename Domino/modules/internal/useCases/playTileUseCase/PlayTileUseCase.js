/// <reference path="PlayTileUseCaseInput.ts"/>
/// <reference path="PlayTileUseCaseOutput.ts"/>
var dominox;
(function (dominox) {
    var PlayTileUseCase = (function () {
        function PlayTileUseCase() {
        }
        PlayTileUseCase.prototype.beginWithInputAndCallback = function (input, callbackWhenDone) {
            var output = new dominox.PlayTileUseCaseOutput();
            var availableNeighbours = input.dominoGame.getNeighbourListForTileFromBoard(input.tile, input.tileBoard);
            input.playerTileListView.displayTileAsSelected(input.tile, null);
            var cancelAction = function () {
                input.tileBoardView.displayAsNormalTileBoard(input.tileBoard, null);
                output.resultOfUseCase = dominox.PlayTileUseCaseResult.Canceled;
                input.playerTileListView.displayAsNormal(null);
                callbackWhenDone(output);
            };
            if (availableNeighbours.length == 0) {
                cancelAction();
                return;
            }
            input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromPlayerTileList(function (tile) {
                cancelAction();
                return;
            });
            var self = this;
            input.tileView.highlightListOfTilesFromBoard(availableNeighbours, input.tileBoard, null);
            input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(function (tile) {
                input.tileView.displayAsNormalTileBoard(input.tileBoard, null);
                input.playerTileListView.displayAsNormal(null);
                if (self.isTileInArray(tile, availableNeighbours) == false) {
                    cancelAction();
                    return;
                }
                input.tileBoard.addTileAsNeighbourToTile(input.tile, tile);
                input.dominoGame.playerDidAddTileAsNeighbourToTileInBoard(input.player, tile, input.tile, input.tileBoard);
                input.tileView.drawTileAsNeighbourOfTileFromBoard(tile, input.tile, input.tileBoard, null);
                input.playerTileListView.setPlayerScore(input.player.getScore());
                input.userIntentionsObserver.setCallbackCaseDefault(null);
                input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(null);
                input.player.removeTile(input.tile);
                input.playerTileListView.removeTile(input.tile, null);
                input.tileBoardView.displayAsNormalTileBoard(input.tileBoard, null);
                output.resultOfUseCase = dominox.PlayTileUseCaseResult.Completed;
                callbackWhenDone(output);
            });
            input.userIntentionsObserver.setCallbackCaseDefault(function () {
                cancelAction();
            });
        };
        PlayTileUseCase.prototype.isTileInArray = function (tile, array) {
            for (var i = 0; i < array.length; i++) {
                var otherTile = array[i];
                if (otherTile.isEqualToTile(tile)) {
                    return true;
                }
            }
            return false;
        };
        return PlayTileUseCase;
    })();
    dominox.PlayTileUseCase = PlayTileUseCase;
})(dominox || (dominox = {}));
//# sourceMappingURL=PlayTileUseCase.js.map