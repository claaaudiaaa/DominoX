/// <reference path= "../Interfaces.ts"/>
/// <reference path= "../Score.ts"/>
/// <reference path= "../../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path= "../../../Scripts/typings/bootstrap/bootstrap.d.ts"/>

module dominox {

    export class MugginsGame implements dominox.DominoGame {

        static winnerName: String;
        static loserName: String;

        constructor() {
            console.log("MugginsGame CREATED SUCCESFULLY");
        }

        getNeighbourListForTileFromBoard(tile: dominox.DominoTile, board: TileBoard): dominox.DominoTile[] {
            return board.getExternalTilesListMatchingTile(tile);
        }

        countPoints(externalTiles: dominox.DominoTile[], spinner: dominox.DominoTile): number {
            var points: number = 0;
            for (var i = 0; i < externalTiles.length; i++) {
                var tile: dominox.DominoTile = externalTiles[i];
                var orientation: dominox.DominoTileOrientation = tile.getOrientation();
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
                        points += (tile.getBone().getSecond().valueOf()*2);                   
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
                            points += tile.getBone().getFirst().valueOf()*2;
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
        }

        playerDidAddTileAsNeighbourToTileInBoard(player: Player,
            neighbour: dominox.DominoTile,
            tile: dominox.DominoTile, board: TileBoard) {
            var externalTiles: dominox.DominoTile[] = board.getExternalTiles();
            var points: number = this.countPoints(externalTiles, board.getSpinner());
            if (points % 5 == 0 && points != 0) {
                points += player.getScore();
                player.setScore(points);
                console.log(player.getName() + " has " + player.getScore());
            }
        }

        isGameOverWithPlayersAndBoard(firstPlayer: Player, secondPlayer: Player, board: TileBoard): boolean {
            
            if (this.canPlayerMakeMoveWithTileListOnBoard(firstPlayer.getTileList(), board))
                return false;
            if (this.canPlayerMakeMoveWithTileListOnBoard(secondPlayer.getTileList(), board))
                return false;
            return true;
        }

        

        canPlayerMakeMoveWithTileListOnBoard(playerTileList: dominox.DominoTile[], board: TileBoard): boolean {
            var anyMatchFound: boolean = false;
            for (var i = 0; i < playerTileList.length; i++) {
                var iTile = playerTileList[i];
                var matchableTiles: dominox.DominoTile[] = board.getExternalTilesListMatchingTile(iTile);
                //console.log("canPlayerMakeMove, matchable tiles for tile " + iTile + " are " + stringifyTileList(matchableTiles));
                if (matchableTiles.length > 0)
                    return true;
            }

            return anyMatchFound;
        }

        calculateSumOfBones(player: Player): number {
            var points: number = 0;
            var playerTiles: DominoTile[] = player.getTileList();
            for (var i = 0; i < playerTiles.length; i++) {
                var tileBone: dominox.DominoBone = playerTiles[i].getBone();
                points += tileBone.getFirst().valueOf();
                points += tileBone.getSecond().valueOf();
            }
            return points;
        }

        endOfGame(firstPlayer: Player, secondPlayer: Player, board: TileBoard): void {
            console.log("END OF GAME");
            // if (this.isGameOverWithPlayersAndBoard(firstPlayer, secondPlayer, board)) {
            var pointsSecondPlayer: number = this.calculateSumOfBones(secondPlayer);
            var pointsFirstPlayer: number = this.calculateSumOfBones(firstPlayer);
            if (pointsFirstPlayer < pointsSecondPlayer) {

                pointsSecondPlayer = Math.ceil(pointsSecondPlayer / 5) * 5;
                firstPlayer.setScore(firstPlayer.getScore() + pointsSecondPlayer);
            }
            else {
                pointsFirstPlayer = Math.ceil(pointsFirstPlayer / 5) * 5;
                secondPlayer.setScore(secondPlayer.getScore() + pointsFirstPlayer);
            }     
            //and now start a new game 
            var bool: String = "false";
           // $('.backgroundImage').load("gamePage.html");
            localStorage.setItem("isFirstGame", "false");
        //}
        }

        final(firstPlayer: Player, secondPlayer: Player, board: TileBoard): boolean {
          
            if (firstPlayer.getScore() >= 100) {
                $("#myModal").css("visibility", "visible");
                $("#winner").append("The winner of this game is " + firstPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB: String = " " + firstPlayer.getName() + " and " + secondPlayer.getName() + " played DominoX and " + firstPlayer.getName() + " won!";
                var bool: String = "false";
                $("#msgFb").text(msgFB.valueOf());
                $("#firstGame").text(bool.valueOf());
                var score: dominox.Score = new Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
                var key: String = (Number(localStorage.key(localStorage.length - 1)) + 1).toString();
                localStorage.setItem(key.valueOf(), score.toString().valueOf());
                return true;
            }
            if (secondPlayer.getScore() >= 100) {
                $("#myModal").css("visibility", "visible");
                $("#winner").text("The winner of this game is " + secondPlayer.getName() + "!");
                $('#myModal').modal();
                var msgFB: String = " " + secondPlayer.getName() + " and " + firstPlayer.getName() + " played DominoX and " + secondPlayer.getName() + " won!";  
                $("#msgFb").append(msgFB.valueOf());         
                var score: dominox.Score = new Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
                var key: String = (Number(localStorage.key(localStorage.length - 1)) + 1).toString();
                localStorage.setItem(key.valueOf(), score.toString().valueOf());
                return true;
            }
            return false;   
        }
    }
}