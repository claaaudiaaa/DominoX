/// <reference path="dominoModels/DominoTile.ts"/>
/// <reference path="Player.ts"/>

module dominox {


    export interface TileBoardView
    {
        drawTileAsNeighbourOfTileFromBoard(tile: dominox.DominoTile, neighbour: dominox.DominoTile,
            board: TileBoard, callbackWhenDone: VoidCallback);

        highlightListOfTilesFromBoard(tiles: dominox.DominoTile[], board: TileBoard,
            callbackWhenDone: VoidCallback): void;

        displayAsNormalTileBoard(tileBoard: TileBoard, callbackWhenDone: VoidCallback);
    }

    export interface PlayerTileListView
    {
        setPlayerName(playerName: String);
        setPlayerScore(playerScore: number);

        setAndDisplayOverallTileList(tileList: dominox.DominoTile[], callbackWhenDone: VoidCallback);
        displayTileAsSelected(tile: dominox.DominoTile, callbackWhenDone: VoidCallback): void;
        removeTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback);
        addTile(tile: dominox.DominoTile, callbackWhenDone: VoidCallback);

        displayAsNormal(callbackWhenDone: VoidCallback): void;
        setInvisible(callbackWhenDone: VoidCallback);
        setVisible(callbackWhenDone: VoidCallback);
    }

    export interface TileBoard {
        addTileAsNeighbourToTile(tile: dominox.DominoTile, neighbourTile: dominox.DominoTile): void;
        addFirstTile(tile: dominox.DominoTile): void;
        getTileList(): dominox.DominoTile[];
        getExternalTilesListMatchingTile(tile: dominox.DominoTile): dominox.DominoTile[];
        getExternalTiles(): dominox.DominoTile[];
        getSpinner(): dominox.DominoTile;
    }

    export interface DominoGame {
        getNeighbourListForTileFromBoard(tile: dominox.DominoTile, board: TileBoard): dominox.DominoTile[];
        playerDidAddTileAsNeighbourToTileInBoard(player: Player,
            neighbour: dominox.DominoTile,
            tile: dominox.DominoTile, board: TileBoard);

        isGameOverWithPlayersAndBoard(firstPlayer: Player, secondPlayer: Player, board: TileBoard): boolean;

        canPlayerMakeMoveWithTileListOnBoard(playerTileList: dominox.DominoTile[], board: TileBoard): boolean;
    }

    export interface VoidCallback {
        (): void
    }

    export interface TileCallback {
        (tile: dominox.DominoTile): void
    }

    export interface UserIntentionsObserver {
        setCallbackCaseWhenSelectingTileFromBoard(selectedTileCallback: TileCallback): void;
        setCallbackCaseWhenSelectingTileFromPlayerTileList(selectedTileCallback: TileCallback): void;
        setCallbackCaseDefault(defaultCallback: VoidCallback): void;
    }

    export interface DominoTileProvider {
        getListOfRandomTilesOfCount(count: Number): dominox.DominoTile[];
        getRandomTile(): dominox.DominoTile;
    }

    export interface AlertHelper {
        displayOkAlertWithMessage(message: String, callbackWhenDone: VoidCallback);
    }

    export interface PlayerTurnHelper
    {
        replenishTilesSoPlayerCanMakeMove(player: dominox.Player,
            playerTileListView: PlayerTileListView,
            dominoGame: DominoGame,
            tileBoard: TileBoard,
            tileProvider: DominoTileProvider,
            callbackWhenDone: VoidCallback): void;

    }

    export interface TileMatrixPresenter
    {
        presentTileBoardAsTileMatrix(board: TileBoard): Array<Array<DominoTile>>;
    }

    export function callIfNotNull(callback: VoidCallback)
    {
        if (callback != null)
            callback();
    }

    export function stringifyTileList(tileList: dominox.DominoTile[]): String {
        var str: String = "";

        for (var i = 0; i < tileList.length; i++)
        {
            var tile = tileList[i];
            str = str + " " + tile.toString() + ",";
        }
        return str;
    }

    export function randomIntFromInterval(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    export function callPseudoAsync(fun: dominox.VoidCallback) {
        setTimeout(function () {
            fun();
        }, 1);
    }

    export enum TileMatchType {
        FirstFirst,
        FirstSecond,
        SecondFirst,
        SecondSecond,
        NoMatch
    }

    export function getTilesMatchType(first: dominox.DominoTile, second: dominox.DominoTile): TileMatchType {
        var tileOne = first;
        var tileTwo = second;

        // first == first
        if (tileOne.getBone().getFirst() == tileTwo.getBone().getFirst())
            return TileMatchType.FirstFirst;
        //first - second
        if (tileOne.getBone().getFirst() == tileTwo.getBone().getSecond())
            return TileMatchType.FirstSecond;
        //second - first
        if (tileOne.getBone().getSecond() == tileTwo.getBone().getFirst())
            return TileMatchType.SecondFirst;
        //second - second
        if (tileOne.getBone().getSecond() == tileTwo.getBone().getSecond())
            return TileMatchType.SecondSecond;

        return TileMatchType.NoMatch;
    }

    export function tileHastMatchOnFirstOnTile(tileA: dominox.DominoTile, tileB: dominox.DominoTile): boolean
    {
        var matchType = getTilesMatchType(tileA, tileB);
        return matchType == TileMatchType.FirstFirst || matchType == TileMatchType.SecondFirst;
    }

    export function tileHasMatchOnSecondOnTile(tileA: dominox.DominoTile, tileB: dominox.DominoTile): boolean {
        var matchType = getTilesMatchType(tileA, tileB);
        return matchType == TileMatchType.FirstSecond || matchType == TileMatchType.SecondSecond;
    }

    export  function  getMatchableTilesForTile(tile: dominox.DominoTile, tileList: dominox.DominoTile[]): dominox.DominoTile[]
    {
        var matchableTiles: dominox.DominoTile[] = [];

        for (var i = 0; i < tileList.length; i++) {
            var iTile = tileList[i];
            if (dominox.getTilesMatchType(iTile, tile) != dominox.TileMatchType.NoMatch)
                matchableTiles.push(iTile);
        }
        return matchableTiles;
    }

    export function getRotationAngleInDegreesForTile(tile: DominoTile): number
    {
        //the tile image is drawn as according to Vertical First Up Second Down
        var orientation = tile.getOrientation();

        switch (orientation) {
            case DominoTileOrientation.HorizontalFirstLeftSecondRight:
                return -90; break;
            case DominoTileOrientation.HorizontalSecondLeftFirstRight:
                return 90; break;
            case DominoTileOrientation.VerticalFirstUpSecondDown:
                return 0; break;
            case DominoTileOrientation.VerticalSecondUpFirstDown:
                return 180; break;
        }

        return 0;
    }

    export function getImageForTileFromContainer(tile: DominoTile,
        container: HTMLDivElement): HTMLImageElement
    {
        var imageClassName: string = "" + tile.getBone().getFirst() + "-" + tile.getBone().getSecond();
        var elements = container.getElementsByClassName(imageClassName);
        var image: HTMLImageElement = <HTMLImageElement>elements[0];

        //console.log("image class name " + imageClassName);

        return <HTMLImageElement>image.cloneNode(true);
    }

    export function removeAllChildNodesOfElement(elem: HTMLElement)
    {
        while (elem.hasChildNodes())
            elem.removeChild(elem.lastChild);
    }


}