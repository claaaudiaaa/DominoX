/// <reference path="DominoBone.ts"/>
/// <reference path="DominoTileOrientation.ts"/>
var com;
(function (com) {
    var dominox;
    (function (dominox) {
        var internal;
        (function (internal) {
            var dominoModels;
            (function (dominoModels) {
                var DominoTile = (function () {
                    function DominoTile(bone, orientation) {
                        this.bone = bone;
                        this.orientation = orientation;
                        this.downNeighbour = null;
                        this.upNeighbour = null;
                        this.leftNeighbour = null;
                        this.rightNeighbour = null;
                    }
                    DominoTile.prototype.getBone = function () {
                        return this.bone;
                    };
                    DominoTile.prototype.getOrientation = function () {
                        return this.orientation;
                    };
                    DominoTile.prototype.getLeftNeighbour = function () {
                        return this.leftNeighbour;
                    };
                    DominoTile.prototype.getRightNeighbour = function () {
                        return this.rightNeighbour;
                    };
                    DominoTile.prototype.getUpNeighbour = function () {
                        return this.upNeighbour;
                    };
                    DominoTile.prototype.getDownNeighbour = function () {
                        return this.downNeighbour;
                    };
                    DominoTile.prototype.setLeftNeighbour = function (d) {
                        this.leftNeighbour = d;
                    };
                    DominoTile.prototype.setRightNeighbour = function (d) {
                        this.rightNeighbour = d;
                    };
                    DominoTile.prototype.setUpNeighbour = function (d) {
                        this.upNeighbour = d;
                    };
                    DominoTile.prototype.setDownNeighbour = function (d) {
                        this.downNeighbour = d;
                    };
                    return DominoTile;
                })();
                dominoModels.DominoTile = DominoTile;
            })(dominoModels = internal.dominoModels || (internal.dominoModels = {}));
        })(internal = dominox.internal || (dominox.internal = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=file1.js.map