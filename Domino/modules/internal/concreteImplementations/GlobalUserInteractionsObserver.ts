/// <reference path = "../Interfaces.ts"/>

module dominox
{

    export class GlobalUserInteractionsObserver implements dominox.UserIntentionsObserver
    {

        private selectedTileFromPlayerListCallback: TileCallback;
        private selectedTileFromBoardCallback: TileCallback;
        private defaultCallback: VoidCallback;



        public callForTileSelectedFromBoard(tile: DominoTile) {
            this.callTileCallbackIfNotNull(this.selectedTileFromBoardCallback, tile);
        }

        public callForTileSelectedFromPlayerList(tile: DominoTile) {
            this.callTileCallbackIfNotNull(this.selectedTileFromPlayerListCallback, tile);
        }


        public callForDefaultCallback() {
            dominox.callIfNotNull(this.defaultCallback);
        }

        setCallbackCaseWhenSelectingTileFromBoard(selectedTileCallback: TileCallback): void
        {
            this.selectedTileFromBoardCallback = selectedTileCallback;
        }

        setCallbackCaseWhenSelectingTileFromPlayerTileList(selectedTileCallback: TileCallback): void
        {
            this.selectedTileFromPlayerListCallback = selectedTileCallback;
        }

        setCallbackCaseDefault(defaultCallback: VoidCallback): void
        {
            this.defaultCallback = defaultCallback;
        }



        callTileCallbackIfNotNull(tileCallback: TileCallback, tile: DominoTile)
        {
            if (tileCallback != null && tileCallback != undefined)
                tileCallback(tile);
        }
    }

}