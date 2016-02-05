/// <reference path="../dominoModels/DominoTile.ts"/>
/// <reference path="../Interfaces.ts"/>


module com.dominox.internal.concreteImplementations {

    export enum TileMatchType {
        FirstFirst,
        FirstSecond,
        SecondFirst,
        SecondSecond,
        NoMatch
    }

    export class ConcreteTileBoard implements internal.TileBoard
    {
        private dominoTileList: dominoModels.DominoTile[];

        constructor() {
            this.dominoTileList = new Array<dominoModels.DominoTile>();
        }

        public addTileAsNeighbourToTile(tile: dominoModels.DominoTile, neighbourTile: dominoModels.DominoTile)
        {
            this.checkTileExistsOrThrow(neighbourTile);
            this.checkTilesForMatchingOrThrow(tile, neighbourTile);

        }

        public addFirstTile(tile: dominoModels.DominoTile): void
        {
            this.checkListEmptyOrThrow(); 
            this.setOrientationOfFirstTile(tile);
            this.dominoTileList.push(tile);
        }


        setOrientationOfTileAccordingToNeighbour(tile: dominModels.DominoTile, neighbour: dominModels.DominoTile)
        {
            var orientation: dominModels.DominoTileOrientation = dominModels.DominoTileOrientation.HorizontalFirstLeft;
            if (neighbour.isDoubleTile()) {
            }
            else {

                var matchType: TileMatchType = this.getTilesMatchType(tile, neighbour);
                switch (matchType) {
                }
            }
        }

        setOrientationOfFirstTile(tile: dominModels.DominoTile) {
            if (tile.isDoubleTile())
                tile.setOrientation(dominModels.DominoTileOrientation.VerticalFirstUp);
            else
                tile.setOrientation(dominModels.DominoTileOrientation.HorizontalFirstLeft);
        }


        getTilesMatchType(first: dominModels.DominoTile, second: dominModels.DominoTile) : TileMatchType
        {
            var tileOne = first;
            var tileTwo = second;

            // first == first
            if (tileOne.getBone().getFirst() == tileTwo.getBone().getFirst())
                return TileMatchType.FirstFirst;
            //first - second
            if (tileOne.getBone().getFirst() == tileTwo.getBone().getSecond())
                return TileMatchType.FirstSecond;
            //second - first
            if (tileOne.getBone().getSecond() == tileTwo.getBone().getFirst())
                return TileMatchType.SecondFirst;
            //second - second
            if (tileOne.getBone().getSecond() == tileTwo.getBone().getSecond())
                return TileMatchType.SecondSecond;

            return TileMatchType.NoMatch;
        }

        checkTilesForMatchingOrThrow(tileOne: dominModels.DominoTile, tileTwo: dominModels.DominoTile)
        {
            if (this.getTilesMatchType(tileOne, tileTwo) == TileMatchType.NoMatch)
                throw "Tile " + tileOne.toString() + ", and tileTwo " + tileTwo.toString() + " are expected to match";
        }


        checkTileExistsOrThrow(tile: dominModels.DominoTile) {
            if (this.dominoTileList.indexOf(tile, 0) < 0) {
                throw "ConcreteTileBoard tile" + tile.toString() + " expected to be in the board";
            }
        }

        checkListEmptyOrThrow() {
            if (this.dominoTileList.length > 0)
                throw "ConcreteTileBoard expected to be empty";
        }
    }
}