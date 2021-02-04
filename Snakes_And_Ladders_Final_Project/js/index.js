//Creating the Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var nop;
var size = 623;
canvas.height = size;
canvas.width = size;
canvas.style.border = '1px solid black';

function audio(path)
{
    var audio = new Audio(path);
    audio.play();
}

//reset function for multiplayer game
function reset()
{
    audio('audio/select.mp3');
    location.reload();
}

function viewInstructions()
{
    audio('audio/select.mp3');
    document.querySelector('.instructions-container').style.display = 'block';
    document.querySelector('.players-container').style.display = 'none';
}

function choosePlayers()
{
    audio('audio/select.mp3');
    document.querySelector('.instructions-container').style.display = 'none';
    document.querySelector('.players-container').style.display = 'block';
}

function playersSelected(clicked)
{  
    audio('audio/select.mp3');
    var colors = ['red', 'yellow', 'blue', 'green'];

    if (clicked == 'two-player') {
        nop = 2;
        document.querySelector('.dice-info-below').style.display = 'none';
    }
    else if (clicked == 'three-player') {
        nop = 3;
        document.getElementById('green').style.display = 'none';
        document.getElementById('blue').style.float = 'none';
        document.getElementById('blue').style.margin = '0 auto';
    }
    else
        nop = 4;
    
	for(var i = 0; i < nop; ++i)
	{
		var color = colors[i]; // get color
        players[i] = new Player(color); // player object initialize
    }

    document.querySelector('.players-container').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    bd = document.body;
    bd.style.backgroundImage = "url('images/backgroundGame.jpg')";
    
	multiPlayerShowTurn(players[0]); // start game form first player
}

renderSquareBoard();
renderSnakeLadders();

function start()
{
    diceRoll();
    rand()
    setTimeout(playMulti, 1000);
    diceFaceDisplay();
    audio('audio/dice-roll.mp3')
}