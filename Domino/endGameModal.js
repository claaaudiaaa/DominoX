(function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.setAttribute("margin", "auto");
    modal.setAttribute("position", "fixed");
    var content = document.getElementById("winner");
    content.innerHTML = "The winner of this game is " + winner + "!";

    $('#myModal').modal();
    var msgFB = " " + winner + " and " + loser + " played DominoX and " + winner + " won!";
    var fbShareBtn = document.getElementById("shareBtn");
    var closeBtn = document.getElementById("closeBtn");
    fbShareBtn.addEventListener('click', function (e) {
        console.log("vreau sa share pe fb");
        e.preventDefault();
        FB.login(function () {
            FB.api('/me/feed', 'post', { message: msgFB });
        }, { scope: 'publish_actions' });
        $('.backgroundImage').load('index.html');
    });
    closeBtn.addEventListener('click', function (e) {
        $('.backgroundImage').load('index.html');
    });
})();

