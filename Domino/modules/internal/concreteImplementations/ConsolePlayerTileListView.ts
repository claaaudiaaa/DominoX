/// <reference path="../Interfaces.ts"/>
module dominox
{

    export class ConsolePlayerTileListView implements dominox.PlayerTileListView
    {
        private playerName: String;

        setPlayerName(playerName: String)
        {
            console.log("PlayerTileListView playerName is " + playerName);
            this.playerName = playerName;
        }

        setPlayerScore(playerScore: number) {
            console.log("PlayerTileListView playerScore is " + playerScore);
        }

        setAndDisplayOverallTileList(tileList: dominox.DominoTile[], callbackWhenDone: VoidCallback)
        {
            console.log("Displaying overall tile list for player " + this.playerName + ": " + stringifyTileList(tileList));
            callIfNotNull(callbackWhenDone);
        }

        displayTileAsSelected(tile: dominox.DominoTile, callbackWhenDone: VoidCallback): void
        {
            console.log("Tile is selected for player " + this.playerName + ": " + tile.toString());
        }

        removeTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback)
        {
            console.log("Removing tile for player " + this.playerName + ": " + tile.toString());
            callIfNotNull(callbackWhenDone); 
        }

        displayAsNormal(callbackWhenDone: VoidCallback): void
        {
            console.log("Displaying as normal ConsolePlayerTileListView for player " + this.playerName);
            callIfNotNull(callbackWhenDone);
        }

        setInvisible(callbackWhenDone: VoidCallback)
        {
            console.log("Setting ConsolePlayerTileListView invisible for player " + this.playerName);
            callIfNotNull(callbackWhenDone);
        }

        setVisible(callbackWhenDone: VoidCallback)
        {
            console.log("Setting ConsolePlayerTileLisrView visible for player " + this.playerName);
            callIfNotNull(callbackWhenDone);
        }

        addTile(tile: dominox.DominoTile, callbackWhenDone: dominox.VoidCallback)
        {
            console.log("Adding tile or player " + this.playerName + " " + tile.toString());
            callIfNotNull(callbackWhenDone);
        }
    }
}