/// <reference path="../dominoModels/DominoTile.ts"/>
/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var ConcreteTileBoard = (function () {
        function ConcreteTileBoard() {
            this.dominoTileList = new Array();
        }
        ConcreteTileBoard.prototype.setTileList = function (tileList) {
            this.dominoTileList = tileList;
        };
        ConcreteTileBoard.prototype.getTileList = function () {
            return this.dominoTileList;
        };
        ConcreteTileBoard.prototype.addTileAsNeighbourToTile = function (tile, neighbourTile) {
            this.checkTileExistsOrThrow(neighbourTile);
            this.checkTilesForMatchingOrThrow(tile, neighbourTile);
            this.setOrientationOfTileAccordingToNeighbour(tile, neighbourTile);
            this.dominoTileList.push(tile);
        };
        ConcreteTileBoard.prototype.addFirstTile = function (tile) {
            this.checkListEmptyOrThrow();
            this.setOrientationOfFirstTile(tile);
            this.dominoTileList.push(tile);
        };
        ConcreteTileBoard.prototype.getExternalTilesListMatchingTile = function (matchingTile) {
            var tileList = [];
            for (var i = 0; i < this.dominoTileList.length; i++) {
                var tile = this.dominoTileList[i];
                var matchingType = dominox.getTilesMatchType(matchingTile, tile);
                if (matchingType == dominox.TileMatchType.NoMatch)
                    continue;
                var tileOrientation = tile.getOrientation();
                if (tileOrientation == dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight) {
                    if (dominox.tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                        tile.getLeftNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                    if (dominox.tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                        tile.getRightNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                }
                if (tileOrientation == dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight) {
                    if (dominox.tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                        tile.getRightNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                    if (dominox.tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                        tile.getLeftNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                }
                if (tileOrientation == dominox.DominoTileOrientation.VerticalFirstUpSecondDown) {
                    if (dominox.tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                        tile.getUpNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                    if (dominox.tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                        tile.getDownNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                }
                if (tileOrientation == dominox.DominoTileOrientation.VerticalSecondUpFirstDown) {
                    if (dominox.tileHastMatchOnFirstOnTile(matchingTile, tile) &&
                        tile.getDownNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                    if (dominox.tileHasMatchOnSecondOnTile(matchingTile, tile) &&
                        tile.getUpNeighbour() == null) {
                        tileList.push(tile);
                        continue;
                    }
                }
            }
            return tileList;
        };
        ConcreteTileBoard.prototype.setOrientationOfTileAccordingToNeighbour = function (tile, neighbour) {
            var matchType = dominox.getTilesMatchType(tile, neighbour);
            var orientation = dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight;
            if (neighbour.isDoubleTile()) {
                if (!dominox.isVertical(neighbour.getOrientation()))
                    throw "Epected double tile to be vertical " + neighbour.toString();
                {
                    if (neighbour.getRightNeighbour() == null) {
                        neighbour.setRightNeighbour(tile);
                        tile.setLeftNeighbour(neighbour);
                        tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        if (dominox.TileMatchType.FirstFirst == matchType ||
                            dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        return;
                    }
                    if (neighbour.getLeftNeighbour() == null) {
                        neighbour.setLeftNeighbour(tile);
                        tile.setRightNeighbour(neighbour);
                        tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        if (dominox.TileMatchType.FirstFirst == matchType ||
                            dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        return;
                    }
                    if (neighbour.getUpNeighbour() == null) {
                        neighbour.setUpNeighbour(tile);
                        tile.setDownNeighbour(neighbour);
                        tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                        if (dominox.TileMatchType.FirstFirst == matchType ||
                            dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                        return;
                    }
                    if (neighbour.getDownNeighbour() == null) {
                        neighbour.setDownNeighbour(tile);
                        tile.setUpNeighbour(neighbour);
                        tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                        if (dominox.TileMatchType.FirstFirst == matchType ||
                            dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                        return;
                    }
                }
            }
            else {
                //if (!dominox.isHorizontal(orientation))
                ///throw "Expected tile to be horizontal";
                if (dominox.TileMatchType.FirstFirst == matchType || dominox.TileMatchType.SecondFirst == matchType) {
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight) {
                        if (neighbour.getLeftNeighbour() != null)
                            throw "Expected left neighbour of a tile to be null on HorizontalFirstLeft matchOnFirst";
                        neighbour.setLeftNeighbour(tile);
                        tile.setRightNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstFirst == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                    }
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight) {
                        if (neighbour.getRightNeighbour() != null)
                            throw "Expected right neighbour to be null on HorizontalSecondLeft matchOnFirst";
                        neighbour.setRightNeighbour(tile);
                        tile.setLeftNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstFirst == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                    }
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.VerticalFirstUpSecondDown) {
                        if (neighbour.getUpNeighbour() != null)
                            throw "Expected up neighbour to be null on VerticalFirstUp matchOnFrirst";
                        neighbour.setUpNeighbour(tile);
                        tile.setDownNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstFirst == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                    }
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.VerticalSecondUpFirstDown) {
                        if (neighbour.getDownNeighbour() != null)
                            throw "Expected down neighbour to be null in VerticalSecondU match_OnFirst";
                        neighbour.setDownNeighbour(tile);
                        tile.setUpNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstFirst == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                    }
                }
                if (dominox.TileMatchType.FirstSecond == matchType || dominox.TileMatchType.SecondSecond == matchType) {
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight) {
                        if (neighbour.getRightNeighbour() != null)
                            throw "Expected right neighbour of a tile to be null on HFL_matchOnSecond";
                        neighbour.setRightNeighbour(tile);
                        tile.setLeftNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                    }
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight) {
                        if (neighbour.getLeftNeighbour() != null)
                            throw "Expected left neighbour to be null on HorizontalSecondLeft_matchOnSecond";
                        neighbour.setLeftNeighbour(tile);
                        tile.setRightNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
                    }
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.VerticalFirstUpSecondDown) {
                        if (neighbour.getDownNeighbour() != null)
                            throw "Expected down neighbour to be null on VerticalFirstUp matchOnSecond";
                        neighbour.setDownNeighbour(tile);
                        tile.setUpNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                    }
                    if (neighbour.getOrientation() == dominox.DominoTileOrientation.VerticalSecondUpFirstDown) {
                        if (neighbour.getUpNeighbour() != null)
                            throw "Expected up neighbour to be null on VerticalSecondUp matchOnSecond";
                        neighbour.setUpNeighbour(tile);
                        tile.setDownNeighbour(neighbour);
                        if (dominox.TileMatchType.FirstSecond == matchType)
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalSecondUpFirstDown);
                        else
                            tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
                    }
                }
            }
        };
        ConcreteTileBoard.prototype.setOrientationOfFirstTile = function (tile) {
            if (tile.isDoubleTile())
                tile.setOrientation(dominox.DominoTileOrientation.VerticalFirstUpSecondDown);
            else
                tile.setOrientation(dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
        };
        ConcreteTileBoard.prototype.checkTilesForMatchingOrThrow = function (tileOne, tileTwo) {
            if (dominox.getTilesMatchType(tileOne, tileTwo) == dominox.TileMatchType.NoMatch)
                throw "Tile " + tileOne.toString() + ", and tileTwo " + tileTwo.toString() + " are expected to match";
        };
        ConcreteTileBoard.prototype.checkTileExistsOrThrow = function (tile) {
            if (this.dominoTileList.indexOf(tile, 0) < 0) {
                throw "ConcreteTileBoard tile" + tile.toString() + " expected to be in the board";
            }
        };
        ConcreteTileBoard.prototype.checkListEmptyOrThrow = function () {
            if (this.dominoTileList.length > 0)
                throw "ConcreteTileBoard expected to be empty";
        };
        return ConcreteTileBoard;
    })();
    dominox.ConcreteTileBoard = ConcreteTileBoard;
})(dominox || (dominox = {}));
//# sourceMappingURL=ConcreteTileBoard.js.map