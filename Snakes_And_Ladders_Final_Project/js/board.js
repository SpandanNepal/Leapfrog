var tiles = new Array();
var players = new Array();
var size = 623;
var nop; // No of players in multiplayer game
var globalpostion = 0; // highest position occupied by any player 
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
	var boxwh = wh/10; //width of Tile
	var boxHeight = ht/10; //height of Tile
	var x1 = 0; //  co-ordinate of First Tile
	var x2 = 9 * boxwh;
	var y = 9 * boxHeight;
	var canvas=0;
	for(var i = 0; i < 10; ++i)
	{
		for(var j = 0; j < 10; ++j)
		{
			if(i % 2 == 0)
			{
				tiles[canvas++] = new Tile(x1,y,boxwh,boxHeight,canvas);
				x1 += boxwh;
			}
			else{
				tiles[canvas++] = new Tile(x2,y,boxwh,boxHeight,canvas);
				x2 -= boxwh;
			}
		}
		x1 = 0;
		x2 = 9 * boxwh;
		y -= boxHeight;
	}

	//ladders
	tiles[17].next = 38;
	tiles[8].next = 49;
	tiles[53].next = 94;
	tiles[59].next = 80;
	//tiles[20].next = 42;
	//tiles[50].next = 67;
	//tiles[71].next = 91;
	//tiles[79].next = 99;

	//snakes
	tiles[98].next = 2;
	tiles[82].next = 43;
	tiles[72].next = 16;
	tiles[43].next = 4;
	//tiles[86].next = 36;
	//tiles[92].next = 73;
	//tiles[94].next = 75;
	//tiles[97].next = 79;
}
setup();

//Function to render the square board
function renderSquareBoard() 
{        
    const colorA = "#ffffff";
    const colorB = "#feb511";

    var initRow = 1; var totalRows = 10; var initcolumn = 1; var totalColumns = 10;
    var x = 0; var y = canvas.height - size/10;
    var columnNumber = 1; var leftToRight = true;
    for (var row = initRow; row <= totalRows; row++) 
    {
        if (leftToRight) 
        {
            x = 0;
        }
        else 
        {
            x = canvas.width - size/10;
        }
        for (var column = initcolumn; column <= totalColumns; column++) 
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
            ctx.font = "12px 'Potta One', cursive";
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

// function rollTheDice() {
// 	var faceValue, output = '';
// 	faceValue = rand() - 1;
	
//     output += "&#x268" + faceValue + "; ";
//     document.getElementById('dice').innerHTML = output;
// }
// function diceRoll()
// {
// 	var dice = document.getElementById('dice-face');
// 	dice.style.transform = 'rotate(360deg)';
// 	dice.style.transition =  'all 0.9s ease-in-out 0s';
// }

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