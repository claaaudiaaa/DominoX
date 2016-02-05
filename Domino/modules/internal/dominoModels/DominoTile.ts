/// <reference path="DominoBone.ts"/>
/// <reference path="DominoTileOrientation.ts"/>

module com.dominox.internal.dominoModels {
    export class DominoTile {
        private bone: DominoBone;
        private orientation: DominoTileOrientation;

        private downNeighbour: DominoTile;
        private upNeighbour: DominoTile;
        private leftNeighbour: DominoTile;
        private rightNeighbour: DominoTile;

        constructor(bone: DominoBone, orientation: DominoTileOrientation) {
            this.bone = bone;
            this.orientation = orientation;
            this.downNeighbour = null;
            this.upNeighbour = null;
            this.leftNeighbour = null;
            this.rightNeighbour = null;
        }

        public isDoubleTile(): boolean {
            return this.bone.getFirst() === this.bone.getSecond();
        }

        public isEqualToTile(otherTile: DominoTile): boolean {
            return this.bone.getFirst() == otherTile.bone.getFirst() && this.bone.getSecond() == otherTile.bone.getSecond();
        }

        public getBone(): DominoBone {
            return this.bone;
        }

        public setOrientation(newOrientation: DominoTileOrientation) {
            this.orientation = newOrientation;
        }

        public getOrientation(): DominoTileOrientation {
            return this.orientation;
        }

        public getLeftNeighbour(): DominoTile {
            return this.leftNeighbour;
        }

        public getRightNeighbour(): DominoTile {
            return this.rightNeighbour;
        }

        public getUpNeighbour(): DominoTile {
            return this.upNeighbour;
        }

        public getDownNeighbour(): DominoTile {
            return this.downNeighbour;
        }

        public setLeftNeighbour(d: DominoTile): void {
            this.leftNeighbour = d;
        }

        public setRightNeighbour(d: DominoTile): void {
            this.rightNeighbour = d;
        }

        public setUpNeighbour(d: DominoTile): void {
            this.upNeighbour = d;
        }

        public setDownNeighbour(d: DominoTile): void {
            this.downNeighbour = d;
        }

    }
}