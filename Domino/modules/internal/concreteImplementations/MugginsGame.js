/// <reference path= "../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var MugginsGame = (function () {
        function MugginsGame() {
        }
        MugginsGame.prototype.getNeighbourListForTileFromBoard = function (tile, board) {
            return board.getExternalTilesListMatchingTile(tile);
        };
        MugginsGame.prototype.countPoints = function (externalTiles, spinner) {
            var points = 0;
            for (var i = 0; i < externalTiles.length; i++) {
                var tile = externalTiles[i];
                var orientation = tile.getOrientation();
                if (tile === spinner) {
                    if (tile.getLeftNeighbour() === null && tile.getUpNeighbour() === null) {
                        points += (tile.getBone().getSecond().valueOf() + tile.getBone().getFirst().valueOf());
                    }
                    else {
                        points += tile.getBone().getFirst().valueOf();
                    }
                }
                else {
                    if (orientation == dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight) {
                        if (tile.getLeftNeighbour() === null && tile.getRightNeighbour() === null) {
                            points += (tile.getBone().getSecond().valueOf() + tile.getBone().getFirst().valueOf());
                        }
                        else if (tile.getLeftNeighbour() !== null) {
                            points += tile.getBone().getSecond().valueOf();
                        }
                        else {
                            points += tile.getBone().getFirst().valueOf();
                        }
                    }
                    else if (orientation == dominox.DominoTileOrientation.HorizontalSecondLeftFirstRight) {
                        if (tile.getLeftNeighbour() === null && tile.getRightNeighbour() === null) {
                            points += (tile.getBone().getSecond().valueOf() + tile.getBone().getFirst().valueOf());
                        }
                        else if (tile.getLeftNeighbour() !== null) {
                            points += tile.getBone().getFirst().valueOf();
                        }
                        else {
                            points += tile.getBone().getSecond().valueOf();
                        }
                    }
                    else if (orientation == dominox.DominoTileOrientation.VerticalFirstUpSecondDown) {
                        if (tile.getDownNeighbour() !== null) {
                            points += tile.getBone().getFirst().valueOf();
                        }
                        else {
                            points += tile.getBone().getSecond().valueOf();
                        }
                    }
                    else {
                        if (tile.getDownNeighbour() !== null) {
                            points += tile.getBone().getSecond().valueOf();
                        }
                        else {
                            points += tile.getBone().getFirst().valueOf();
                        }
                    }
                }
            }
            return points;
        };
        MugginsGame.prototype.playerDidAddTileAsNeighbourToTileInBoard = function (player, neighbour, tile, board) {
            var externalTiles = board.getExternalTiles();
            player.setScore(player.getScore() + this.countPoints(externalTiles, board.getSpinner()));
        };
        MugginsGame.prototype.isGameOverWithPlayersAndBoard = function (firstPlayer, secondPlayer, board) {
            if (firstPlayer.getScore() >= 100 || secondPlayer.getScore() >= 100)
                return true;
            if (this.canPlayerMakeMoveWithTileListOnBoard(firstPlayer.getTileList(), board))
                return true;
            if (this.canPlayerMakeMoveWithTileListOnBoard(secondPlayer.getTileList(), board))
                return true;
            return false;
        };
        MugginsGame.prototype.canPlayerMakeMoveWithTileListOnBoard = function (playerTileList, board) {
            var anyMatchFound = false;
            for (var i = 0; i < playerTileList.length; i++) {
                var iTile = playerTileList[i];
                var matchableTiles = board.getExternalTilesListMatchingTile(iTile);
                //console.log("canPlayerMakeMove, matchable tiles for tile " + iTile + " are " + stringifyTileList(matchableTiles));
                if (matchableTiles.length > 0)
                    return true;
            }
            return anyMatchFound;
        };
        return MugginsGame;
    })();
    dominox.MugginsGame = MugginsGame;
})(dominox || (dominox = {}));
//# sourceMappingURL=MugginsGame.js.map