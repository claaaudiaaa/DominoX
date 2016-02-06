(function () {

    console.log("adding jquery");
    var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(newscript);
    console.log("jquery adaugat");

    canvas = document.getElementById("canv");
    ctx = canvas.getContext("2d");

    var src = "../images/tile2-2.png";
    draw(src, 15, 15);

    var src = "../images/tile3-5.png";
    draw(src, 28, 15);
})();

function draw(src, positionX, positionY) {
    
    var h = "35px";
    var w = "12px";
    var img = document.createElement('img');
    img.setAttribute('src', src);
    //img.style.height = '25px';
    //img.style.width = '12px';
    img.setAttribute("height", h);
    //img.style.height = h;
    img.setAttribute('width', w);
    //img.css({ height: "25px", width: "12px" });
    //console.log(document.getElementsByTagName('img')[0]);
    console.log(img);
    //document.getElementsByTagName('img')[0].css("height", h);
    img.onload = function () {
        ctx.drawImage(img, positionX, positionY);
       
        console.log("on load");
    }
}