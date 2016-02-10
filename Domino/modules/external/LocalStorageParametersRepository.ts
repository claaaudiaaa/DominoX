/// <reference path = "GameEngineMatchParameters.ts"/>

module dominox
{
    export function registerStateInLocalStorage(state: string)
    {
        if (localStorage != undefined)
        {
            var nextKey = getNextAvailableKey();
            localStorage.setItem(nextKey, state);
        }
    }


    function getNextAvailableKey(): string
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

        return "dominoxState" + lastNumber;
    }



}