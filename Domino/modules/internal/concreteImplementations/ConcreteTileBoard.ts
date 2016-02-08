/// <reference path="../dominoModels/DominoTile.ts"/>
/// <reference path="../Interfaces.ts"/>


module dominox
{

    export class ConcreteTileBoard implements dominox.TileBoard
    {
        private dominoTileList: dominox.DominoTile[];
        private spinner: dominox.DominoTile;

        constructor() {
            this.dominoTileList = new Array<dominox.DominoTile>();
        }

        public setTileList(tileList: DominoTile[]) {
            this.dominoTileList = tileList;
        }

        public getTileList(): dominox.DominoTile[] {
            return this.dominoTileList;
        }

        public getSpinner(): dominox.DominoTile {
            return this.spinner;
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
            if (tile.isDoubleTile()) {
                this.spinner = tile;
            }
            else {
                this.spinner = null;
            }
        }

        public getExternalTiles(): dominox.DominoTile[] {
            var tileList: dominox.DominoTile[] = [];
            for (var i = 0; i < this.dominoTileList.length; i++) {
                var tile: dominox.DominoTile = this.dominoTileList[i];
                var noNeighbour: number = 0;
                if (tile.getDownNeighbour() !== null) noNeighbour++;
                if (tile.getLeftNeighbour() !== null) noNeighbour++;
                if (tile.getRightNeighbour() !== null) noNeighbour++;
                if (tile.getUpNeighbour() !== null) noNeighbour++;
                if (noNeighbour == 1 || ((noNeighbour == 2 || noNeighbour == 3) && tile === this.spinner))
                    tileList.push(tile);
            }
            return tileList;
        }

        public getExternalTilesListMatchingTile(matchingTile: dominox.DominoTile): dominox.DominoTile[]{
            var tileList: dominox.DominoTile[] = [];

            //console.log("for tile + " + matchingTile.toString() + " checking matches");
            for (var i = 0; i < this.dominoTileList.length; i++)
            {
                var tile: dominox.DominoTile = this.dominoTileList[i];
                var matchingType = dominox.getTilesMatchType(matchingTile, tile);
                if (matchingType == dominox.TileMatchType.NoMatch)
                    continue;
                var tileOrientation = tile.getOrientation();

                //console.log("Found a match with " + tile.toString());

                    if (tileOrientation == dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight){
                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getLeftNeighbour() == null)
                        {
                            //console.log("added on: HFLSR, leftNeighbour null, matchOnFirst");
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getRightNeighbour() == null)
                        {
                            //console.log("added on HFLSR rightNeighbour null matchOnSecond");
                            tileList.push(tile);
                            continue;
                        }
                    }

                    if (tileOrientation == dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight)
                    {
                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getRightNeighbour() == null)
                        {
                            //console.log("added on HSLFR, right neighbour null, match on First");
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getLeftNeighbour() == null)
                        {
                            //console.log("added on HSLFR, left neighbour null, match on second");
                            tileList.push(tile);
                            continue;
                        }
                    }

                    if (tileOrientation == dominox.DominoTileOrientation.VerticalFirstUpSecondDown) {

                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getUpNeighbour() == null)
                        {
                            //console.log("added on VFUSD, up neighbour null, match on first");
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getDownNeighbour() == null) {
                            //console.log("added on VFUSD, down null, match on second");
                            tileList.push(tile);
                            continue;
                        }
                    }

