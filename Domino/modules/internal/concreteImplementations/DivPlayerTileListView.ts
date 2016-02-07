/// <reference path="../Interfaces.ts"/>

module dominox {

    export class DivPlayerTileListView implements dominox.PlayerTileListView
    {

        private mainContainerForAll: HTMLDivElement;

        private playerNameParagraph: HTMLParagraphElement;
        private playerImagesContainer: HTMLDivElement;
        private playerScoreParagraph: HTMLParagraphElement;

        private imagesContainer: HTMLDivElement;

        public setImagesContainer(imagesContainer: HTMLDivElement) {
            this.imagesContainer = imagesContainer;
        }

        public setMainContainerForAllElements(mainContainer: HTMLDivElement)
        {
            this.mainContainerForAll = mainContainer;
        }

        setPlayerName(playerName: String) {

            //aici alterezei paragraful cu numele plaeyerului 
        }
        setPlayerScore(playerScore: number) {
        }

        setAndDisplayOverallTileList(tileList: dominox.DominoTile[], callbackWhenDone: VoidCallback)
        {
            //aici alterezi divul cu imagini 
        }
        displayTileAsSelected(tile: dominox.DominoTile, callbackWhenDone: VoidCallback): void
        {

        }

        removeTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback) {
        }
        addTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback) {
        }

        displayAsNormal(callbackWhenDone: VoidCallback): void {
        }
        setInvisible(callbackWhenDone: VoidCallback) {
        }
        setVisible(callbackWhenDone: VoidCallback) {
        }
    }
}