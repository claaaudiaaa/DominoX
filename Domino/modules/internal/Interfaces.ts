/// <reference path="dominoModels/DominoTile.ts"/>
/// <reference path="Player.ts"/>

module com.dominox.internal {
    export interface TileBoardView
    {
        drawTileAsNeighbourOfTileFromBoard(tile: dominoModels.DominoTile, neighbour: dominoModels.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback);

        highlightListOfTilesFromBoard(tiles: dominoModels.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void;

        displayAsNormal(callbackWhenDone: VoidCallback);
    }

    export interface PlayerTileListView
    {
        setPlayerName(playerName: String);
        setPlayerScore(playerScore: number);

        setOverallTileList(tileList: dominoModels.DominoTile[]);
        displayTileAsSelected(tile: dominoModels.DominoTile, callbackWhenDone: VoidCallback): void;
        removeTile(tile: dominoModels.DominoTile, callbackWhenDone: VoidCallback);

        displayAsNormal(callbackWhenDone: VoidCallback): void;
        setInvisible(callbackWhenDone: VoidCallback);
        setVisible(callbackWhenDone: VoidCallback);
    }

    export interface TileBoard {
        addTileAsNeighbourToTile(tile: dominoModels.DominoTile, neighbourTile: dominoModels.DominoTile): void;
        addFirstTile(tile: dominoModels.DominoTile): void;
    }

    export interface DominoGame {
        getNeighbourListForTileFromBoard(tile: dominoModels.DominoTile, board: TileBoard): dominoModels.DominoTile[];
        playerDidAddTileAsNeighbourToTileInBoard(player: Player,
            neighbour: dominoModels.DominoTile,
            tile: dominoModels.DominoTile, board: TileBoard);

        canPlayerMakeMoveWithTileListOnBoard(playerTileList: dominoModels.DominoTile[], board: TileBoard): boolean;
    }

    export interface VoidCallback {
        (): void
    }

    export interface TileCallback {
        (tile: dominoModels.DominoTile): void
    }

    export interface UserIntentionsObserver {
        setCallbackCaseWhenSelectingTileFromBoard(selectedTileCallback: TileCallback): void;
        setCallbackCaseWhenSelectingTileFromPlayerTileList(selectedTileCallback: TileCallback): void;
        setCallbackCaseDefault(defaultCallback: VoidCallback): void;
    }

    export interface DominoTileProvider {
        getListOfRandomTilesOfCount(count: Number): dominoModels.DominoTile[];
        getRandomTile(): dominoModels.DominoTile;
    }

    export interface AlertHelper {
        displayOkAlertWithMessage(message: String, callbackWhenDone: VoidCallback);
    }

    export interface PlayerTurnHelper
    {
        replenishTilesSoPlayerCanMakeMove(player: com.dominox.internal.Player,
            playerTileListView: PlayerTileListView,
            dominoGame: DominoGame,
            tileBoard: TileBoard,
            callbackWhenDone: VoidCallback): void;

    }
}