/// <reference path="../../dominoModels/DominoTile.ts" />
/// <reference path="../../Interfaces.ts"/>
/// <reference path="../../Player.ts"/>
module dominox {
    export class PlayTileUseCaseInput {

        public player: Player;
        public tile: dominox.DominoTile;
        public tileBoard: TileBoard;
        public tileView: TileBoardView;
        public dominoGame: DominoGame;
        public userIntentionsObserver: UserIntentionsObserver;

        // and other stuff to be added soon

    }
}