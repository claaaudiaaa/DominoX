/// <reference path="../Interfaces.ts"/>
/// <reference path = "../dominoModels/DominoTile.ts"/>

module dominox {

    export class DebugUserIntentionsObserver implements dominox.UserIntentionsObserver {

        private whenSelectingTileFromBoard: dominox.TileCallback;
        private whenSelectingTileFromList: dominox.TileCallback;
        private whenDoingDefault: dominox.VoidCallback;

        //
        public tileBoard: TileBoard;
        public currentPlayer: Player;

        private tileSelectedFromBoard: dominox.DominoTile;
        private tileSelectedFromList: dominox.DominoTile;

        //

        constructor(buttonSelectFromBoard: HTMLButtonElement,
            buttonSelectFromList: HTMLButtonElement,
            buttonDoDefault: HTMLButtonElement)
        {
            var observerSelf: DebugUserIntentionsObserver = this;
            buttonSelectFromBoard.onclick = function (event: MouseEvent)
            {
                console.log("Selected tile from board: " + observerSelf.tileSelectedFromBoard.toString());
                observerSelf.whenSelectingTileFromBoard(observerSelf.tileSelectedFromBoard);
            };

            buttonSelectFromList.onclick = function (event: MouseEvent)
            {
                var playerTileList = observerSelf.currentPlayer.getTileList();
                for (var i = 0; i < playerTileList.length; i++) {
                    var tile = playerTileList[i];
                    var matchingTiles = observerSelf.tileBoard.getExternalTilesListMatchingTile(tile);
                    if (matchingTiles.length > 0) {
                        observerSelf.tileSelectedFromList = tile;
                        observerSelf.tileSelectedFromBoard = matchingTiles[0];
                        break;
                    }
                }

                console.log("Selected tile  from player list" + observerSelf.tileSelectedFromList.toString());
                observerSelf.whenSelectingTileFromList(observerSelf.tileSelectedFromList);
            };

            buttonDoDefault.onclick = function (ev: MouseEvent) {
                observerSelf.whenDoingDefault();
            };
        }

        setCallbackCaseWhenSelectingTileFromBoard(selectedTileCallback: dominox.TileCallback): void
        {
            this.whenSelectingTileFromBoard = selectedTileCallback;
        }
        setCallbackCaseWhenSelectingTileFromPlayerTileList(selectedTileCallback: dominox.TileCallback): void {
            this.whenSelectingTileFromList = selectedTileCallback;
        }
        setCallbackCaseDefault(defaultCallback: VoidCallback): void {
            this.whenDoingDefault = defaultCallback;
        }
    }

}