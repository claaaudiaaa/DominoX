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
    var gl;
        //= canvas.getContext("experimental-webgl") || canvas.getContext("webgl") ||
        //canvas.getContext("moz-webgl") || canvas.getContext("webkit-3d");

    if (gl) {

        //var extensions = gl.getSupportedExtensions();
        //console.log(gl);
        //console.log(extensions);

    }
    else {
       
        console.log("Browser does not support webgl");
        
    }
    var context = canvas.getContext("2d");
    
    var imageContainer = document.getElementById("ImagesContainer");
    var image = imageContainer.getElementsByClassName("1-5")[0];

    context.rect(0, 0, 100, 100);
    context.fill();

    var callback = function (event)
    {
        if (!image) image = this;
        context.drawImage(image, 50, 50);
    };

    if(image.complete)
    {
        callback(image);
    }else
    {
        image.onload = callback;
    }

    //context.drawImage(image, 10, 10, 100, 100);
   
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