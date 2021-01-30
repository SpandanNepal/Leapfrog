//Creating the Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var squares = [];

var nop;
var size = 623;
canvas.height = size;
canvas.width = size;
canvas.style.border = '1px solid black';

function viewInst(){
    document.querySelector('.instructions-container').style.display = 'block';
    document.querySelector('.players-container').style.display = 'none';
}

function choosePlayers(){
    document.querySelector('.instructions-container').style.display = 'none';
    document.querySelector('.players-container').style.display = 'block';
}

function playersSelected(clicked)
{   
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

drawSnakesLadders(sources, function (images)
{
    ctx.drawImage(images.snakeA, 80, 25);
    ctx.drawImage(images.snakeB, 190, 320);
    ctx.drawImage(images.ladderB, 145, 400);
    ctx.drawImage(images.ladderC, 20, 140);
    ctx.drawImage(images.snakeC, 270, 120);
    ctx.drawImage(images.ladderD, 520, 330);
    ctx.drawImage(images.snakeD, 140, 70);
    ctx.drawImage(images.ladderA, 395, 20);
});

function start()
{   diceRoll();
	//disableButton("btn1");
    setTimeout(dealyPlayMulti, 1400);
	//setTimeout(enableButton("btn1"), 500);
	rollTheDice();
}