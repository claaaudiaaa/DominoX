/// <reference path="DominoBone.ts"/>
/// <reference path="DominoTileOrientation.ts"/>
var dominox;
(function (dominox) {
    var DominoTile = (function () {
        function DominoTile(bone, orientation) {
            this.bone = bone;
            this.orientation = orientation;
            this.downNeighbour = null;
            this.upNeighbour = null;
            this.leftNeighbour = null;
            this.rightNeighbour = null;
        }
        DominoTile.prototype.toString = function () {
            return "{" + this.bone.getFirst() + ", " + this.bone.getSecond() + "}" + dominox.stringOrientation(this.orientation);
        };
        DominoTile.prototype.isDoubleTile = function () {
            return this.bone.getFirst() === this.bone.getSecond();
        };
        DominoTile.prototype.isEqualToTile = function (otherTile) {
            return this.bone.getFirst() == otherTile.bone.getFirst() && this.bone.getSecond() == otherTile.bone.getSecond();
        };
        DominoTile.prototype.getBone = function () {
            return this.bone;
        };
        DominoTile.prototype.setOrientation = function (newOrientation) {
            this.orientation = newOrientation;
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
    dominox.DominoTile = DominoTile;
})(dominox || (dominox = {}));
//# sourceMappingURL=DominoTile.js.map