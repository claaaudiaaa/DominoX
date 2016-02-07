/// <reference path="../Interfaces.ts"/>
/// <reference path = "../dominoModels/DominoTile.ts"/>
var dominox;
(function (dominox) {
    var DebugUserIntentionsObserver = (function () {
        //
        function DebugUserIntentionsObserver(buttonSelectFromBoard, buttonSelectFromList, buttonDoDefault) {
            var observerSelf = this;
            buttonSelectFromBoard.onclick = function (event) {
                console.log("Selected tile from board: " + observerSelf.tileSelectedFromBoard.toString());
                observerSelf.whenSelectingTileFromBoard(observerSelf.tileSelectedFromBoard);
            };
            buttonSelectFromList.onclick = function (event) {
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
            buttonDoDefault.onclick = function (ev) {
                observerSelf.whenDoingDefault();
            };
        }
        DebugUserIntentionsObserver.prototype.setCallbackCaseWhenSelectingTileFromBoard = function (selectedTileCallback) {
            this.whenSelectingTileFromBoard = selectedTileCallback;
        };
        DebugUserIntentionsObserver.prototype.setCallbackCaseWhenSelectingTileFromPlayerTileList = function (selectedTileCallback) {
            this.whenSelectingTileFromList = selectedTileCallback;
        };
        DebugUserIntentionsObserver.prototype.setCallbackCaseDefault = function (defaultCallback) {
            this.whenDoingDefault = defaultCallback;
        };
        return DebugUserIntentionsObserver;
    })();
    dominox.DebugUserIntentionsObserver = DebugUserIntentionsObserver;
})(dominox || (dominox = {}));
//# sourceMappingURL=DebugUserIntentionsObserver.js.map