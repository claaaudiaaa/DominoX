(function () {
    localStorage.removeItem("isFirstGame");
})();

function play() {   
    document.getElementById('mainMenu').style.visibility = "hidden";
    document.getElementById('newGame').style.visibility = "visible";
};


function showAbout() {
    console.log("sunt in about");
    document.getElementById('mainMenu').style.visibility = "hidden";
    document.getElementById('about').style.visibility = "visible";
}

function restore() {
    var resumeBtn = document.getElementById('resume');
    var resumeGameDiv = document.getElementById('resumeGame');
    resumeGameDiv.style.visibility = "visible";


    document.getElementById('mainMenu').style.visibility = "hidden";


    var buttonsList = document.getElementById("buttons");

    removeChildrenOfElement(buttonsList);

    var itemsInLocalStorage = dominox.getAllLocalGameStates();
    
    for(var i=0; i<itemsInLocalStorage.length; i++)
    {
        var state = itemsInLocalStorage[i];
        var obj = JSON.parse(state);

        var li = document.createElement("li");
        
        var title = obj.firstPlayerName + ", " + obj.secondPlayerName;
        var date = obj.timeAndDate;

        console.log(obj);

        var innerHTML = "<button type=\"button\"><strong>" + title + "</strong><br><strong>" + date + "</strong>\
                                </button>";

        li.onclick = createCallbackForButtonForState(state);

        li.innerHTML = innerHTML;

        buttonsList.appendChild(li);
    }

};

function createCallbackForButtonForState(state)
{
    return function(event)
    {
        startGameWithLastSessionState(state);
    }
}

function viewScores() {
    var scoresBtn = document.getElementById('viewScores');
     document.getElementById('scoresList').innerHTML = '';


    var scoreList = dominox.getScoreList();

    for (var i = 0; i < scoreList.length; i++)
    {
        var scoreString = scoreList[i];
        var li = document.createElement('li');
        li.innerHTML = scoreString;

        document.getElementById('scoresList').appendChild(li);
    }
    document.getElementById('scores').style.visibility = "visible";
    document.getElementById('mainMenu').style.visibility = "hidden";
};




function removeChildrenOfElement(elem)
{
    while (elem.hasChildNodes())
        elem.removeChild(elem.lastChild);
}

function goToInsertPlayers() {
    document.getElementById('insertPlayers').style.visibility = "visible";
    document.getElementById('newGame').style.visibility = "hidden";
    var startGameBtn = document.getElementById('startGameBtn');
    var errMsg = document.createElement('p');
    errMsg.innerHTML = "Please insert names."
    errMsg.style.color = "red";
    var errorCreated = 0;
    
    startGameBtn.addEventListener('click', function (e) {
        window.firstName = document.getElementById('firstName').value;
        window.secondName = document.getElementById('secondName').value;

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
    document.getElementById('about').style.visibility = "hidden";
}

function startGame() {
    document.getElementById('mainMenu').style.visibility = "hidden";
    document.getElementById('scores').style.visibility = "hidden";
    document.getElementById('newGame').style.visibility = "hidden";
    document.getElementById('resumeGame').style.visibility = "hidden";
    document.getElementById('insertPlayers').style.visibility = "hidden";
    $('.backgroundImage').load("gamePage.html");
}


function startGameWithLastSessionState(sessionState)
{
    window.startWithSessionState = sessionState;
    startGame();
}

function playerChoseMuggins()
{
    window.gameName = "Muggins";
    goToInsertPlayers();
}

function playerChoseDummy()
{
    window.gameName = "Dummy";
    goToInsertPlayers();
}