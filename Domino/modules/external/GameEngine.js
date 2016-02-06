/// <reference path = "GameEngineParameters.ts"/>
/// <reference path = "../internal/dominoModels/DominoTile.ts"/>
/// <reference path = "../internal/Interfaces.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCase.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCaseInput.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCaseOutput.ts"/>
/// <reference path = "../internal/Player.ts"/>
/// <reference path = "../internal/concreteImplementations/ConcreteTileBoard.ts"/>
/// <reference path = "../internal/concreteImplementations/SimpleAlertHelper.ts"/>
/// <reference path = "../internal/concreteImplementations/ConsoleTileBoardView.ts"/>
/// <reference path = "../internal/concreteImplementations/ConsolePlayerTileListView.ts"/>
/// <reference path = "../internal/concreteImplementations/DummyDominoGame.ts"/>
/// <reference path = "../internal/concreteImplementations/DummyTileProvider.ts"/>
/// <reference path = "../internal/concreteImplementations/SimplePlayerTurnHelper.ts"/>
/// <reference path = "../internal/concreteImplementations/DebugUserIntentionsObserver.ts"/>
var dominox;
(function (dominox) {
    var PlayerTurnData = (function () {
        function PlayerTurnData(player, tileView) {
            this.player = player;
            this.playerTileListView = tileView;
        }
        return PlayerTurnData;
    })();
    var GameEngine = (function () {
        function GameEngine() {
            console.log("GAME ENGINE CREATED SUCCESFULLY");
        }
        GameEngine.prototype.createItems = function () {
            this.dominoTilesProvider = this.createDominoTileProvider();
            this.tileBoard = this.createTileBoard();
            this.firstPlayerTileListView = this.createPlayerTileView();
            this.secondPlayerTileListView = this.createPlayerTileView();
            this.tileBoardView = this.createTileView();
            this.userIntentionsObserver = this.createUserIntentionsObserver();
            this.alertHelper = this.createAlertHelper();
            this.playerTurnHelper = this.createPlayerTurnHelper();
            this.playTileUseCase = this.createPlayTileUseCase();
        };
        GameEngine.prototype.runWithParameters = function (params) {
            console.log("Running with params: " + params.firstPlayerName + ", " + params.secondPlayerName);
            this.createItems();
            console.log("created items");
            this.dominoGame = this.createDominoGameBasedOnName(params.dominoGameName);
            console.log("created domino game");
            //1. set up the domino tiles for each player 
            this.firstPlayer = this.createPlayerWithNameAndProvider(params.firstPlayerName, this.dominoTilesProvider);
            this.secondPlayer = this.createPlayerWithNameAndProvider(params.secondPlayerName, this.dominoTilesProvider);
            //3. Create the turn datas
            this.firstPlayerTurnData = new PlayerTurnData(this.firstPlayer, this.firstPlayerTileListView);
            this.secondPlayerTurnData = new PlayerTurnData(this.secondPlayer, this.secondPlayerTileListView);
            //4. Start the game
            console.log("BEGINNING THE GAME");
            this.beginGame();
        };
        GameEngine.prototype.stopGame = function () {
        };
        GameEngine.prototype.beginGame = function () {
            this.firstPlayer.setScore(0);
            this.secondPlayer.setScore(0);
            //this.tileBoard.addFirstTile(this.dominoTilesProvider.getRandomTile());
            var tileBoard = this.tileBoard;
            var tile21 = new dominox.DominoTile(new dominox.DominoBone(2, 1), dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
            var tile12 = new dominox.DominoTile(new dominox.DominoBone(1, 2), dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
            tile21.setRightNeighbour(tile12);
            tile12.setLeftNeighbour(tile21);
            tileBoard.setTileList([tile12, tile21]);
            var tile01 = new dominox.DominoTile(new dominox.DominoBone(0, 1), dominox.DominoTileOrientation.HorizontalFirstLeftSecondRight);
            this.firstPlayer.addTile(tile01);
            this.secondPlayer.addTile(tile01);
            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);
            console.log("Playing the game");
            //2. prepare their views
            this.setupTileListViewForPlayer(this.firstPlayerTileListView, this.firstPlayer);
            this.setupTileListViewForPlayer(this.secondPlayerTileListView, this.secondPlayer);
            this.playGame(this.firstPlayerTurnData, this.secondPlayerTurnData);
        };
        GameEngine.prototype.playGame = function (currentPlayerTurnData, otherPlayerTurnData) {
            var gameEngineSelf = this;
            console.log("In playGame");
            this.startNewTurn(currentPlayerTurnData, otherPlayerTurnData, function () {
                // now we must swap them and begin a new round
                // and so on
                dominox.callPseudoAsync(function () {
                    gameEngineSelf.playGame(otherPlayerTurnData, currentPlayerTurnData);
                });
            });
        };
        GameEngine.prototype.startNewTurn = function (currentPlayerTurnData, otherPlayerTurnData, callbackWhenDone) {
            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);
            this.userIntentionsObserver.currentPlayer = currentPlayerTurnData.player;
            var message = "It is " + currentPlayerTurnData.player.getName()
                + "'s turn, " + otherPlayerTurnData.player.getName() + " please move aside n__n";
            var gameEngineSelf = this;
            console.log("STARTING NEW TURN");
            //hide other player tile list
            otherPlayerTurnData.playerTileListView.setInvisible(null);
            currentPlayerTurnData.playerTileListView.setInvisible(null);
            this.alertHelper.displayOkAlertWithMessage(message, function () {
                //show current player tile list 
                currentPlayerTurnData.playerTileListView.setVisible(null);
                gameEngineSelf.playerTurnHelper.replenishTilesSoPlayerCanMakeMove(currentPlayerTurnData.player, currentPlayerTurnData.playerTileListView, gameEngineSelf.dominoGame, gameEngineSelf.tileBoard, gameEngineSelf.dominoTilesProvider, function () {
                    gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                });
            });
        };
        GameEngine.prototype.playUseCaseTillCompleted = function (currentPlayerTurnData, callbackWhenDone) {
            var gameEngineSelf = this;
            gameEngineSelf.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromPlayerTileList(function (selectedTile) {
                var input;
                input = new dominox.PlayTileUseCaseInput();
                input.userIntentionsObserver = gameEngineSelf.userIntentionsObserver;
                input.dominoGame = gameEngineSelf.dominoGame;
                input.player = currentPlayerTurnData.player;
                input.tileView = gameEngineSelf.tileBoardView;
                input.tileBoard = gameEngineSelf.tileBoard;
                input.tile = selectedTile;
                gameEngineSelf.playTileUseCase.beginWithInputAndCallback(input, function (output) {
                    if (output.resultOfUseCase ===
                        dominox.PlayTileUseCaseResult.Completed) {
                        dominox.callPseudoAsync(function () {
                            callbackWhenDone();
                        });
                    }
                    else {
                        //a better way to handle this requirement isn't known at the moment
                        dominox.callPseudoAsync(function () {
                            gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                        });
                    }
                });
            });
        };
        GameEngine.prototype.createPlayerWithNameAndProvider = function (name, tileProvider) {
            var randomTiles = tileProvider.getListOfRandomTilesOfCount(5);
            //console.log("Tiles for player: " + name + " are " + dominox.stringifyTileList(randomTiles));
            return new dominox.Player(name, []);
        };
        GameEngine.prototype.createTileView = function () {
            return new dominox.ConsoleTileBoardView();
        };
        GameEngine.prototype.createTileBoard = function () {
            return new dominox.ConcreteTileBoard();
        };
        GameEngine.prototype.createUserIntentionsObserver = function () {
            var divButtons = document.getElementById("DebugUserIntentions");
            var selectFromBoardButton = divButtons.getElementsByClassName("debugSelectFirstFromBoard")[0];
            var selectFromListButton = divButtons.getElementsByClassName("debugSelectFirstFromList")[0];
            var defaultButton = divButtons.getElementsByClassName("debugDefaultAction")[0];
            var intentionsObserver = new dominox.DebugUserIntentionsObserver(selectFromBoardButton, selectFromListButton, defaultButton);
            intentionsObserver.tileBoard = this.tileBoard;
            intentionsObserver.currentPlayer = this.firstPlayer;
            return intentionsObserver;
        };
        GameEngine.prototype.createDominoTileProvider = function () {
            return new dominox.DummyTileProvider();
        };
        GameEngine.prototype.createDominoGameBasedOnName = function (name) {
            return new dominox.DummyDominoGame();
        };
        GameEngine.prototype.createPlayerTileView = function () {
            return new dominox.ConsolePlayerTileListView();
        };
        GameEngine.prototype.createAlertHelper = function () {
            return new dominox.SimpleAlertHelper();
        };
        GameEngine.prototype.createPlayerTurnHelper = function () {
            return new dominox.SimplePlayerTurnHelper();
        };
        GameEngine.prototype.createPlayTileUseCase = function () {
            return new dominox.PlayTileUseCase();
        };
        GameEngine.prototype.setupTileListViewForPlayer = function (tileListView, player) {
            tileListView.setAndDisplayOverallTileList(player.getTileList(), null);
            tileListView.setPlayerName(player.getName());
            tileListView.setPlayerScore(0);
        };
        return GameEngine;
    })();
    dominox.GameEngine = GameEngine;
})(dominox || (dominox = {}));
//# sourceMappingURL=GameEngine.js.map