(function () {

    //document.getElementById('firstName').innerHTML = firstName;
    //document.getElementById('secondName').innerHTML = secondName;
    //endGame();
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

function endGame(winner, loser) {
    winner = "Vasilica";
    loser = "Gigel";
    $('#playArea').load("endGameModal.html");
}