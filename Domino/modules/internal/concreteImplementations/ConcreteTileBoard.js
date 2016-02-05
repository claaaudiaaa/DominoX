/// <reference path="../dominoModels/DominoTile.ts"/>
/// <reference path="../Interfaces.ts"/>
var com;
(function (com) {
    var dominox;
    (function (dominox) {
        var internal;
        (function (internal) {
            var concreteImplementations;
            (function (concreteImplementations) {
                (function (TileMatchType) {
                    TileMatchType[TileMatchType["FirstFirst"] = 0] = "FirstFirst";
                    TileMatchType[TileMatchType["FirstSecond"] = 1] = "FirstSecond";
                    TileMatchType[TileMatchType["SecondFirst"] = 2] = "SecondFirst";
                    TileMatchType[TileMatchType["SecondSecond"] = 3] = "SecondSecond";
                    TileMatchType[TileMatchType["NoMatch"] = 4] = "NoMatch";
                })(concreteImplementations.TileMatchType || (concreteImplementations.TileMatchType = {}));
                var TileMatchType = concreteImplementations.TileMatchType;
                var ConcreteTileBoard = (function () {
                    function ConcreteTileBoard() {
                        this.dominoTileList = new Array();
                    }
                    ConcreteTileBoard.prototype.addTileAsNeighbourToTile = function (tile, neighbourTile) {
                        this.checkTileExistsOrThrow(neighbourTile);
                        this.checkTilesForMatchingOrThrow(tile, neighbourTile);
                    };
                    ConcreteTileBoard.prototype.addFirstTile = function (tile) {
                        this.checkListEmptyOrThrow();
                        this.setOrientationOfFirstTile(tile);
                        this.dominoTileList.push(tile);
                    };
                    ConcreteTileBoard.prototype.setOrientationOfTileAccordingToNeighbour = function (tile, neighbour) {
                        var orientation = dominModels.DominoTileOrientation.HorizontalFirstLeft;
                        if (neighbour.isDoubleTile()) {
                        }
                        else {
                            var matchType = this.getTilesMatchType(tile, neighbour);
                            switch (matchType) {
                            }
                        }
                    };
                    ConcreteTileBoard.prototype.setOrientationOfFirstTile = function (tile) {
                        if (tile.isDoubleTile())
                            tile.setOrientation(dominModels.DominoTileOrientation.VerticalFirstUp);
                        else
                            tile.setOrientation(dominModels.DominoTileOrientation.HorizontalFirstLeft);
                    };
                    ConcreteTileBoard.prototype.getTilesMatchType = function (first, second) {
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
                    };
                    ConcreteTileBoard.prototype.checkTilesForMatchingOrThrow = function (tileOne, tileTwo) {
                        if (this.getTilesMatchType(tileOne, tileTwo) == TileMatchType.NoMatch)
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
                concreteImplementations.ConcreteTileBoard = ConcreteTileBoard;
            })(concreteImplementations = internal.concreteImplementations || (internal.concreteImplementations = {}));
        })(internal = dominox.internal || (dominox.internal = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=ConcreteTileBoard.js.map