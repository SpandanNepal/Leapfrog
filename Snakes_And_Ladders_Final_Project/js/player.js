class Player
{
	constructor(color)
	{
		this.position = 0; // current position
		this.pre = 0; // previous position
		this.r = 0; // random number
		this.color = color; // player color
	}
	roll(r) // update pre and positon
	{
		if (this.position == 0) {
			if (r == 6 || r == 1) {
				this.r = r;
				this.pre = this.position;
				this.position += this.r;
				if (this.position > 100)
					this.position = this.pre;
			}	
		}
		else {
			this.r = r;
			this.pre = this.position;
			this.position += this.r;
			if (this.position > 100)
				this.position = this.pre;
		}
	}
	remove(pos) // remove previous position
	{
		if((pos > 0) && (pos != this.position))
		{
			var p = tiles[pos-1];
			ctx.clearRect(p.x, p.y, p.wh, p.ht);
			if (pos % 2 == 0) {
				ctx.fillStyle = '#ffffff';
			}
			else {
				ctx.fillStyle = '#feb511';
			}
			ctx.fillRect(p.x, p.y, p.wh, p.ht);
			ctx.font = "bold 12px PottaOne-Regular";
			ctx.fillStyle = 'black';
			ctx.fillText(pos, p.x + 3, p.y - 48 + size/10);
		}
	}
	show(pos) // show updated position
	{
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
		var cur = tiles[pos-1];
		ctx.beginPath();
		ctx.arc(cur.x + 30, cur.y + 35, 20, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.closePath();
	}
	move()
	{
		if (this.position != 0) {
			this.remove(this.pre);
			//stepMovement();
			this.show(this.position);
			//check if ladder or snake present		
			if(tiles[this.position - 1].next != this.position)
			{
				this.pre = this.position;
				this.position = tiles[this.position - 1].next;
				if (this.position > this.pre) {
					audio('audio/ladder-climb.mp3');
				}
				else {
					audio('audio/snake-bite.mp3');
				}
				this.remove(this.pre);
				//stepMovement();
				this.show(this.position);
			}
		}
	}
}

function rand()
{
	randomNumber = Math.ceil(Math.random() * 6);
	return randomNumber;
}

function multiPlayerShowTurn(player) 
{
	document.getElementById("mplayer").innerHTML = player.color + "'s Turn";
}

var i = 0;
var prevTurn;
function playMulti()
{
	prevTurn = i;
	players[i].roll(randomNumber);
	players[i].move();
	playerSamePosition();
	playerScoreDisplay(i);
	for(var k = 0; k < nop; k++)
	{
		if(players[k].position > 0)
			players[k].show(players[k].position);
	}
	if(globalPosition <= players[i].position)
		globalPosition = players[i].position;
	addMoreSnakesLadders();
	if(globalPosition == 100)
	{
		audio('audio/winner.mp3');
	}
	else {
		reChance();
	}
	function newFunction() {
		return players[i].color;
	}
}

function addMoreSnakesLadders()
{
	if (globalPosition > 10) {
		drawSnakesLadders(sources, function (images)
		{
			ctx.drawImage(images.ladderE, 333, 150);
		});
	}
	if (globalPosition > 50) {
		drawSnakesLadders(sources, function (images)
		{
			ctx.drawImage(images.snakeE, 250, 200);
		});
	}
	if (globalPosition > 60) {
		drawSnakesLadders(sources, function (images)
		{
			ctx.drawImage(images.snakeF, 570, 90);
		});
	}
}

function reChance()
{
	if (randomNumber == 6) {
		audio('audio/six-roll.mp3');
		i = i;	
	}
	else {
		++i;
		if (i == nop) {
			i = 0;
		}
		multiPlayerShowTurn(players[i]);
	}
}

function getSixOne(){
	if (players[i].position == 0) {
		document.getElementById('1or6').innerHTML = 'Roll a 6 or 1 to start';
	}
	else {
		document.getElementById('1or6').innerHTML = '';
	}
}

function playerSamePosition()
{
	var counter = 0;
	while (counter < nop) {
		for (var i = 0; i < nop; i++){
			if (counter == i) {
				continue;
			}
			else {
				if (players[counter].position == players[i].position) {
					if (players[counter].position != 0) {
						if (counter == prevTurn) {
							players[i].position = 0;
							playerScoreDisplay(i);
							audio('audio/snake-bite.mp3');
						}
						else {
							players[counter].position = 0;
							playerScoreDisplay(counter);
							audio('audio/snake-bite.mp3');
						}
					}
				}
			}
		}
		counter += 1;
	}
}

function playerScoreDisplay(val)
{
	if (players[val].color == 'red') {
		document.getElementById('red').innerHTML = players[val].position;	
	}
	else if (players[val].color == 'yellow') {
		document.getElementById('yellow').innerHTML = players[val].position;
	}
	else if (players[val].color == 'blue') {
		document.getElementById('blue').innerHTML = players[val].position;
	}
	else {
		document.getElementById('green').innerHTML = players[val].position;
	}
}