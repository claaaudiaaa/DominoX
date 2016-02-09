﻿
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

module dominox
{


    class PlayerTurnData {
        public player: dominox.Player;
        public playerTileListView: dominox.PlayerTileListView;

        constructor(player: dominox.Player, tileView: dominox.PlayerTileListView) {
            this.player = player;
            this.playerTileListView = tileView;
        }

    }

    export class GameEngine
    {
        firstPlayer: dominox.Player;
        secondPlayer: dominox.Player;
        //probably some player variables

        firstPlayerTurnData: PlayerTurnData;
        secondPlayerTurnData: PlayerTurnData;

        currentPlayerTurnData: PlayerTurnData;
        otherPlayerTurnData: PlayerTurnData;

        firstPlayerTileListView: dominox.PlayerTileListView;
        secondPlayerTileListView: dominox.PlayerTileListView;
        tileBoardView: dominox.TileBoardView;

        dominoTilesProvider: dominox.DominoTileProvider;
        tileBoard: dominox.TileBoard;

        userIntentionsObserver: dominox.GlobalUserInteractionsObserver;
        alertHelper: dominox.AlertHelper;

        dominoGame: dominox.DominoGame;
        playerTurnHelper: dominox.PlayerTurnHelper;

        playTileUseCase: dominox.PlayTileUseCase;

        matrixPresenter: dominox.SimpleTileMatrixPresenter;

        constructor() {
            //console.log("GAME ENGINE CREATED SUCCESFULLY");
        }

        createItemsWithPlayers(firstPlayer: Player, secondPlayer: Player)
        {
            
            this.tileBoard = this.createTileBoard();

            this.firstPlayerTileListView = this.createPlayerTileViewWithPlayer(firstPlayer,
                "FirstPlayerContainer");
            this.secondPlayerTileListView = this.createPlayerTileViewWithPlayer(secondPlayer,
                "SecondPlayerContainer");


            this.tileBoardView = this.createTileView();

            this.userIntentionsObserver = this.createUserIntentionsObserver();
            this.alertHelper = this.createAlertHelper();

            this.playerTurnHelper = this.createPlayerTurnHelper();
            this.playTileUseCase = this.createPlayTileUseCase();
        }

        public runWithParameters(params: GameEngineParameters): void
        {
            //console.log("Running with params: " + params.firstPlayerName + ", " + params.secondPlayerName);

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
        }

        public stopGame(): void
        {

        }


        beginGame()
        {
            this.firstPlayer.setScore(0);
            this.secondPlayer.setScore(0);

            this.tileBoard.addFirstTile(this.dominoTilesProvider.getRandomTile());

            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);

            //console.log("Playing the game");

            //2. prepare their views
            this.setupTileListViewForPlayer(this.firstPlayerTileListView, this.firstPlayer);
            this.setupTileListViewForPlayer(this.secondPlayerTileListView, this.secondPlayer);

            this.playGame(this.firstPlayerTurnData, this.secondPlayerTurnData);
        }

        playGame(currentPlayerTurnData: PlayerTurnData, otherPlayerTurnData: PlayerTurnData): void {

            var gameEngineSelf: GameEngine = this;
            //console.log("In playGame");
            this.startNewTurn(currentPlayerTurnData, otherPlayerTurnData, function ()
            {
                // now we must swap them and begin a new round
                // and so on
                dominox.callPseudoAsync(function () {
                    gameEngineSelf.playGame(otherPlayerTurnData, currentPlayerTurnData);
                });
            });

        }

