(function () {
    console.log("adding jquery");
    var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(newscript);
    var score = new dominox.Score("vasilica", "gigel", 3, 6);
    localStorage.setItem("score", score.toString());
    localStorage.setItem("score1", score.toString());
})();


function play() {
    var playBtn = document.getElementById('play');
    document.getElementById('mainMenu').style.visibility = "hidden";
    document.getElementById('newGame').style.visibility = "visible";
};


function restore() {
    var resumeBtn = document.getElementById('resume');
    document.getElementById('resumeGame').style.visibility = "visible";
    document.getElementById('mainMenu').style.visibility = "hidden";
};


function viewScores() {
    var scoresBtn = document.getElementById('viewScores');
    document.getElementById('scoresList').innerHTML = '';

    for (var i = 0; i < localStorage.length; i++) {
        
        var li = document.createElement('li');
        li.innerHTML = localStorage.getItem(localStorage.key(i));
        document.getElementById('scoresList').appendChild(li);
    }
    document.getElementById('scores').style.visibility = "visible";
    document.getElementById('mainMenu').style.visibility = "hidden";
};

function goToInsertPlayers() {
    document.getElementById('insertPlayers').style.visibility = "visible";
    document.getElementById('newGame').style.visibility = "hidden";
}

function goToMainMenu() {
    document.getElementById('mainMenu').style.visibility = "visible";
    document.getElementById('scores').style.visibility = "hidden";
    document.getElementById('newGame').style.visibility = "hidden";
    document.getElementById('resumeGame').style.visibility = "hidden";
    document.getElementById('insertPlayers').style.visibility = "hidden";
}

function startGame() {
    document.getElementById('mainMenu').style.visibility = "hidden";
    document.getElementById('scores').style.visibility = "hidden";
    document.getElementById('newGame').style.visibility = "hidden";
    document.getElementById('resumeGame').style.visibility = "hidden";
    document.getElementById('insertPlayers').style.visibility = "hidden";
    $('.backgroundImage').load("gamePage.html");
}