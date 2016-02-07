/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var DivPlayerTileListView = (function () {
        function DivPlayerTileListView() {
        }
        DivPlayerTileListView.prototype.setImagesContainer = function (imagesContainer) {
            this.imagesContainer = imagesContainer;
        };
        DivPlayerTileListView.prototype.setMainContainerForAllElements = function (mainContainer) {
            this.mainContainerForAll = mainContainer;
        };
        DivPlayerTileListView.prototype.setPlayerName = function (playerName) {
            //aici alterezei paragraful cu numele plaeyerului 
        };
        DivPlayerTileListView.prototype.setPlayerScore = function (playerScore) {
        };
        DivPlayerTileListView.prototype.setAndDisplayOverallTileList = function (tileList, callbackWhenDone) {
            //aici alterezi divul cu imagini 
        };
        DivPlayerTileListView.prototype.displayTileAsSelected = function (tile, callbackWhenDone) {
        };
        DivPlayerTileListView.prototype.removeTile = function (tile, callbackWhenDone) {
        };
        DivPlayerTileListView.prototype.addTile = function (tile, callbackWhenDone) {
        };
        DivPlayerTileListView.prototype.displayAsNormal = function (callbackWhenDone) {
        };
        DivPlayerTileListView.prototype.setInvisible = function (callbackWhenDone) {
        };
        DivPlayerTileListView.prototype.setVisible = function (callbackWhenDone) {
        };
        return DivPlayerTileListView;
    })();
    dominox.DivPlayerTileListView = DivPlayerTileListView;
})(dominox || (dominox = {}));
//# sourceMappingURL=DivPlayerTileListView.js.map