                    if (tileOrientation == dominox.DominoTileOrientation.VerticalSecondUpFirstDown) {
                        if (tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                            tile.getDownNeighbour() == null)
                        {
                            //console.log("added on VSUFD, down neighbour null, match on first");
                            tileList.push(tile);
                            continue;
                        }

                        if (tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                            tile.getUpNeighbour() == null)
                        {
                            //console.log("added on VSUFD, up neighbour null, match on second");
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
            var orientation: dominox.DominoTileOrientation = dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight;

            if (neighbour.isDoubleTile())
            {
                if (!dominox.isVertical(neighbour.getOrientation()))
                    throw "Epected double tile to be vertical " + neighbour.toString();
                {

                    if (neighbour.getRightNeighbour() == null) {
                        neighbour.setRightNeighbour(tile);
                        tile.setLeftNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        return;
                    }

                    if (neighbour.getLeftNeighbour() == null) {
                        neighbour.setLeftNeighbour(tile);
                        tile.setRightNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        return;
                    }

                    if (neighbour.getUpNeighbour() == null) {
                        neighbour.setUpNeighbour(tile);
                        tile.setDownNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                        return;
                    }

                    if (neighbour.getDownNeighbour() == null) {
                        neighbour.setDownNeighbour(tile);
                        tile.setUpNeighbour(neighbour);

                        tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);

                        if (TileMatchType.FirstFirst == matchType ||
                            TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                        return;
                    }

                }
                
            }
            else {

                //if (!dominox.isHorizontal(orientation))
                    ///throw "Expected tile to be horizontal";

                    if (TileMatchType.FirstFirst == matchType || TileMatchType.SecondFirst == matchType)
                    {
                        if (neighbour.getOrientation() == dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight) {
                            if (neighbour.getLeftNeighbour() != null)
                                throw "Expected left neighbour of a tile to be null on HorizontalFirstLeft matchOnFirst";
                            neighbour.setLeftNeighbour(tile);
                            tile.setRightNeighbour(neighbour);
                            if (TileMatchType.FirstFirst == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                            else
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        }
                        if (neighbour.getOrientation() == dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight)
                        {
                            if (neighbour.getRightNeighbour() != null)
                                throw "Expected right neighbour to be null on HorizontalSecondLeft matchOnFirst";
                            neighbour.setRightNeighbour(tile);
                            tile.setLeftNeighbour(neighbour);
                            if (TileMatchType.FirstFirst == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                            else
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        }

                        if (neighbour.getOrientation() == dominox.DominoTileOrientation.VerticalFirstUpSecondDown) {
                            if (neighbour.getUpNeighbour() != null)
                                throw "Expected up neighbour to be null on VerticalFirstUp matchOnFrirst";

                            neighbour.setUpNeighbour(tile);
                            tile.setDownNeighbour(neighbour);
                            if (TileMatchType.FirstFirst == matchType)
                                tile.setOrientation(DominoTileOrientation.VerticalSecondUpFirstDown);
                            else
                                tile.setOrientation(DominoTileOrientation.VerticalFirstUpSecondDown);
                        }

                        if (neighbour.getOrientation() == dominox.DominoTileOrientation.VerticalSecondUpFirstDown) {
                            if (neighbour.getDownNeighbour() != null)
                                throw "Expected down neighbour to be null in VerticalSecondU match_OnFirst";

                            neighbour.setDownNeighbour(tile);
                            tile.setUpNeighbour(neighbour);
                            if (TileMatchType.FirstFirst == matchType)
                                tile.setOrientation(DominoTileOrientation.VerticalFirstUpSecondDown);
                            else
                                tile.setOrientation(DominoTileOrientation.VerticalSecondUpFirstDown);
                        }
                    } 

                    if (TileMatchType.FirstSecond == matchType || TileMatchType.SecondSecond == matchType) {

                        if (neighbour.getOrientation() == DominoTileOrientation.HorizontalFirstLeftSecondRight) {
                            if (neighbour.getRightNeighbour() != null)
                                throw "Expected right neighbour of a tile to be null on HFL_matchOnSecond";
                            neighbour.setRightNeighbour(tile);
                            tile.setLeftNeighbour(neighbour);
                            if (TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                            else
                                tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        }

                        if (neighbour.getOrientation() == DominoTileOrientation.HorizontalSecondLeftFirstRight) {

                            if (neighbour.getLeftNeighbour() != null)
                                throw "Expected left neighbour to be null on HorizontalSecondLeft_matchOnSecond";

                            neighbour.setLeftNeighbour(tile);
                            tile.setRightNeighbour(neighbour);
                            if (TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(DominoTileOrientation.HorizontalSecondLeftFirstRight);
                            else
                                tile.setOrientation(DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        }

                        if (neighbour.getOrientation() == DominoTileOrientation.VerticalFirstUpSecondDown) {

                            if (neighbour.getDownNeighbour() != null)
                                throw "Expected down neighbour to be null on VerticalFirstUp matchOnSecond";

                            neighbour.setDownNeighbour(tile);
                            tile.setUpNeighbour(neighbour);
                            if (TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(DominoTileOrientation.VerticalFirstUpSecondDown);
                            else
                                tile.setOrientation(DominoTileOrientation.VerticalSecondUpFirstDown);
                        }

                        if (neighbour.getOrientation() == DominoTileOrientation.VerticalSecondUpFirstDown) {

                            if (neighbour.getUpNeighbour() != null)
                                throw "Expected up neighbour to be null on VerticalSecondUp matchOnSecond";

                            neighbour.setUpNeighbour(tile);
                            tile.setDownNeighbour(neighbour);
                            if (TileMatchType.FirstSecond == matchType)
                                tile.setOrientation(DominoTileOrientation.VerticalSecondUpFirstDown);
                            else
                                tile.setOrientation(DominoTileOrientation.VerticalFirstUpSecondDown);
                        }
                    }
            }
        }

        setOrientationOfFirstTile(tile: dominox.DominoTile) {
            if (tile.isDoubleTile())
                tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
            else
                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
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