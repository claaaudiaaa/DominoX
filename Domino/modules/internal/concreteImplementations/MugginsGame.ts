/// <reference path= "../Interfaces.ts"/>

module dominox {

    export class MugginsGame implements dominox.DominoGame {

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
        }

        playerDidAddTileAsNeighbourToTileInBoard(player: Player,
            neighbour: dominox.DominoTile,
            tile: dominox.DominoTile, board: TileBoard) {
            var externalTiles: dominox.DominoTile[] = board.getExternalTiles();
            player.setScore(player.getScore() + this.countPoints(externalTiles, board.getSpinner()));
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
            if (this.isGameOverWithPlayersAndBoard(firstPlayer, secondPlayer, board)) {
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
            }
        }

    }
}