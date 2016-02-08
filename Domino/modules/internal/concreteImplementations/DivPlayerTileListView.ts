/// <reference path="../Interfaces.ts"/>

module dominox {

    export class DivPlayerTileListView implements dominox.PlayerTileListView
    {

        private mainContainerForAll: HTMLDivElement;

        private playerNameHeading: HTMLHeadingElement;
        private playerImagesContainer: HTMLDivElement;
        private playerScoreHeading: HTMLHeadingElement;

        private tileList: DominoTile[];
        private highlightedTiles: DominoTile[];
        private selectedTile: DominoTile;

        private imagesContainer: HTMLDivElement;

        private playerName: string;

        constructor(mainContainer: HTMLDivElement, imagesContainer: HTMLDivElement)
        {
            this.setImagesContainer(imagesContainer);
            this.setMainContainerForAllElements(mainContainer);
        }

        public setImagesContainer(imagesContainer: HTMLDivElement) {
            this.imagesContainer = imagesContainer;
        }

        public setMainContainerForAllElements(mainContainer: HTMLDivElement)
        {
            this.playerNameHeading = <HTMLHeadingElement>mainContainer.getElementsByClassName("playerName")[0];
            this.playerScoreHeading = <HTMLHeadingElement>mainContainer.getElementsByClassName("playerScore")[0];
            this.playerImagesContainer = <HTMLDivElement>mainContainer.getElementsByClassName("playerTiles")[0];
            this.mainContainerForAll = mainContainer;
        }

        setPlayerName(playerName: string)
        {
            this.playerName = playerName;
            this.playerNameHeading.innerHTML = playerName; 
        }
        setPlayerScore(playerScore: number)
        {
            this.playerScoreHeading.innerHTML = "" + playerScore;
        }

        setAndDisplayOverallTileList(tileList: dominox.DominoTile[], callbackWhenDone: VoidCallback)
        {

            console.log("Displaying tile list for player " + this.playerName);
            console.log(stringifyTileList(tileList));

            this.tileList = tileList;
            dominox.removeAllChildNodesOfElement(this.playerImagesContainer);

            for (var i = 0; i < tileList.length; i++)
            {
                var tile = tileList[i];
                var image = dominox.getImageForTileFromContainer(tile, this.imagesContainer);
                this.playerImagesContainer.appendChild(image);
            }
        }


        displayTileAsSelected(tile: dominox.DominoTile, callbackWhenDone: VoidCallback): void
        {
            this.selectedTile = tile;
            var img = this.findImgForTileFromContainer(tile, this.tileList, this.playerImagesContainer);

            console.log("Displaying tile as selected for player " + this.playerName);
            console.log(tile.toString());

            this.checkImageExistsOrThrow(img);
            img.style.borderRadius = "50%";
            img.style.borderColor = "yellow";

            callIfNotNull(callbackWhenDone);
        }

        removeTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback)
        {
            var img = this.findImgForTileFromContainer(tile, this.tileList, this.playerImagesContainer);
            this.checkImageExistsOrThrow(img);
            this.playerImagesContainer.removeChild(img);

            var index = this.tileList.indexOf(tile);
            this.tileList.splice(index, 1);

            callIfNotNull(callbackWhenDone);
        }

        addTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback)
        {
            var image = dominox.getImageForTileFromContainer(tile, this.imagesContainer);
            this.playerImagesContainer.appendChild(image);
            this.tileList.push(tile);
            callIfNotNull(callbackWhenDone);
        }

        displayAsNormal(callbackWhenDone: VoidCallback): void
        {
            if (this.selectedTile != null)
            {
                var img = this.findImgForTileFromContainer(this.selectedTile,
                    this.tileList, this.playerImagesContainer);
                this.checkImageExistsOrThrow(img);

                img.style.borderRadius = "";
                img.style.borderColor = "";
                this.selectedTile = null;
            }

            callIfNotNull(callbackWhenDone);
        }

        setInvisible(callbackWhenDone: VoidCallback)
        {
            this.mainContainerForAll.hidden = true;
            callIfNotNull(callbackWhenDone);
        }

        setVisible(callbackWhenDone: VoidCallback)
        {
            this.mainContainerForAll.hidden = false;
            callIfNotNull(callbackWhenDone);
        }

        findImgForTileFromContainer(tile: DominoTile, inList: DominoTile[],
            imagesContainer: HTMLDivElement): HTMLImageElement
        {
            var index = inList.indexOf(tile);
            if (index < 0)
                return null;

            var image: HTMLImageElement = <HTMLImageElement>imagesContainer.children[index];
            if (image != undefined && image != null)
                return image;

            return null;
        }


        checkImageExistsOrThrow(img: HTMLImageElement) {
            if (img == undefined || img == null)
                throw "Expected image to exist";
        }

    }
}