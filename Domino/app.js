(function () {

    var gameEngine = new dominox.GameEngine();
    if (gameEngine == null) {
        console.log("GAME ENGINE IS NULL WTF");
    }

    window.gameEngine = gameEngine;
    var gameEngineParameters = new dominox.GameEngineParameters();
    gameEngineParameters.firstPlayerName = "FirstPlayer";
    gameEngineParameters.secondPlayerName = "SecondPlayer";
    gameEngine.runWithParameters(gameEngineParameters);

    var canvas = document.getElementById("canv");
    var gl = canvas.getContext("experimental-webgl") || canvas.getContext("webgl") ||
        canvas.getContext("moz-webgl") || canvas.getContext("webkit-3d");

    if (gl) {

        var extensions = gl.getSupportedExtensions();
        //console.log(gl);
        //console.log(extensions);

    }
    else {
       
        console.log("Browser does not support webgl");
        
    }
    var context = canvas.getContext("2d");
    var img = new Image();
    
    img.src = "../images/tile6-6.png";
    //console.log("creating webgl");
    //console.log(img);
    context.drawImage(img, 10, 10);
    
    //cubeTexture = context.createTexture();
    
    //cubeImage = new Image();
    //cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
    
    //cubeImage.src = "../images/tile6-6.png";



})();



function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

}
 
function draw() {

    
}