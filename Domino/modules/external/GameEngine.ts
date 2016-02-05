
/// <reference path = "GameEngineParameters.ts"/>
/// <reference path = "../internal/dominoModels/DominoTile.ts"/>
/// <reference path = "../internal/Interfaces.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCase.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCaseInput.ts"/>
/// <reference path = "../internal/useCases/playTileUseCase/PlayTileUseCaseOutput.ts"/>
/// <reference path = "../internal/Player.ts"/>


import internal = com.dominox.internal;
import useCases = internal.useCases;
import playTileUseCase = useCases.playTileUseCase;
import dominModels = internal.dominoModels;

module com.dominox.external
{

    export function callPseudoAsync(fun: internal.VoidCallback) {
        setTimeout(function () {
            fun();
        }, 1);
    }

    class PlayerTurnData {
        public player: internal.Player;
        public playerTileListView: internal.PlayerTileListView;

        constructor(player: internal.Player, tileView: internal.PlayerTileListView) {
            this.player = player;
            this.playerTileListView = tileView;
        }

    }

    export class GameEngine
    {
        firstPlayer: internal.Player;
        secondPlayer: internal.Player;
        //probably some player variables

        firstPlayerTurnData: PlayerTurnData;
        secondPlayerTurnData: PlayerTurnData;

        currentPlayerTurnData: PlayerTurnData;
        otherPlayerTurnData: PlayerTurnData;

        firstPlayerTileListView: internal.PlayerTileListView;
        secondPlayerTileListView: internal.PlayerTileListView;
        tileBoardView: internal.TileBoardView;

        dominoTilesProvider: internal.DominoTileProvider;
        tileBoard: internal.TileBoard;

        userIntentionsObserver: internal.UserIntentionsObserver;
        alertHelper: internal.AlertHelper;

        dominoGame: internal.DominoGame;
        playerTurnHelper: internal.PlayerTurnHelper;

        playTileUseCase: playTileUseCase.PlayTileUseCase;


        createItems() {
            this.dominoTilesProvider = this.createDominoTileProvider();
            this.tileBoard = this.createTileBoard();

            this.firstPlayerTileListView = this.createPlayerTileView();
            this.secondPlayerTileListView = this.createPlayerTileView();
            this.tileBoardView = this.createTileView();

            this.userIntentionsObserver = this.createUserIntentionsObserver();
            this.alertHelper = this.createAlertHelper();

            this.playerTurnHelper = this.createPlayerTurnHelper();
            this.playTileUseCase = this.createPlayTileUseCase();
        }

        public runWithParameters(params: GameEngineParameters): void
        {
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

        }

        public stopGame(): void
        {

        }


        beginGame()
        {
            this.currentPlayerTurnData = this.firstPlayerTurnData;
            this.otherPlayerTurnData = this.secondPlayerTurnData;
        }

        playGame(currentPlayerTurnData: PlayerTurnData, otherPlayerTurnData: PlayerTurnData): void {

            var gameEngineSelf: GameEngine = this;
            this.startNewTurn(currentPlayerTurnData, otherPlayerTurnData, function ()
            {
                // now we must swap them and begin a new round
                // and so on
                callPseudoAsync(function () {
                    gameEngineSelf.playGame(otherPlayerTurnData, currentPlayerTurnData);
                });
            });

        }

        startNewTurn(currentPlayerTurnData: PlayerTurnData, otherPlayerTurnData: PlayerTurnData,
            callbackWhenDone: com.dominox.internal.VoidCallback)
        {
            var message: String = "It is [currentPlayerName]'s turn, [otherPlayerName] please move aside n__n";
            var gameEngineSelf: GameEngine = this;

            this.alertHelper.displayOkAlertWithMessage(message, function () {

                otherPlayerTurnData.playerTileListView.setInvisible(null);
                currentPlayerTurnData.playerTileListView.setVisible(null);

                gameEngineSelf.playerTurnHelper.replenishTilesSoPlayerCanMakeMove(currentPlayerTurnData.player,
                    currentPlayerTurnData.playerTileListView, gameEngineSelf.dominoGame, gameEngineSelf.tileBoard,
                    function ()
                    {
                        gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);   
                    });

            });
        }


        playUseCaseTillCompleted(currentPlayerTurnData: PlayerTurnData, callbackWhenDone: internal.VoidCallback): void
        {
            var gameEngineSelf: GameEngine = this;
            gameEngineSelf.userIntentionsObserver.setCallbackCaseWhenSelectingTileFromPlayerTileList(
                function (selectedTile: com.dominox.internal.dominoModels.DominoTile) {

                    var input: com.dominox.internal.useCases.playTileUseCase.PlayTileUseCaseInput;
                    input = new com.dominox.internal.useCases.playTileUseCase.PlayTileUseCaseInput();

                    input.userIntentionsObserver = gameEngineSelf.userIntentionsObserver;
                    input.dominoGame = gameEngineSelf.dominoGame;
                    input.player = currentPlayerTurnData.player;
                    input.tileView = gameEngineSelf.tileBoardView;

                    gameEngineSelf.playTileUseCase.beginWithInputAndCallback(input, function (output:
                        com.dominox.internal.useCases.playTileUseCase.PlayTileUseCaseOutput) {

                        if (output.resultOfUseCase ===
                            com.dominox.internal.useCases.playTileUseCase.PlayTileUseCaseResult.Completed)
                        {
                            callPseudoAsync(function () {
                                callbackWhenDone();
                            });

                        } else {

                            //a better way to handle this requirement isn't known at the moment
                            callPseudoAsync(function () {
                                gameEngineSelf.playUseCaseTillCompleted(currentPlayerTurnData, callbackWhenDone);
                            });
                        }

                    });

                });
        }

        createPlayerWithNameAndProvider(name: String, tileProvider: com.dominox.internal.DominoTileProvider):
            com.dominox.internal.Player
        {
            var randomTiles: com.dominox.internal.dominoModels.DominoTile[] = tileProvider.getListOfRandomTilesOfCount(5);
            return new com.dominox.internal.Player(name, randomTiles);
        }


        createTileView(): com.dominox.internal.TileBoardView {
            return null;
        }

        createTileBoard(): com.dominox.internal.TileBoard {
            return null;
        }

        createUserIntentionsObserver(): com.dominox.internal.UserIntentionsObserver {
            return null;
        }

        createDominoTileProvider(): com.dominox.internal.DominoTileProvider {
            return null;
        }

        createDominoGameBasedOnName(name: String): com.dominox.internal.DominoGame {
            return null;
        }

        createPlayerTileView(): com.dominox.internal.PlayerTileListView {
            return null;
        }

        createAlertHelper(): com.dominox.internal.AlertHelper {
            return null;
        }

        createPlayerTurnHelper(): com.dominox.internal.PlayerTurnHelper {
            return null;
        }

        createPlayTileUseCase(): com.dominox.internal.useCases.playTileUseCase.PlayTileUseCase {
            return new com.dominox.internal.useCases.playTileUseCase.PlayTileUseCase();
        }

        setupTileListViewForPlayer(tileListView: com.dominox.internal.PlayerTileListView,
            player: com.dominox.internal.Player): void {
            tileListView.setOverallTileList(player.getTileList());
            tileListView.setPlayerName(player.getName());
            tileListView.setPlayerScore(0);
        }
    }
}