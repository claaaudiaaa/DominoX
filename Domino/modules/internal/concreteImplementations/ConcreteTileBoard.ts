/// <reference path="../dominoModels/DominoTile.ts"/>
/// <reference path="../Interfaces.ts"/>


module dominox
{

    export class ConcreteTileBoard implements dominox.TileBoard
    {
        private dominoTileList: dominox.DominoTile[];

        constructor() {
            this.dominoTileList = new Array<dominox.DominoTile>();
        }

        public getTileList(): dominox.DominoTile[] {
            return this.dominoTileList;
        }

        public addTileAsNeighbourToTile(tile: dominox.DominoTile, neighbourTile: dominox.DominoTile)
        {
            this.checkTileExistsOrThrow(neighbourTile);
            this.checkTilesForMatchingOrThrow(tile, neighbourTile);
            this.setOrientationOfTileAccordingToNeighbour(tile, neighbourTile);
            this.dominoTileList.push(tile);

        }

        public addFirstTile(tile: dominox.DominoTile): void
        {
            this.checkListEmptyOrThrow(); 
            this.setOrientationOfFirstTile(tile);
            this.dominoTileList.push(tile);
        }

        public getExternalTilesListMatchingTile(matchingTile: dominox.DominoTile): dominox.DominoTile[]{
            var tileList: dominox.DominoTile[] = [];

            for (var i = 0; i < this.dominoTileList.length; i++) {
                var tile: dominox.DominoTile = this.dominoTileList[i];
                var matchingType = dominox.getTilesMatchType(matchingTile, tile);
                if (matchingType == dominox.TileMatchType.NoMatch)
                    continue;
                var tileOrientation = tile.getOrientation();
                
                    if (tileOrientation == dominox.DominoTileOrientation.HorizontalFirstLeft){
                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getLeftNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getRightNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }
                    }

                    if (tileOrientation == dominox.DominoTileOrientation.HorizontalSecondLeft) {
                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getRightNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getLeftNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }
                    }

                    if (tileOrientation == dominox.DominoTileOrientation.VerticalFirstUp) {

                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getUpNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getDownNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }
                    }

                    if (tileOrientation == dominox.DominoTileOrientation.VerticalSecondUp) {
                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getDownNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getUpNeighbour() == null) {
                            tileList.push(tile);
                            continue;
                        }
                    }
                }

            return tileList;
        }

        setOrientationOfTileAccordingToNeighbour(tile: dominox.DominoTile, neighbour: dominox.DominoTile)
        {
            var matchType: TileMatchType = dominox.getTilesMatchType(tile, neighbour);
            var orientation: dominox.DominoTileOrientation = dominox.DominoTileOrientation.HorizontalFirstLeft;

            if (neighbour.isDoubleTile())
            {
                if (!dominox.isVertical(neighbour.getOrientation()))
                    throw "Epected double tile to be vertical " + neighbour.toString();
                {

                    if (neighbour.getRightNeighbour() == null) {
                        neighbour.setRightNeighbour(tile);
                        tile.setLeftNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeft);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeft);
                        return;
                    }

                    if (neighbour.getLeftNeighbour() == null) {
                        neighbour.setLeftNeighbour(tile);
                        tile.setRightNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeft);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeft);
                        return;
                    }

                    if (neighbour.getUpNeighbour() == null) {
                        neighbour.setUpNeighbour(tile);
                        tile.setDownNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUp);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUp);
                        return;
                    }

                    if (neighbour.getDownNeighbour() == null) {
                        neighbour.setDownNeighbour(tile);
                        tile.setUpNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUp);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUp);
                        return;
                    }

                }
                
            }
            else {

                if (!dominox.isHorizontal(orientation))
                    throw "Expected tile to be horizontal";

                if (TileMatchType.FirstFirst == matchType || TileMatchType.SecondFirst == matchType)
                        {
                            if (neighbour.getLeftNeighbour() != null)
                                throw "Expected left neighbour of a tile to be null";
                            neighbour.setLeftNeighbour(tile);
                            tile.setRightNeighbour(neighbour);
                            if (TileMatchType.FirstFirst == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeft);
                            else
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeft);
                        } 

               if (TileMatchType.FirstSecond == matchType || TileMatchType.SecondSecond == matchType)
                {
                            if (neighbour.getRightNeighbour() != null)
                                throw "Expected right neighbour of a tile to be null";
                            neighbour.setRightNeighbour(tile);
                            tile.setLeftNeighbour(neighbour);
                            if (TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeft);
                            else
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeft);
                }
            }
        }

        setOrientationOfFirstTile(tile: dominox.DominoTile) {
            if (tile.isDoubleTile())
                tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUp);
            else
                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeft);
        }


        

        checkTilesForMatchingOrThrow(tileOne: dominox.DominoTile, tileTwo: dominox.DominoTile)
        {
            if (dominox.getTilesMatchType(tileOne, tileTwo) == TileMatchType.NoMatch)
                throw "Tile " + tileOne.toString() + ", and tileTwo " + tileTwo.toString() + " are expected to match";
        }


        checkTileExistsOrThrow(tile: dominox.DominoTile) {
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