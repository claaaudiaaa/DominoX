/// <reference path="../Interfaces.ts"/>

module dominox {

    export class DivPlayerTileListView implements dominox.PlayerTileListView
    {

        private mainContainerForAll: HTMLDivElement;

        private playerNameHeading: HTMLHeadingElement;
        private playerImagesContainer: HTMLDivElement;
        private playerScoreHeading: HTMLHeadingElement;

        private imgList: HTMLImageElement[];
        private tileList: DominoTile[];
        private highlightedTiles: DominoTile[];
        private selectedTile: DominoTile;

        private onTileSelected: TileCallback;

        private imagesContainer: HTMLDivElement;

        private playerName: string;

        constructor(mainContainer: HTMLDivElement, imagesContainer: HTMLDivElement, onTileSelected: TileCallback)
        {
            this.onTileSelected = onTileSelected;
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

            //("Displaying tile list for player " + this.playerName);
            //console.log(stringifyTileList(tileList));

            this.tileList = tileList;
            this.imgList = [];

            dominox.removeAllChildNodesOfElement(this.playerImagesContainer);
            var self = this;

            for (var i = 0; i < tileList.length; i++)
            {
                var tile = tileList[i];
                var image = dominox.getImageForTileFromContainer(tile, this.imagesContainer);
                this.playerImagesContainer.appendChild(image);

                this.imgList.push(image);
                var index = i;
                image.onclick = this.createCallbackForIndexAndImage(image, index, this);
            }
        }


        displayTileAsSelected(tile: dominox.DominoTile, callbackWhenDone: VoidCallback): void
        {
            this.selectedTile = tile;
            var img = this.findImgForTileFromContainer(tile, this.tileList, this.playerImagesContainer);

            //console.log("Displaying tile as selected for player " + this.playerName);
            //console.log(tile.toString());

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
            this.imgList.splice(index, 1);
            callIfNotNull(callbackWhenDone);
        }

        addTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback)
        {
            var image = dominox.getImageForTileFromContainer(tile, this.imagesContainer);
            this.checkImageExistsOrThrow(image);
            this.playerImagesContainer.appendChild(image);
            this.tileList.push(tile);

            var tileIndex = this.tileList.indexOf(tile); // it should be length-1 but hmm 

            var self = this;
            image.onclick = this.createCallbackForIndexAndImage(image, tileIndex, this);
            this.imgList.push(image);

            callIfNotNull(callbackWhenDone);
        }

        createCallbackForIndexAndImage(image: HTMLImageElement, index: number, self: DivPlayerTileListView): (ev: any) => any
        {
            return function (ev: any)
            {
                self.imageWasClicked(image);
            }
        }

        displayAsNormal(callbackWhenDone: VoidCallback): void
        {
            if (this.selectedTile != null)
            {
                var img = this.findImgForTileFromContainer(this.selectedTile,
                    this.tileList, this.playerImagesContainer);
                this.checkImageExistsOrThrow(img);

                img.style.borderRadius = "1px";
                
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

            var image: HTMLImageElement = this.imgList[index];
            if (image != undefined && image != null)
                return image;

            return null;
        }


        checkImageExistsOrThrow(img: HTMLImageElement) {
            if (img == undefined || img == null)
                throw "Expected image to exist";
        }


        imageWasClicked(image: HTMLImageElement)
        {
            var tile = null;

            for (var i = 0; i < this.imgList.length; i++)
            {
                if (this.imgList[i] === image)
                    tile = this.tileList[i];
            }

            
            if (tile == null || tile == undefined)
                throw "Expected tile to be in tileList in divPlayerTileListView";

            this.onTileSelected(tile);
        }



    }
}