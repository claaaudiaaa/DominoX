(function () {
    //document.getElementById('firstName').innerHTML = firstName;
    //document.getElementById('secondName').innerHTML = secondName;
    //endGame();
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
    gameEngineParameters.firstPlayerName = "Costin";//getUrlParameter("firstPlayerName");
    gameEngineParameters.secondPlayerName = "Claudia";//getUrlParameter("secondPlayerName");
    gameEngineParameters.dominoGameName = "Muggins";//getUrlParameter("dominoGameName");

    gameEngine.runWithParameters(gameEngineParameters);
   
})();


function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

}

function share() {
    console.log("is in share fct");
    var msgFm = document.getElementById("msgFb");
    $('.backgroundImage').load('index.html');
    FB.login(function () {
        FB.api('/me/feed', 'post', { message: msgFB });
    }, { scope: 'publish_actions' });
}

function endGame(winner, loser) {
    winner = "Vasilica";
    loser = "Gigel";
    $('#playArea').load("endGameModal.html");
}