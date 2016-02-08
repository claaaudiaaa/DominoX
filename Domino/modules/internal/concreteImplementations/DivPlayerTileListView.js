/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var DivPlayerTileListView = (function () {
        function DivPlayerTileListView(mainContainer, imagesContainer) {
            this.setImagesContainer(imagesContainer);
            this.setMainContainerForAllElements(mainContainer);
        }
        DivPlayerTileListView.prototype.setImagesContainer = function (imagesContainer) {
            this.imagesContainer = imagesContainer;
        };
        DivPlayerTileListView.prototype.setMainContainerForAllElements = function (mainContainer) {
            this.playerNameHeading = mainContainer.getElementsByClassName("playerName")[0];
            this.playerScoreHeading = mainContainer.getElementsByClassName("playerScore")[0];
            this.playerImagesContainer = mainContainer.getElementsByClassName("playerTiles")[0];
            this.mainContainerForAll = mainContainer;
        };
        DivPlayerTileListView.prototype.setPlayerName = function (playerName) {
            this.playerName = playerName;
            this.playerNameHeading.innerHTML = playerName;
        };
        DivPlayerTileListView.prototype.setPlayerScore = function (playerScore) {
            this.playerScoreHeading.innerHTML = "" + playerScore;
        };
        DivPlayerTileListView.prototype.setAndDisplayOverallTileList = function (tileList, callbackWhenDone) {
            console.log("Displaying tile list for player " + this.playerName);
            console.log(dominox.stringifyTileList(tileList));
            this.tileList = tileList;
            dominox.removeAllChildNodesOfElement(this.playerImagesContainer);
            for (var i = 0; i < tileList.length; i++) {
                var tile = tileList[i];
                var image = dominox.getImageForTileFromContainer(tile, this.imagesContainer);
                this.playerImagesContainer.appendChild(image);
            }
        };
        DivPlayerTileListView.prototype.displayTileAsSelected = function (tile, callbackWhenDone) {
            this.selectedTile = tile;
            var img = this.findImgForTileFromContainer(tile, this.tileList, this.playerImagesContainer);
            console.log("Displaying tile as selected for player " + this.playerName);
            console.log(tile.toString());
            this.checkImageExistsOrThrow(img);
            img.style.borderRadius = "50%";
            img.style.borderColor = "yellow";
            dominox.callIfNotNull(callbackWhenDone);
        };
        DivPlayerTileListView.prototype.removeTile = function (tile, callbackWhenDone) {
            var img = this.findImgForTileFromContainer(tile, this.tileList, this.playerImagesContainer);
            this.checkImageExistsOrThrow(img);
            this.playerImagesContainer.removeChild(img);
            var index = this.tileList.indexOf(tile);
            this.tileList.splice(index, 1);
            dominox.callIfNotNull(callbackWhenDone);
        };
        DivPlayerTileListView.prototype.addTile = function (tile, callbackWhenDone) {
            var image = dominox.getImageForTileFromContainer(tile, this.imagesContainer);
            this.playerImagesContainer.appendChild(image);
            this.tileList.push(tile);
            dominox.callIfNotNull(callbackWhenDone);
        };
        DivPlayerTileListView.prototype.displayAsNormal = function (callbackWhenDone) {
            if (this.selectedTile != null) {
                var img = this.findImgForTileFromContainer(this.selectedTile, this.tileList, this.playerImagesContainer);
                this.checkImageExistsOrThrow(img);
                img.style.borderRadius = "";
                img.style.borderColor = "";
                this.selectedTile = null;
            }
            dominox.callIfNotNull(callbackWhenDone);
        };
        DivPlayerTileListView.prototype.setInvisible = function (callbackWhenDone) {
            this.mainContainerForAll.hidden = true;
            dominox.callIfNotNull(callbackWhenDone);
        };
        DivPlayerTileListView.prototype.setVisible = function (callbackWhenDone) {
            this.mainContainerForAll.hidden = false;
            dominox.callIfNotNull(callbackWhenDone);
        };
        DivPlayerTileListView.prototype.findImgForTileFromContainer = function (tile, inList, imagesContainer) {
            var index = inList.indexOf(tile);
            if (index < 0)
                return null;
            var image = imagesContainer.children[index];
            if (image != undefined && image != null)
                return image;
            return null;
        };
        DivPlayerTileListView.prototype.checkImageExistsOrThrow = function (img) {
            if (img == undefined || img == null)
                throw "Expected image to exist";
        };
        return DivPlayerTileListView;
    })();
    dominox.DivPlayerTileListView = DivPlayerTileListView;
})(dominox || (dominox = {}));
//# sourceMappingURL=DivPlayerTileListView.js.map