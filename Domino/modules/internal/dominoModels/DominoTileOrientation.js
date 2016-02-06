var dominox;
(function (dominox) {
    (function (DominoTileOrientation) {
        DominoTileOrientation[DominoTileOrientation["VerticalFirstUp"] = 0] = "VerticalFirstUp";
        DominoTileOrientation[DominoTileOrientation["VerticalSecondUp"] = 1] = "VerticalSecondUp";
        DominoTileOrientation[DominoTileOrientation["HorizontalFirstLeft"] = 2] = "HorizontalFirstLeft";
        DominoTileOrientation[DominoTileOrientation["HorizontalSecondLeft"] = 3] = "HorizontalSecondLeft";
    })(dominox.DominoTileOrientation || (dominox.DominoTileOrientation = {}));
    var DominoTileOrientation = dominox.DominoTileOrientation;
    function isHorizontal(orientation) {
        return orientation == DominoTileOrientation.HorizontalFirstLeft ||
            orientation == DominoTileOrientation.HorizontalSecondLeft;
    }
    dominox.isHorizontal = isHorizontal;
    function isVertical(orientation) {
        return orientation == DominoTileOrientation.VerticalFirstUp ||
            orientation == DominoTileOrientation.VerticalSecondUp;
    }
    dominox.isVertical = isVertical;
})(dominox || (dominox = {}));
//# sourceMappingURL=DominoTileOrientation.js.map