var dominox;
(function (dominox) {
    (function (DominoTileOrientation) {
        DominoTileOrientation[DominoTileOrientation["VerticalFirstUpSecondDown"] = 0] = "VerticalFirstUpSecondDown";
        DominoTileOrientation[DominoTileOrientation["VerticalSecondUpFirstDown"] = 1] = "VerticalSecondUpFirstDown";
        DominoTileOrientation[DominoTileOrientation["HorizontalFirstLeftSecondRight"] = 2] = "HorizontalFirstLeftSecondRight";
        DominoTileOrientation[DominoTileOrientation["HorizontalSecondLeftFirstRight"] = 3] = "HorizontalSecondLeftFirstRight";
    })(dominox.DominoTileOrientation || (dominox.DominoTileOrientation = {}));
    var DominoTileOrientation = dominox.DominoTileOrientation;
    function isHorizontal(orientation) {
        return orientation == DominoTileOrientation.HorizontalFirstLeftSecondRight ||
            orientation == DominoTileOrientation.HorizontalSecondLeftFirstRight;
    }
    dominox.isHorizontal = isHorizontal;
    function isVertical(orientation) {
        return orientation == DominoTileOrientation.VerticalFirstUpSecondDown ||
            orientation == DominoTileOrientation.VerticalSecondUpFirstDown;
    }
    dominox.isVertical = isVertical;
    function stringOrientation(orientation) {
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
    dominox.stringOrientation = stringOrientation;
})(dominox || (dominox = {}));
//# sourceMappingURL=DominoTileOrientation.js.map