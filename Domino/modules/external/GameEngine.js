/// <reference path = "GameEngineParameters.ts"/>
/// <reference path = "../internal/dominoModels/DominoTile.ts"/>
/// <reference path = "../internal/Interfaces.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCase.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCaseInput.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCaseOutput.ts"/>
/// <reference path = "../internal/Player.ts"/>
var internal = com.dominox.internal;
var useCases = internal.useCases;
var playTileUseCase = useCases.playTileUseCase;
var dominModels = internal.dominoModels;
var com;
(function (com) {
    var dominox;
    (function (dominox) {
        var external;
        (function (external) {
            function callPseudoAsync(fun) {
                setTimeout(function () {
                    fun();
                }, 1);
            }
            external.callPseudoAsync = callPseudoAsync;
            var PlayerTurnData = (function () {
                function PlayerTurnData(player, tileView) {
                    this.player = player;
                    this.playerTileListView = tileView;
                }
                return PlayerTurnData;
            })();
            var GameEngine = (function () {
                function GameEngine() {
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
                    this.createItems();
                    this.dominoGame = this.createDominoGameBasedOnName(params.dominoGameName);
                    //1. set up the domino tiles for each player 
                    this.firstPlayer = this.createPlayerWithNameAndProvider(params.firstPlayerName, this.dominoTilesProvider);
                    this.secondPlayer = this.createPlayerWithNameAndProvider(params.secondPlayerName, this.dominoTilesProvider);
                    //2. prepare their views
                    this.setupTileListViewForPlayer(this.firstPlayerTileListView, this.firstPlayer);
                    this.setupTileListViewForPlayer(this.secondPlayerTileListView, this.secondPlayer);
                    //3. Create the turn datas
                    this.firstPlayerTurnData = new PlayerTurnData(this.firstPlayer, this.firstPlayerTileListView);
                    this.secondPlayerTurnData = new PlayerTurnData(this.secondPlayer, this.secondPlayerTileListView);
                };
                GameEngine.prototype.stopGame = function () {
                };
                GameEngine.prototype.beginGame = function () {
                    this.currentPlayerTurnData = this.firstPlayerTurnData;
                    this.otherPlayerTurnData = this.secondPlayerTurnData;
                };
                GameEngine.prototype.playGame = function (currentPlayerTurnData, otherPlayerTurnData) {
                    var gameEngineSelf = this;
                    this.startNewTurn(currentPlayerTurnData, otherPlayerTurnData, function () {
                        // now we must swap them and begin a new round
                        // and so on
                        callPseudoAsync(function () {
                            gameEngineSelf.playGame(otherPlayerTurnData, currentPlayerTurnData);
                        });
                    });
                };
                GameEngine.prototype.startNewTurn = function (currentPlayerTurnData, otherPlayerTurnData, callbackWhenDone) {
                    var message = "It is [currentPlayerName]'s turn, [otherPlayerName] please move aside n__n";
                    var gameEngineSelf = this;
                    this.alertHelper.displayOkAlertWithMessage(message, function () {
                        otherPlayerTurnData.playerTileListView.setInvisible(null);
                        currentPlayerTurnData.playerTileListView.setVisible(null);
                        gameEngineSelf.playerTurnHelper.replenishTilesSoPlayerCanMakeMove(currentPlayerTurnData.player, currentPlayerTurnData.playerTileListView, gameEngineSelf.dominoGame, gameEngineSelf.tileBoard, function () {
                            gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                        });
                    });
                };
                GameEngine.prototype.playUseCaseTillCompleted = function (currentPlayerTurnData, callbackWhenDone) {
                    var gameEngineSelf = this;
                    gameEngineSelf.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromPlayerTileList(function (selectedTile) {
                        var input;
                        input = new com.dominox.internal.useCases.playTileUseCase.PlayTileUseCaseInput();
                        input.userIntentionsObserver = gameEngineSelf.userIntentionsObserver;
                        input.dominoGame = gameEngineSelf.dominoGame;
                        input.player = currentPlayerTurnData.player;
                        input.tileView = gameEngineSelf.tileBoardView;
                        gameEngineSelf.playTileUseCase.beginWithInputAndCallback(input, function (output) {
                            if (output.resultOfUseCase ===
                                com.dominox.internal.useCases.playTileUseCase.PlayTileUseCaseResult.Completed) {
                                callPseudoAsync(function () {
                                    callbackWhenDone();
                                });
                            }
                            else {
                                //a better way to handle this requirement isn't known at the moment
                                callPseudoAsync(function () {
                                    gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                                });
                            }
                        });
                    });
                };
                GameEngine.prototype.createPlayerWithNameAndProvider = function (name, tileProvider) {
                    var randomTiles = tileProvider.getListOfRandomTilesOfCount(5);
                    return new com.dominox.internal.Player(name, randomTiles);
                };
                GameEngine.prototype.createTileView = function () {
                    return null;
                };
                GameEngine.prototype.createTileBoard = function () {
                    return null;
                };
                GameEngine.prototype.createUserIntentionsObserver = function () {
                    return null;
                };
                GameEngine.prototype.createDominoTileProvider = function () {
                    return null;
                };
                GameEngine.prototype.createDominoGameBasedOnName = function (name) {
                    return null;
                };
                GameEngine.prototype.createPlayerTileView = function () {
                    return null;
                };
                GameEngine.prototype.createAlertHelper = function () {
                    return null;
                };
                GameEngine.prototype.createPlayerTurnHelper = function () {
                    return null;
                };
                GameEngine.prototype.createPlayTileUseCase = function () {
                    return new com.dominox.internal.useCases.playTileUseCase.PlayTileUseCase();
                };
                GameEngine.prototype.setupTileListViewForPlayer = function (tileListView, player) {
                    tileListView.setOverallTileList(player.getTileList());
                    tileListView.setPlayerName(player.getName());
                    tileListView.setPlayerScore(0);
                };
                return GameEngine;
            })();
            external.GameEngine = GameEngine;
        })(external = dominox.external || (dominox.external = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=GameEngine.js.map