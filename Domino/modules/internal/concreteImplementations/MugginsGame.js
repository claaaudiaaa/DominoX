/// <reference path= "../Interfaces.ts"/>
/// <reference path= "../Score.ts"/>
/// <reference path= "../../../Scripts/typings/jquery/jquery.d.ts"/>
var dominox;
(function (dominox) {
    var MugginsGame = (function () {
        function MugginsGame() {
            console.log("MugginsGame CREATED SUCCESFULLY");
        }
        MugginsGame.prototype.getNeighbourListForTileFromBoard = function (tile, board) {
            return board.getExternalTilesListMatchingTile(tile);
        };
        MugginsGame.prototype.countPoints = function (externalTiles, spinner) {
            var points = 0;
            for (var i = 0; i < externalTiles.length; i++) {
                var tile = externalTiles[i];
                var orientation = tile.getOrientation();
                if (tile == spinner) {
                    if (tile.getLeftNeighbour() == null && tile.getUpNeighbour() == null) {
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
            console.log("points = " + points);
            return points;
        };
        MugginsGame.prototype.playerDidAddTileAsNeighbourToTileInBoard = function (player, neighbour, tile, board) {
            var externalTiles = board.getExternalTiles();
            var points = this.countPoints(externalTiles, board.getSpinner());
            if (points % 5 == 0 && points != 0) {
                player.setScore(player.getScore() + points);
                console.log(player.getName() + " has " + player.getScore());
            }
        };
        MugginsGame.prototype.isGameOverWithPlayersAndBoard = function (firstPlayer, secondPlayer, board) {
            if (this.canPlayerMakeMoveWithTileListOnBoard(firstPlayer.getTileList(), board))
                return false;
            if (this.canPlayerMakeMoveWithTileListOnBoard(secondPlayer.getTileList(), board))
                return false;
            return true;
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
        MugginsGame.prototype.calculateSumOfBones = function (player) {
            var points = 0;
            var playerTiles = player.getTileList();
            for (var i = 0; i < playerTiles.length; i++) {
                var tileBone = playerTiles[i].getBone();
                points += tileBone.getFirst().valueOf();
                points += tileBone.getSecond().valueOf();
            }
            return points;
        };
        MugginsGame.prototype.endOfGame = function (firstPlayer, secondPlayer, board) {
            if (this.isGameOverWithPlayersAndBoard(firstPlayer, secondPlayer, board)) {
                var pointsSecondPlayer = this.calculateSumOfBones(secondPlayer);
                var pointsFirstPlayer = this.calculateSumOfBones(firstPlayer);
                if (pointsFirstPlayer < pointsSecondPlayer) {
                    pointsSecondPlayer = Math.ceil(pointsSecondPlayer / 5) * 5;
                    firstPlayer.setScore(firstPlayer.getScore() + pointsSecondPlayer);
                }
                else {
                    pointsFirstPlayer = Math.ceil(pointsFirstPlayer / 5) * 5;
                    secondPlayer.setScore(secondPlayer.getScore() + pointsFirstPlayer);
                }
            }
        };
        MugginsGame.prototype.final = function (firstPlayer, secondPlayer, board) {
            if (firstPlayer.getScore() > 100) {
                MugginsGame.winnerName = firstPlayer.getName();
                MugginsGame.loserName = secondPlayer.getName();
                $('#playArea').load("endGameModal.html");
                var score = new dominox.Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
                localStorage.setItem(Math.random().toString(), score.toString().valueOf());
            }
            else if (secondPlayer.getScore() > 100) {
                MugginsGame.winnerName = secondPlayer.getName();
                MugginsGame.loserName = firstPlayer.getName();
                $('#playArea').load("endGameModal.html");
                var score = new dominox.Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
                localStorage.setItem(Math.random().toString(), score.toString().valueOf());
            }
        };
        return MugginsGame;
    })();
    dominox.MugginsGame = MugginsGame;
})(dominox || (dominox = {}));
//# sourceMappingURL=MugginsGame.js.map