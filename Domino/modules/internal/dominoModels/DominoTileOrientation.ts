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

    export function stringOrientation(orientation: DominoTileOrientation): String
    {
        switch (orientation) {
            case DominoTileOrientation.HorizontalFirstLeftSecondRight:
                return "H:[F,S]";
                break;
            case DominoTileOrientation.HorizontalSecondLeftFirstRight:
                return "H:[S,F]";
                break;
            case DominoTileOrientation.VerticalFirstUpSecondDown:
                return "V:[F,S]";
                break;
            case DominoTileOrientation.VerticalSecondUpFirstDown:
                return "V:[S,F]";
                break;
            default:
                return "[X]";
        }
    }

}