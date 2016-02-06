module dominox {
    export enum DominoTileOrientation {
        VerticalFirstUpSecondDown,
        VerticalSecondUpFirstDown,
        HorizontalFirstLeftSecondRight,
        HorizontalSecondLeftFirstRight
    }

    export function isHorizontal(orientation: DominoTileOrientation): boolean {
        return orientation == DominoTileOrientation.HorizontalFirstLeftSecondRight ||
            orientation == DominoTileOrientation.HorizontalSecondLeftFirstRight;
    }

    export function isVertical(orientation: DominoTileOrientation): boolean {
        return orientation == DominoTileOrientation.VerticalFirstUpSecondDown ||
            orientation == DominoTileOrientation.VerticalSecondUpFirstDown;
    }
}