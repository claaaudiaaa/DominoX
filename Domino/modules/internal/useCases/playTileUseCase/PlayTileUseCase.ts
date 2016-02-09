/// <reference path="PlayTileUseCaseInput.ts"/>
/// <reference path="PlayTileUseCaseOutput.ts"/>

module dominox {
    export interface PlayTileUseCaseCallback {
        (output: PlayTileUseCaseOutput): void
    }

    export class PlayTileUseCase {
        public beginWithInputAndCallback(input: PlayTileUseCaseInput, callbackWhenDone: PlayTileUseCaseCallback): void
        {
            var output: PlayTileUseCaseOutput = new PlayTileUseCaseOutput();
            var availableNeighbours: dominox.DominoTile[] = input.dominoGame.getNeighbourListForTileFromBoard(input.tile,
                input.tileBoard);

            input.playerTileListView.displayTileAsSelected(input.tile, null);

            if (availableNeighbours.length == 0)
            {
                output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                input.playerTileListView.displayAsNormal(null);
                callbackWhenDone(output);
                return;
            }

            input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromPlayerTileList(function (tile: DominoTile) {
                
                output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                input.playerTileListView.displayAsNormal(null);
                callbackWhenDone(output);
                return;
            });

            var self = this;

            input.tileView.highlightListOfTilesFromBoard(availableNeighbours, input.tileBoard, null);

            input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(function (tile: dominox.DominoTile) {

                input.tileView.displayAsNormalTileBoard(input.tileBoard, null);
                input.playerTileListView.displayAsNormal(null);

                if (self.isTileInArray(tile, availableNeighbours) == false) {
                    output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                    callbackWhenDone(output);
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

                output.resultOfUseCase = PlayTileUseCaseResult.Completed;
                callbackWhenDone(output);
            });

            input.userIntentionsObserver.setCallbackCaseDefault(function () {

                input.tileView.displayAsNormalTileBoard(input.tileBoard, null);
                input.playerTileListView.displayAsNormal(null);

                input.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromBoard(null);
                input.userIntentionsObserver.setCallbackCaseDefault(null);

                output.resultOfUseCase = PlayTileUseCaseResult.Canceled;
                callbackWhenDone(output);

            });

        }

        public isTileInArray(tile: dominox.DominoTile, array: dominox.DominoTile[]): boolean
        {
            for (var i = 0; i < array.length; i++)
            {
                var otherTile = array[i];
                if (otherTile.isEqualToTile(tile)) {
                    return true;
                }
            }

            return false;
        }


    }

}