/// <reference path = "GameEngineMatchParameters.ts"/>
/// <reference path="../internal/score.ts" />
var dominox;
(function (dominox) {
    function registerStateInLocalStorage(state) {
        if (localStorage != undefined) {
            var nextKey = getNextAvailableKeyOnStates();
            localStorage.setItem(nextKey, state);
        }
    }
    dominox.registerStateInLocalStorage = registerStateInLocalStorage;
    function getNextAvailableKeyOnStates() {
        var lastNumber = localStorage.getItem("localStorageLastIndex");
        if (lastNumber == undefined) {
            lastNumber = "0";
        }
        else {
            var num = Number(lastNumber);
            num++;
            lastNumber = "" + num;
        }
        localStorage.setItem("localStorageLastIndex", lastNumber);
        return "dominoxState" + lastNumber;
    }
    function getStateForId(stateId) {
        return localStorage.getItem(stateId);
    }
    dominox.getStateForId = getStateForId;
    function getAllLocalGameStates() {
        var result = [];
        var localStorageLastIndex = localStorage.getItem("localStorageLastIndex");
        if (localStorageLastIndex != undefined && localStorageLastIndex != null) {
            var num = Number(localStorageLastIndex);
            for (var i = num; i >= 0; i--) {
                var stateId = "dominoxState" + i;
                var state = getStateForId(stateId);
                result.push(state);
            }
        }
        return result;
    }
    dominox.getAllLocalGameStates = getAllLocalGameStates;
    function savePlayerScores(firstPlayer, secondPlayer) {
        var score = new dominox.Score(firstPlayer.getName(), secondPlayer.getName(), firstPlayer.getScore(), secondPlayer.getScore());
        var scoreString = score.toString();
        var key = getNextAvailableKeyOnScores();
        localStorage.setItem(key, scoreString);
    }
    dominox.savePlayerScores = savePlayerScores;
    function getScoreList() {
        var result = [];
        var localStorageLastIndex = localStorage.getItem("localStorageLastIndexScores");
        if (localStorageLastIndex != undefined) {
            var num = Number(localStorageLastIndex);
            for (var i = num; i >= 0; i--) {
                var key = "dominoScore" + i;
                var scoreString = localStorage.getItem(key);
                result.push(scoreString);
            }
        }
        return result;
    }
    dominox.getScoreList = getScoreList;
    function getNextAvailableKeyOnScores() {
        var lastNumber = localStorage.getItem("localStorageLastIndexScores");
        if (lastNumber == undefined) {
            lastNumber = "0";
        }
        else {
            var num = Number(lastNumber);
            num++;
            lastNumber = num + "";
        }
        localStorage.setItem("localStorageLastIndexScores", lastNumber);
        return "dominoScore" + lastNumber;
    }
})(dominox || (dominox = {}));
//# sourceMappingURL=localstorageparametersrepository.js.map