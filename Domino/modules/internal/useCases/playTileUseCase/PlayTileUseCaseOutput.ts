module dominox {

    export enum PlayTileUseCaseResult {
        Completed,
        Canceled,
        Unknown
    }

    export class PlayTileUseCaseOutput {
        public resultOfUseCase: PlayTileUseCaseResult;

        constructor() {
            this.resultOfUseCase = PlayTileUseCaseResult.Unknown;
        }
    }
}