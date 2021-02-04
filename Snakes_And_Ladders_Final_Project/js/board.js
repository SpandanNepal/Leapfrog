var tiles = new Array();
var players = new Array();
var size = 623;
var nop; // No of players in multiplayer game
var globalPosition = 0; // highest position occupied by any player 
var randomNumber;

class Tile{
	constructor(x,y,wh,ht,next){
		this.x = x; // x co-ordinate of Tile
		this.y = y; // y co-ordinate of Tile
		this.wh = wh; // width of Tile
		this.ht = ht; // height of Tile
		this.next = next; // next Tile
	}
}

function setup()
{
	var wh = size; // width of Board
	var ht = size; // height of Board
	var boxwidth = wh/10; //width of Tile
	var boxHeight = ht/10; //height of Tile
	var x1 = 0; //  co-ordinate of First Tile
	var x2 = 9 * boxwidth;
	var y = 9 * boxHeight;
	var counter=0;
	for(var i = 0; i < 10; ++i)
	{
		for(var j = 0; j < 10; ++j)
		{
			if(i % 2 == 0)
			{
				tiles[counter++] = new Tile(x1,y,boxwidth,boxHeight,counter);
				x1 += boxwidth;
			}
			else{
				tiles[counter++] = new Tile(x2,y,boxwidth,boxHeight,counter);
				x2 -= boxwidth;
			}
		}
		x1 = 0;
		x2 = 9 * boxwidth;
		y -= boxHeight;
	}
}
setup();

//Function to render the square board
function renderSquareBoard() 
{        
    const colorA = "#ffffff";
    const colorB = "#feb511";

    var initialRow = 1; var totalRows = 10; var initialColumn = 1; var totalColumns = 10;
    var x = 0; var y = canvas.height - size/10;
    var columnNumber = 1; var leftToRight = true;
    for (var row = initialRow; row <= totalRows; row++) 
    {
        if (leftToRight) 
        {
            x = 0;
        }
        else 
        {
            x = canvas.width - size/10;
        }
        for (var column = initialColumn; column <= totalColumns; column++) 
        {
            if (columnNumber % 2 == 0) 
            {
                ctx.fillStyle = colorA;
            }
            else 
            {
                ctx.fillStyle = colorB;
            }
            ctx.fillRect(x, y, size/10, size/10);
            squares[columnNumber] = x.toString() + ',' + y.toString();
            ctx.font = "bold 12px PottaOne-Regular";
            ctx.fillStyle = "black";
            ctx.fillText(columnNumber, x+3, y - 48 + size/10);

            //var x1, y1;
            if (leftToRight) 
            {
                x += size/10;

                x1 = x + (size/10 / 2);
            }
            else 
            {
                x -= size/10;
                x1 = x - (size/10 / 2);
            }
            y1 = y - (size/10 / 2);
            columnNumber++;
        }
        y -= size/10;
        leftToRight = !leftToRight;
    }
}

function snakesLaddersPosition()
{
	//ladders
	tiles[17].next = 38;
	tiles[8].next = 49;
	tiles[53].next = 94;
	tiles[59].next = 80;
	tiles[25].next = 86;

	//snakes
	if (globalPosition % 2 == 0) {
		tiles[98].next = 2;
		tiles[43].next = 4;
		tiles[96].next = 97
		tiles[41].next = 42;
	}
	else {
		tiles[96].next = 4;
		tiles[41].next = 2;
		tiles[98].next = 99;
		tiles[43].next = 44;
	}
	tiles[82].next = 43;
	tiles[72].next = 16;
	
	tiles[64].next = 34;
	tiles[89].next = 31;
}

function diceRoll()
{
	var dice = document.getElementById('dice-face');
	dice.classList.add('dice-rotate');
	setTimeout(function() {
		dice.classList.remove('dice-rotate');
	}, 900);
}

function diceFaceDisplay() {
	var faceValue = rand();
	var diceFace = document.getElementById('dice-face');
	setTimeout(function() {
		if (faceValue == 1) {
			diceFace.src = 'images/face-1.png';
		}
		else if (faceValue == 2) {
			diceFace.src = 'images/face-2.png'
		}
		else if (faceValue == 3) {
			diceFace.src = 'images/face-3.png'
		}
		else if (faceValue == 4) {
			diceFace.src = 'images/face-4.png'
		}
		else if (faceValue == 5) {
			diceFace.src = 'images/face-5.png'
		}
		else {
			diceFace.src = 'images/face-6.png'
		}
	}, 900);
}