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
/// <reference path = "../internal/concreteImplementations/MugginsGame.ts"/>
/// <reference path = "../internal/concreteImplementations/DummyTileProvider.ts"/>
/// <reference path = "../internal/concreteImplementations/SimplePlayerTurnHelper.ts"/>
/// <reference path = "../internal/concreteImplementations/DebugUserIntentionsObserver.ts"/>
///  <reference path = "../internal/concreteImplementations/SimpleTileMatrixPresenter.ts"/>
/// <reference path = "../internal/concreteImplementations/SimpleCanvasTileBoardView.ts"/>
/// <reference path = "../internal/concreteImplementations/TableTileBoardView.ts"/>
/// <reference path = "../internal/concreteImplementations/DivPlayerTileListView.ts"/>
/// <reference path = "../internal/concreteImplementations/GlobalUserInteractionsObserver.ts"/>
/// <reference path = "GameEngineMatchParameters.ts"/>
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
            //console.log("GAME ENGINE CREATED SUCCESFULLY");
        }
        GameEngine.prototype.createItemsWithPlayers = function (firstPlayer, secondPlayer) {
            //console.log("Creating matrix presenter");
            //this.matrixPresenter = new SimpleTileMatrixPresenter();
            //console.log("Done creating matrix presenter" + this.matrixPresenter);
            this.tileBoard = this.createTileBoard();
            this.firstPlayerTileListView = this.createPlayerTileViewWithPlayer(firstPlayer, "FirstPlayerContainer");
            this.secondPlayerTileListView = this.createPlayerTileViewWithPlayer(secondPlayer, "SecondPlayerContainer");
            this.tileBoardView = this.createTileView();
            this.userIntentionsObserver = this.createUserIntentionsObserver();
            this.alertHelper = this.createAlertHelper();
            this.playerTurnHelper = this.createPlayerTurnHelper();
            this.playTileUseCase = this.createPlayTileUseCase();
        };
        GameEngine.prototype.runWithParameters = function (params) {
            //console.log("Running with params: " + params.firstPlayerName + ", " + params.secondPlayerName);
            this.dominoTilesProvider = new dominox.DummyTileProvider();
            this.dominoGame = this.createDominoGameBasedOnName(params.dominoGameName);
            this.dominoTilesProvider = this.createDominoTileProvider();
            //1. set up the domino tiles for each player 
            this.firstPlayer = this.createPlayerWithNameAndProvider(params.firstPlayerName, this.dominoTilesProvider);
            this.secondPlayer = this.createPlayerWithNameAndProvider(params.secondPlayerName, this.dominoTilesProvider);
            //2. create items
            this.createItemsWithPlayers(this.firstPlayer, this.secondPlayer);
            //3. Create the turn datas
            this.firstPlayerTurnData = new PlayerTurnData(this.firstPlayer, this.firstPlayerTileListView);
            this.secondPlayerTurnData = new PlayerTurnData(this.secondPlayer, this.secondPlayerTileListView);
            //4. Start the game
            //console.log("BEGINNING THE GAME");
            this.beginGame();
        };
        GameEngine.prototype.stopGame = function () {
            this.dominoGame.endOfGame(this.firstPlayer, this.secondPlayer, this.tileBoard);
        };
        GameEngine.prototype.beginGame = function () {
            if (localStorage.getItem("isFirstGame") == null) {
                this.firstPlayer.setScore(0);
                this.secondPlayer.setScore(0);
            }
            else {
                var score = localStorage.getItem("score");
                var parts = score.split("<br>");
                var scores = parts[1].split("/");
                this.firstPlayer.setScore(Number(scores[0]));
                console.log("first player score = " + this.firstPlayer.getScore());
                var secondPlayerScore;
                var partsScore = scores[1].split("<");
                secondPlayerScore = Number(partsScore[0]);
                this.secondPlayer.setScore(secondPlayerScore);
                console.log("sec player score = " + this.secondPlayer.getScore());
                localStorage.removeItem("score");
                localStorage.removeItem("isFirstGame");
            }
            this.tileBoard.addFirstTile(this.dominoTilesProvider.getFirstTile());
            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);
            //console.log("Playing the game");
            //2. prepare their views
            this.setupTileListViewForPlayer(this.firstPlayerTileListView, this.firstPlayer);
            this.setupTileListViewForPlayer(this.secondPlayerTileListView, this.secondPlayer);
            this.playGame(this.firstPlayerTurnData, this.secondPlayerTurnData);
        };
        GameEngine.prototype.gameWantsToReload = function () {
            this.firstPlayer.clearAllTiles();
            this.secondPlayer.clearAllTiles();
            this.dominoTilesProvider = new dominox.DummyTileProvider();
            this.tileBoard = new dominox.ConcreteTileBoard();
            this.firstPlayer.setTileList(this.dominoTilesProvider.getListOfRandomTilesOfCount(7));
            this.secondPlayer.setTileList(this.dominoTilesProvider.getListOfRandomTilesOfCount(7));
            this.tileBoard.addFirstTile(this.dominoTilesProvider.getFirstTile());
            this.firstPlayerTileListView.setAndDisplayOverallTileList(this.firstPlayer.getTileList(), null);
            this.secondPlayerTileListView.setAndDisplayOverallTileList(this.secondPlayer.getTileList(), null);
            this.firstPlayerTileListView.setInvisible(null);
            this.secondPlayerTileListView.setInvisible(null);
            var self = this;
            this.alertHelper.displayOkAlertWithMessage("Beginning a new round :D", function () {
                self.playGame(self.firstPlayerTurnData, self.secondPlayerTurnData);
            });
        };
        GameEngine.prototype.playGame = function (currentPlayerTurnData, otherPlayerTurnData) {
            var gameEngineSelf = this;
            if (this.dominoGame.final(this.firstPlayer, this.secondPlayer, this.tileBoard))
                return;
            if (this.dominoTilesProvider.getTilesLeft().length == 0)
                this.stopGame();
            //console.log("In playGame");
            this.startNewTurn(currentPlayerTurnData, otherPlayerTurnData, function () {
                // now we must swap them and begin a new round
                // and so on
                dominox.callPseudoAsync(function () {
                    if (currentPlayerTurnData.player.getTileList().length == 0) {
                        gameEngineSelf.stopGame();
                        return;
                    }
                    gameEngineSelf.playGame(otherPlayerTurnData, currentPlayerTurnData);
                });
            });
        };
        GameEngine.prototype.startNewTurn = function (currentPlayerTurnData, otherPlayerTurnData, callbackWhenDone) {
            this.currentActivePlayer = currentPlayerTurnData.player;
            console.log("CURRENT STATE AS STRING");
            console.log(this.serializeCurrentStateIntoString());
            if (this.dominoGame.final(this.firstPlayer, this.secondPlayer, this.tileBoard))
                return;
            if (this.dominoTilesProvider.getTilesLeft().length == 0)
                this.stopGame();
            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);
            //this.userIntentionsObserver.currentPlayer = currentPlayerTurnData.player;
            var message = "It is " + currentPlayerTurnData.player.getName()
                + "'s turn, " + otherPlayerTurnData.player.getName() + " please move aside n__n";
            var gameEngineSelf = this;
            otherPlayerTurnData.playerTileListView.setInvisible(null);
            currentPlayerTurnData.playerTileListView.setInvisible(null);
            this.alertHelper.displayOkAlertWithMessage(message, function () {
                currentPlayerTurnData.playerTileListView.setVisible(null);
                gameEngineSelf.playerTurnHelper.replenishTilesSoPlayerCanMakeMove(currentPlayerTurnData.player, currentPlayerTurnData.playerTileListView, gameEngineSelf.dominoGame, gameEngineSelf.tileBoard, gameEngineSelf.dominoTilesProvider, function () {
                    gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                }, function () {
                    var message = "" + currentPlayerTurnData.player.getName() + ", there \
                        are no more tiles available, so ";
                    if (currentPlayerTurnData.player.getTileList().length == 0) {
                        message = message + " the round has ended :D";
                        gameEngineSelf.alertHelper.displayOkAlertWithMessage(message, null);
                        gameEngineSelf.stopGame();
                        return;
                    }
                    if (gameEngineSelf.dominoGame.canPlayerMakeMoveWithTileListOnBoard(otherPlayerTurnData.player.getTileList(), gameEngineSelf.tileBoard) == false) {
                        //both player cannot make a move anymore
                        gameEngineSelf.stopGame();
                        return;
                    }
                    else {
                        message = message + " we will let " + otherPlayerTurnData.player.getName() + " play one \
                            more round and then finish the game :D ";
                        gameEngineSelf.alertHelper.displayOkAlertWithMessage(message, null);
                        gameEngineSelf.playUseCaseTillCompleted(otherPlayerTurnData, function () {
                            gameEngineSelf.stopGame();
                        });
                    }
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
                input.playerTileListView = currentPlayerTurnData.playerTileListView;
                input.tileBoardView = gameEngineSelf.tileBoardView;
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
            var randomTiles = tileProvider.getListOfRandomTilesOfCount(3);
            return new dominox.Player(name, randomTiles);
        };
        GameEngine.prototype.createTileView = function () {
            var imagesContainer = this.findImagesContaier();
            var self = this;
            var matrixPresenter = new dominox.SimpleTileMatrixPresenter();
            var tableContainer = document.getElementById("TableContainer");
            var table = tableContainer.getElementsByClassName("TilesTable")[0];
            return new dominox.TableTileBoardView(table, imagesContainer, function (tile) {
                self.userIntentionsObserver.callForTileSelectedFromBoard(tile);
            });
        };
        GameEngine.prototype.createTileBoard = function () {
            return new dominox.ConcreteTileBoard();
        };
        GameEngine.prototype.createUserIntentionsObserver = function () {
            return new dominox.GlobalUserInteractionsObserver();
        };
        GameEngine.prototype.createDominoTileProvider = function () {
            return new dominox.DummyTileProvider();
        };
        GameEngine.prototype.createDominoGameBasedOnName = function (name) {
            var game = new dominox.MugginsGame();
            var self = this;
            game.setOnGameRequireReloadCallback(function () {
                console.log("CALLING GAME WANTS TO RELOAD");
                self.gameWantsToReload();
            });
            return game;
        };
        GameEngine.prototype.createPlayerTileViewWithPlayer = function (player, mainContainerId) {
            var self = this;
            var mainContainer = document.getElementById(mainContainerId);
            if (mainContainer == null || mainContainer == undefined)
                throw "Could not find mainContainer with id " + mainContainerId;
            var imagesContainer = this.findImagesContaier();
            var divView = new dominox.DivPlayerTileListView(mainContainer, imagesContainer, function (tile) {
                self.userIntentionsObserver.callForTileSelectedFromPlayerList(tile);
            });
            divView.setPlayerName(player.getName());
            divView.setPlayerScore(0);
            divView.setAndDisplayOverallTileList(player.getTileList().slice(0), null);
            return divView;
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
            tileListView.setPlayerName(player.getName());
            tileListView.setPlayerScore(0);
            tileListView.setAndDisplayOverallTileList(player.getTileList().slice(0), null);
        };
        GameEngine.prototype.findImagesContaier = function () {
            var imagesContainer = document.getElementById("ImagesContainer");
            if (imagesContainer == null || imagesContainer == undefined)
                throw "Could not find ImagesContainer";
            return imagesContainer;
        };
        GameEngine.prototype.serializeCurrentStateIntoString = function () {
            var obj = new dominox.GameEngineMatchDeserializedParams();
            obj.firstPlayerScore = this.firstPlayer.getScore();
            obj.firstPlayerName = this.firstPlayer.getName();
            obj.secondPlayerName = this.secondPlayer.getName();
            obj.secondPlayerScore = this.secondPlayer.getScore();
            obj.boardTiles = this.tileBoard.getTileList();
            obj.firstPlayerTiles = this.firstPlayer.getTileList();
            obj.secondPlayerTileS = this.secondPlayer.getTileList();
            var whichPlayer = "first";
            if (this.currentActivePlayer == this.secondPlayer)
                whichPlayer = "second";
            obj.whichPlayer = whichPlayer;
            var boardHasFirstTileSpinner = "yes";
            if (this.tileBoard.getSpinner() == null ||
                this.tileBoard.getSpinner() == undefined) {
                boardHasFirstTileSpinner = "no";
            }
            obj.boardHasFirstTileSpinner = boardHasFirstTileSpinner;
            return obj.stringify();
        };
        return GameEngine;
    })();
    dominox.GameEngine = GameEngine;
})(dominox || (dominox = {}));
//# sourceMappingURL=GameEngine.js.map