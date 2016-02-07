/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var ConsolePlayerTileListView = (function () {
        function ConsolePlayerTileListView() {
        }
        ConsolePlayerTileListView.prototype.setPlayerName = function (playerName) {
            console.log("PlayerTileListView playerName is " + playerName);
            this.playerName = playerName;
        };
        ConsolePlayerTileListView.prototype.setPlayerScore = function (playerScore) {
            console.log("PlayerTileListView playerScore is " + playerScore);
        };
        ConsolePlayerTileListView.prototype.setAndDisplayOverallTileList = function (tileList, callbackWhenDone) {
            console.log("Displaying overall tile list for player " + this.playerName + ": " + dominox.stringifyTileList(tileList));
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsolePlayerTileListView.prototype.displayTileAsSelected = function (tile, callbackWhenDone) {
            console.log("Tile is selected for player " + this.playerName + ": " + tile.toString());
        };
        ConsolePlayerTileListView.prototype.removeTile = function (tile, callbackWhenDone) {
            console.log("Removing tile for player " + this.playerName + ": " + tile.toString());
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsolePlayerTileListView.prototype.displayAsNormal = function (callbackWhenDone) {
            console.log("Displaying as normal ConsolePlayerTileListView for player " + this.playerName);
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsolePlayerTileListView.prototype.setInvisible = function (callbackWhenDone) {
            console.log("Setting ConsolePlayerTileListView invisible for player " + this.playerName);
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsolePlayerTileListView.prototype.setVisible = function (callbackWhenDone) {
            console.log("Setting ConsolePlayerTileLisrView visible for player " + this.playerName);
            dominox.callIfNotNull(callbackWhenDone);
        };
        ConsolePlayerTileListView.prototype.addTile = function (tile, callbackWhenDone) {
            console.log("Adding tile or player " + this.playerName + " " + tile.toString());
            dominox.callIfNotNull(callbackWhenDone);
        };
        return ConsolePlayerTileListView;
    })();
    dominox.ConsolePlayerTileListView = ConsolePlayerTileListView;
})(dominox || (dominox = {}));
//# sourceMappingURL=ConsolePlayerTileListView.js.map