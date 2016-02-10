/// <reference path = "GameEngineMatchParameters.ts"/>
var dominox;
(function (dominox) {
    function registerStateInLocalStorage(state) {
        if (localStorage != undefined) {
            var nextKey = getNextAvailableKey();
            localStorage.setItem(nextKey, state);
        }
    }
    dominox.registerStateInLocalStorage = registerStateInLocalStorage;
    function getNextAvailableKey() {
        var lastNumber = localStorage.getItem("localStorageLastIndex");
        if (lastNumber == undefined) {
            lastNumber = "0";
        }
        else {
            var num = Number(lastNumber);
            num++;
            lastNumber = "" + num;
        }
        return "dominoxState" + lastNumber;
    }
})(dominox || (dominox = {}));
//# sourceMappingURL=LocalStorageParametersRepository.js.map