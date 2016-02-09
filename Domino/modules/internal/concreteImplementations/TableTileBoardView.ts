/// <reference path = "../Interfaces.ts"/>
/// <reference path = "SimpleTileMatrixPresenter.ts"/>

module dominox {

    export class TableTileBoardView implements TileBoardView
    {
        private tableContainer: HTMLDivElement;
        private table: HTMLTableElement;
        private imagesContainer: HTMLDivElement;
        private matrixPresenter: SimpleTileMatrixPresenter;

        private displayedMatrixOfTiles: DominoTile[][];
        private imagesMatrix: HTMLImageElement[][];

        private onTileSelected: TileCallback;

        constructor(table: HTMLTableElement, imagesContainer: HTMLDivElement, onTileSelected: TileCallback)
        {
            this.onTileSelected = onTileSelected;
            this.table = table;
            this.imagesContainer = imagesContainer;
            dominox.removeAllChildNodesOfElement(this.table);
            this.matrixPresenter = new SimpleTileMatrixPresenter();

            console.log("The table is " + table);
        }

        drawTileAsNeighbourOfTileFromBoard(tile: dominox.DominoTile, neighbour: dominox.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback)
        {

        }

        highlightListOfTilesFromBoard(tiles: dominox.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void
        {
            console.log("should highlight " + stringifyTileList(tiles));
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                var img = this.findImageForTile(tile);
                this.highlightImage(img);
            }
        }

        highlightImage(img: HTMLImageElement)
        {
            img.style.borderRadius = "50%";
            img.style.borderColor = "blue";
        }

        displayAsNormalTileBoard(tileBoard: TileBoard, callbackWhenDone: VoidCallback)
        {
            var matrix = this.matrixPresenter.presentTileBoardAsTileMatrix(tileBoard);
            this.displayedMatrixOfTiles = matrix;

            this.buildTableAccordingToMatrix(this.table, matrix);
        }

       

        buildTableAccordingToMatrix(table: HTMLTableElement, matrix: DominoTile[][])
        {
            dominox.removeAllChildNodesOfElement(table);
            var self = this;
            this.imagesMatrix = [];

            for (var i = 0; i < matrix.length; i++)
            {
                var row = <HTMLTableRowElement>table.insertRow(-1);
                var imagesRow: HTMLImageElement[] = [];
                this.imagesMatrix.push(imagesRow);

                for (var j = 0; j < matrix[i].length; j++)
                {
                    var cell = <HTMLTableCellElement>row.insertCell(-1);
                    cell.width = "40";
                    cell.height = "40";

                    if (matrix[i][j] != null) {
                        var image = this.getImageForTile(matrix[i][j]);
                        this.rotateImageToDegrees(image, dominox.getRotationAngleInDegreesForTile(matrix[i][j]));
                        this.resizeImageTo(image, 32, 40);
                        cell.appendChild(image);

                        var currentI = i;
                        var currentJ = j;

                        image.onclick = this.createCallbackForImageAtIndexes(image, currentI, currentJ, this);
                        imagesRow.push(image);
                    }
                    else
                        imagesRow.push(null);
                }
            }
        }


        findImageForTile(tile: DominoTile): HTMLImageElement {

            var line: number = -1;
            var col: number = -1;

            for (var i = 0; i < this.displayedMatrixOfTiles.length; i++) {

                for (var j = 0; j < this.displayedMatrixOfTiles[i].length; j++) {

                    if (this.displayedMatrixOfTiles[i][j] === tile) {
                        line = i;
                        col = j;
                        break;
                    }
                }
            }

            if (line < 0 || col < 0)
                throw "Expected tile to be in matrix " + tile.toString();

            var image = this.imagesMatrix[line][col];
            return image;
        }

        rotateImageToDegrees(image: HTMLImageElement, degrees: number)
        {
            var div : any = image;
            var deg = degrees;

            div.style.webkitTransform = 'rotate(' + deg + 'deg)';
            div.style.mozTransform = 'rotate(' + deg + 'deg)';
            div.style.msTransform = 'rotate(' + deg + 'deg)';
            div.style.oTransform = 'rotate(' + deg + 'deg)';
            div.style.transform = 'rotate(' + deg + 'deg)'; 
        }

        resizeImageTo(image: HTMLImageElement, width: number, height: number) {

            var onloadCallback = function (ev: any)
            {
                image.height = height;
                image.width = width;
            };

            if (image.complete)
                onloadCallback(null);
            else
                image.onload = onloadCallback;
        }


        getImageForTile(tile: DominoTile): HTMLImageElement {
            var imageClassName: string = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond();
            var elements = this.imagesContainer.getElementsByClassName(imageClassName);
            var image: HTMLImageElement = <HTMLImageElement>elements[0];

           // console.log("image class name " + imageClassName);

            return <HTMLImageElement>image.cloneNode(true);
        }

        createCallbackForImageAtIndexes(image: HTMLImageElement,
            line: number, column: number, self: TableTileBoardView): (ev: any) => any
        {
            return function (ev: any)
            {
                self.imageWasClickedAtIndexes(image, line, column);
            };
        }

        imageWasClickedAtIndexes(img: HTMLImageElement, line: number, column: number)
        {
            var tile = this.displayedMatrixOfTiles[line][column];
            if (tile == undefined || tile == null)
                throw "Expected tile to be in matrix " + tile.toString();

            console.log("image clicked at line " + line + ", column " + column);
            this.onTileSelected(tile);  
        }
    }
}