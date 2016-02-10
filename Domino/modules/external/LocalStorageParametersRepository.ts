/// <reference path = "GameEngineMatchParameters.ts"/>
/// <reference path="../internal/score.ts" />

module dominox
{
    export function registerStateInLocalStorage(state: string)
    {
        if (localStorage != undefined)
        {
            var nextKey = getNextAvailableKeyOnStates();
            localStorage.setItem(nextKey, state);
        }
    }




    function getNextAvailableKeyOnStates(): string
    {
        var lastNumber: string = localStorage.getItem("localStorageLastIndex");

        if (lastNumber == undefined) {
            lastNumber = "0";
        }
        else
        {
            var num: number = Number(lastNumber);
            num++;
            lastNumber = "" + num;
        }

        localStorage.setItem("localStorageLastIndex", lastNumber);

        return "dominoxState" + lastNumber;
    }


    export function getStateForId(stateId: string): string
    {
        return localStorage.getItem(stateId);
    }


    export function getAllLocalGameStates(): any[] {

        var result: any[] = [];

        var localStorageLastIndex: string = localStorage.getItem("localStorageLastIndex");
        if (localStorageLastIndex != undefined && localStorageLastIndex != null)
        {
            var num: number = Number(localStorageLastIndex);
            for (var i = num; i >= 0; i--)
            {
                var stateId = "dominoxState" + i;
                var state = getStateForId(stateId);
                result.push(state);
            }
        }

        return result;
    }


    export function savePlayerScores(firstPlayer: Player, secondPlayer: Player)
    {
        var score = new Score(firstPlayer.getName(), secondPlayer.getName(),
            firstPlayer.getScore(), secondPlayer.getScore());

        var scoreString: string = score.toString();

        var key = getNextAvailableKeyOnScores();
        localStorage.setItem(key, scoreString);
    }

    export function getScoreList(): any[]
    {
        var result: any[] = [];

        var localStorageLastIndex: string = localStorage.getItem("localStorageLastIndexScores");
        if (localStorageLastIndex != undefined)
        {
            var num: number = Number(localStorageLastIndex);

            for (var i = num; i >= 0; i--)
            {
                var key = "dominoScore" + i;
                var scoreString: string = localStorage.getItem(key);

                result.push(scoreString);
            }
        }

        return result;
    }

    function getNextAvailableKeyOnScores(): string
    {
        var lastNumber: string = localStorage.getItem("localStorageLastIndexScores");
        if (lastNumber == undefined) {
            lastNumber = "0";
        }
        else
        {
            var num: number = Number(lastNumber);
            num++;
            lastNumber = num + "";
        }

        localStorage.setItem("localStorageLastIndexScores", lastNumber);

        return "dominoScore" + lastNumber;
    }


}