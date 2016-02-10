(function () {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1515543595417415',
            xfbml: true,
            version: 'v2.5'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    var fbShareBtn = document.getElementById("shareBtn");
    var closeBtn = document.getElementById("closeBtn");
    var close = document.getElementById("close");

    closeBtn.addEventListener('click', function (e) {
        $('.backgroundImage').load('index.html');
    });
    close.addEventListener('click', function (e) {
        $('.backgroundImage').load('index.html');
    });
    fbShareBtn.addEventListener('click', function (e) {
        var msgFB = document.getElementById("msgFb").textContent;

        alert("FB BUTTON WAS PRESSED");
        console.log("msgfb =" + msgFB.textContent);
        e.preventDefault();
        FB.login(function () {
            FB.api('/me/feed', 'post', { message: msgFB });
        }, { scope: 'publish_actions' });
        $('.backgroundImage').load('index.html');
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    var gameEngine = new dominox.GameEngine();
    if (gameEngine == null) {
        console.log("GAME ENGINE IS NULL WTF");
    }

    window.gameEngine = gameEngine;
    var gameEngineParameters = new dominox.GameEngineParameters();

    if (window.startWithSessionState != undefined)
    {
        gameEngine.runWithSerializedState(window.startWithSessionState);
    }
    else {

        gameEngineParameters.firstPlayerName = window.firstName;
        gameEngineParameters.secondPlayerName = window.secondName;
        gameEngineParameters.dominoGameName = window.gameName;
        gameEngine.runWithParameters(gameEngineParameters);
    }
})();
