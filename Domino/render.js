(function () {
    localStorage.removeItem("isFirstGame");
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
        console.log("key = " + localStorage.key(i));
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
    var startGameBtn = document.getElementById('startGameBtn');
    var errMsg = document.createElement('p');
    errMsg.innerHTML = "Please insert names."
    errMsg.style.color = "red";
    var errorCreated = 0;
    
    startGameBtn.addEventListener('click', function (e) {
        firstName = document.getElementById('firstName').value;
        secondName = document.getElementById('secondName').value;

        if (firstName === '' || secondName === '') {
            
            if (errorCreated == 0)
                document.getElementById('insert').appendChild(errMsg);
            else
                errorCreated = 1;
        }
        else
            startGame();
    });
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
    $('.backgroundImage').load("gamePage.html?firstPlayerName=Costin&secondPlayerName=Claudia&dominoGameName=Muggins");
}