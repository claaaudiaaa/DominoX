/// <reference path = "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var GlobalUserInteractionsObserver = (function () {
        function GlobalUserInteractionsObserver() {
        }
        GlobalUserInteractionsObserver.prototype.callForTileSelectedFromBoard = function (tile) {
            this.callTileCallbackIfNotNull(this.selectedTileFromBoardCallback, tile);
        };
        GlobalUserInteractionsObserver.prototype.callForTileSelectedFromPlayerList = function (tile) {
            this.callTileCallbackIfNotNull(this.selectedTileFromPlayerListCallback, tile);
        };
        GlobalUserInteractionsObserver.prototype.callForDefaultCallback = function () {
            dominox.callIfNotNull(this.defaultCallback);
        };
        GlobalUserInteractionsObserver.prototype.setCallbackCaseWhenSelectingTileFromBoard = function (selectedTileCallback) {
            this.selectedTileFromBoardCallback = selectedTileCallback;
        };
        GlobalUserInteractionsObserver.prototype.setCallbackCaseWhenSelectingTileFromPlayerTileList = function (selectedTileCallback) {
            this.selectedTileFromPlayerListCallback = selectedTileCallback;
        };
        GlobalUserInteractionsObserver.prototype.setCallbackCaseDefault = function (defaultCallback) {
            this.defaultCallback = defaultCallback;
        };
        GlobalUserInteractionsObserver.prototype.callTileCallbackIfNotNull = function (tileCallback, tile) {
            if (tileCallback != null && tileCallback != undefined)
                tileCallback(tile);
        };
        return GlobalUserInteractionsObserver;
    })();
    dominox.GlobalUserInteractionsObserver = GlobalUserInteractionsObserver;
})(dominox || (dominox = {}));
//# sourceMappingURL=GlobalUserInteractionsObserver.js.map