        startNewTurn(currentPlayerTurnData: PlayerTurnData, otherPlayerTurnData: PlayerTurnData,
            callbackWhenDone: dominox.VoidCallback)
        {
            this.dominoGame.endOfGame(this.firstPlayer, this.secondPlayer, this.tileBoard);
            if (this.dominoGame.final(this.firstPlayer, this.secondPlayer, this.tileBoard))
                return;
            this.tileBoardView.displayAsNormalTileBoard(this.tileBoard, null);
            //this.userIntentionsObserver.currentPlayer = currentPlayerTurnData.player;

            var message: String = "It is " + currentPlayerTurnData.player.getName()
                + "'s turn, " + otherPlayerTurnData.player.getName() + " please move aside n__n";
            var gameEngineSelf: GameEngine = this;

            otherPlayerTurnData.playerTileListView.setInvisible(null);
            currentPlayerTurnData.playerTileListView.setInvisible(null);

            this.alertHelper.displayOkAlertWithMessage(message, function () {
             
                currentPlayerTurnData.playerTileListView.setVisible(null);

                gameEngineSelf.playerTurnHelper.replenishTilesSoPlayerCanMakeMove(currentPlayerTurnData.player,
                    currentPlayerTurnData.playerTileListView, gameEngineSelf.dominoGame, gameEngineSelf.tileBoard,
                    gameEngineSelf.dominoTilesProvider,
                    function ()
                    {
                        gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);   
                    });

            });
        }


        playUseCaseTillCompleted(currentPlayerTurnData: PlayerTurnData, callbackWhenDone: dominox.VoidCallback): void
        {
            var gameEngineSelf: GameEngine = this;
            gameEngineSelf.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromPlayerTileList(
                function (selectedTile: dominox.DominoTile) {

                    var input: dominox.PlayTileUseCaseInput;
                    input = new dominox.PlayTileUseCaseInput();

                    input.userIntentionsObserver = gameEngineSelf.userIntentionsObserver;
                    input.dominoGame = gameEngineSelf.dominoGame;
                    input.player = currentPlayerTurnData.player;
                    input.tileView = gameEngineSelf.tileBoardView;
                    input.tileBoard = gameEngineSelf.tileBoard;
                    input.tile = selectedTile;
                    input.playerTileListView = currentPlayerTurnData.playerTileListView;

                    gameEngineSelf.playTileUseCase.beginWithInputAndCallback(input, function (output:
                        dominox.PlayTileUseCaseOutput) {

                        if (output.resultOfUseCase ===
                            dominox.PlayTileUseCaseResult.Completed)
                        {
                            dominox.callPseudoAsync(function () {
                                callbackWhenDone();
                            });

                        } else {

                            //a better way to handle this requirement isn't known at the moment
                            dominox.callPseudoAsync(function () {
                                gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                            });
                        }

                    });

                });
        }

        createPlayerWithNameAndProvider(name: string, tileProvider: dominox.DominoTileProvider):
            dominox.Player
        {
            var randomTiles: dominox.DominoTile[] = tileProvider.getListOfRandomTilesOfCount(5);
            return new dominox.Player(name, randomTiles);
        }


        createTileView(): dominox.TileBoardView
        {
            var imagesContainer = this.findImagesContaier();
            var self = this;

            var matrixPresenter = new SimpleTileMatrixPresenter();
            var tableContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("TableContainer");
            var table: HTMLTableElement = <HTMLTableElement>tableContainer.getElementsByClassName("TilesTable")[0];

            return new dominox.TableTileBoardView(table, imagesContainer, function (tile: DominoTile) {
                self.userIntentionsObserver.callForTileSelectedFromBoard(tile);
            });
        }

        createTileBoard(): dominox.TileBoard {
            return new dominox.ConcreteTileBoard();
        }

        createUserIntentionsObserver(): dominox.GlobalUserInteractionsObserver
        {
            return new GlobalUserInteractionsObserver();
        }

        createDominoTileProvider(): dominox.DominoTileProvider {
            return new dominox.DummyTileProvider();
        }

        createDominoGameBasedOnName(name: String): dominox.DominoGame {
            return new dominox.MugginsGame();
        }

        createPlayerTileViewWithPlayer(player: Player, mainContainerId: string): dominox.PlayerTileListView
        {
            var self = this;

            var mainContainer = <HTMLDivElement>document.getElementById(mainContainerId);
            if (mainContainer == null || mainContainer == undefined)
                throw "Could not find mainContainer with id " + mainContainerId;

            var imagesContainer = this.findImagesContaier();
            var divView = new DivPlayerTileListView(mainContainer, imagesContainer,
                function (tile: DominoTile) {
                    self.userIntentionsObserver.callForTileSelectedFromPlayerList(tile);
                });

            divView.setPlayerName(player.getName());
            divView.setPlayerScore(0);
            divView.setAndDisplayOverallTileList(player.getTileList().slice(0), null);

            return  divView;
        }

        createAlertHelper(): dominox.AlertHelper {
            return new dominox.SimpleAlertHelper();
        }

        createPlayerTurnHelper(): dominox.PlayerTurnHelper {
            return new dominox.SimplePlayerTurnHelper();
        }

        createPlayTileUseCase(): dominox.PlayTileUseCase {
            return new dominox.PlayTileUseCase();
        }

        setupTileListViewForPlayer(tileListView: dominox.PlayerTileListView,
            player: dominox.Player): void
        {
            tileListView.setPlayerName(player.getName());
            tileListView.setPlayerScore(0);
            tileListView.setAndDisplayOverallTileList(player.getTileList().slice(0), null);
        }


        findImagesContaier(): HTMLDivElement
        {
            var imagesContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("ImagesContainer");
            if (imagesContainer == null || imagesContainer == undefined)
                throw "Could not find ImagesContainer";

            return imagesContainer;
        }
    }
}