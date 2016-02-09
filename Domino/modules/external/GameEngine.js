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
        GameEngine.prototype.runWithParameters = function (params, isFirstGame) {
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
            this.beginGame(isFirstGame);
        };
        GameEngine.prototype.stopGame = function () {
            this.dominoGame.endOfGame(this.firstPlayer, this.secondPlayer, this.tileBoard);
        };
        GameEngine.prototype.beginGame = function (isFirstGame) {
            if (isFirstGame) {
                this.firstPlayer.setScore(0);
                this.secondPlayer.setScore(0);
            }
            this.tileBoard.addFirstTile(this.dominoTilesProvider.getFirstTile());
            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);
            //console.log("Playing the game");
            //2. prepare their views
            this.setupTileListViewForPlayer(this.firstPlayerTileListView, this.firstPlayer);
            this.setupTileListViewForPlayer(this.secondPlayerTileListView, this.secondPlayer);
            this.playGame(this.firstPlayerTurnData, this.secondPlayerTurnData);
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
                    gameEngineSelf.playGame(otherPlayerTurnData, currentPlayerTurnData);
                });
            });
        };
        GameEngine.prototype.startNewTurn = function (currentPlayerTurnData, otherPlayerTurnData, callbackWhenDone) {
            //this.dominoGame.endOfGame(this.firstPlayer, this.secondPlayer, this.tileBoard);
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
            var randomTiles = tileProvider.getListOfRandomTilesOfCount(7);
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
            return new dominox.MugginsGame();
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
        return GameEngine;
    })();
    dominox.GameEngine = GameEngine;
})(dominox || (dominox = {}));
//# sourceMappingURL=GameEngine.js.map