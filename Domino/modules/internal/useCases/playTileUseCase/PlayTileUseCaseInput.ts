/// <reference path="../../dominoModels/DominoTile.ts" />
/// <reference path="../../Interfaces.ts"/>
/// <reference path="../../Player.ts"/>
module com.dominox.internal.useCases.playTileUseCase {
    export class PlayTileUseCaseInput {

        public player: Player;
        public tile: dominoModels.DominoTile;
        public tileBoard: TileBoard;
        public tileView: TileBoardView;
        public dominoGame: DominoGame;
        public userIntentionsObserver: UserIntentionsObserver;

        // and other stuff to be added soon

    }
}