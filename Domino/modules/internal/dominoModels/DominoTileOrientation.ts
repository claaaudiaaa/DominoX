module dominox {
    export enum DominoTileOrientation {
        VerticalFirstUp,
        VerticalSecondUp,
        HorizontalFirstLeft,
        HorizontalSecondLeft
    }

    export function isHorizontal(orientation: DominoTileOrientation): boolean {
        return orientation == DominoTileOrientation.HorizontalFirstLeft ||
            orientation == DominoTileOrientation.HorizontalSecondLeft;
    }

    export function isVertical(orientation: DominoTileOrientation): boolean {
        return orientation == DominoTileOrientation.VerticalFirstUp ||
            orientation == DominoTileOrientation.VerticalSecondUp;
    }
}