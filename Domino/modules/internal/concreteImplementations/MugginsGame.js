/// <reference path= "../Interfaces.ts"/>
/// <reference path= "../Score.ts"/>
/// <reference path= "../../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path= "../../../Scripts/typings/bootstrap/bootstrap.d.ts"/>
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
                    if (tile.getLeftNeighbour() != null && tile.getRightNeighbour() != null) {
                        if (tile.getUpNeighbour() != null && tile.getDownNeighbour() != null) {
                            continue;
                        }
                        else if ((tile.getUpNeighbour() == null && tile.getDownNeighbour() != null) || (tile.getUpNeighbour() != null && tile.getDownNeighbour() == null)) {
                            points += tile.getBone().getSecond().valueOf();
                            continue;
                        }
                        else if (tile.getDownNeighbour() == null && tile.getUpNeighbour() == null) {
                            points += (tile.getBone().getSecond().valueOf() * 2);
                            continue;
                        }
                    }
                    points += (tile.getBone().getSecond().valueOf() * 2);
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
                        if (tile.isDoubleTile())
                            points += tile.getBone().getFirst().valueOf() * 2;
                        else if (tile.getDownNeighbour() !== null) {
                            points += tile.getBone().getFirst().valueOf();
                        }
                        else {
                            points += tile.getBone().getSecond().valueOf();
                        }
                    }
                    else {
                        if (tile.isDoubleTile())
                            points += tile.getBone().getFirst().valueOf() * 2;
                        else if (tile.getDownNeighbour() !== null) {
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
                points += player.getScore();
                player.setScore(points);
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
            console.log("END OF GAME");
            // if (this.isGameOverWithPlayersAndBoard(firstPlayer, secondPlayer, board)) {
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
            //and now start a new game 
            var bool = "false";
            $('.backgroundImage').load("gamePage.html");
            localStorage.setItem("isFirstGame", "false");
            //}
        };
        MugginsGame.prototype.final = function (firstPlayer, secondPlayer, board) {
            if (firstPlayer.getScore() >= 100) {
                $("#myModal").css("visibility", "visible");
                $("#winner").append("The winner of this game is " + firstPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB = " " + firstPlayer.getName() + " and " + secondPlayer.getName() + " played DominoX and " + firstPlayer.getName() + " won!";
                var bool = "false";
                $("#msgFb").text(msgFB.valueOf());
                $("#firstGame").text(bool.valueOf());
                var score = new dominox.Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
                var key = (Number(localStorage.key(localStorage.length - 1)) + 1).toString();
                localStorage.setItem(key.valueOf(), score.toString().valueOf());
                return true;
            }
            if (secondPlayer.getScore() >= 100) {
                $("#myModal").css("visibility", "visible");
                $("#winner").text("The winner of this game is " + secondPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB = " " + secondPlayer.getName() + " and " + firstPlayer.getName() + " played DominoX and " + secondPlayer.getName() + " won!";
                $("#msgFb").append(msgFB.valueOf());
                var score = new dominox.Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
                var key = (Number(localStorage.key(localStorage.length - 1)) + 1).toString();
                localStorage.setItem(key.valueOf(), score.toString().valueOf());
                return true;
            }
            return false;
        };
        return MugginsGame;
    })();
    dominox.MugginsGame = MugginsGame;
})(dominox || (dominox = {}));
//# sourceMappingURL=MugginsGame.js.map