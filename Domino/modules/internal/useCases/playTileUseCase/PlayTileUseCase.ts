/// <reference path="PlayTileUseCaseInput.ts"/>
/// <reference path="PlayTileUseCaseOutput.ts"/>

module com.dominox.internal.useCases.playTileUseCase {
    export interface PlayTileUseCaseCallback {
        (output: PlayTileUseCaseOutput): void
    }

    export class PlayTileUseCase {
        public beginWithInputAndCallback(input: PlayTileUseCaseInput, callbackWhenDone: PlayTileUseCaseCallback): void
        {
            var output: PlayTileUseCaseOutput = new PlayTileUseCaseOutput();
            var availableNeighbours: dominoModels.DominoTile[] = input.dominoGame.getNeighbourListForTileFromBoard(input.tile,
                input.tileBoard);

            if (availableNeighbours.length == 0) {
                output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                callbackWhenDone(output);
                return;
            }

            input.tileView.highlightListOfTilesFromBoard(availableNeighbours, input.tileBoard, null);

            input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(function (tile: dominoModels.DominoTile) {

                input.tileView.displayAsNormal(null);

                if (this.isTileInArray(tile, availableNeighbours) == false) {
                    output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                    callbackWhenDone(output);
                    return;
                }

                input.tileBoard.addTileAsNeighbourToTile(input.tile, tile);
                input.dominoGame.playerDidAddTileAsNeighbourToTileInBoard(input.player, tile, input.tile, input.tileBoard);
                input.tileView.drawTileAsNeighbourOfTileFromBoard(tile, input.tile, input.tileBoard, null);

                input.userIntentionsObserver.setCallbackCaseDefault(null);
                input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(null);

                output.resultOfUseCase = PlayTileUseCaseResult.Completed;
                callbackWhenDone(output);
            });

            input.userIntentionsObserver.setCallbackCaseDefault(function () {

                input.tileView.displayAsNormal(null);

                input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(null);
                input.userIntentionsObserver.setCallbackCaseDefault(null);

                output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                callbackWhenDone(output);

            });

        }

        public isTileInArray(tile: dominoModels.DominoTile, array: dominoModels.DominoTile[]): boolean
        {
            for (var otherTile in array) {
                if (otherTile.isEqualToTile(tile)) {
                    return true;
                }
            }

            return false;
        }


    }

}