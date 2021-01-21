var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth=400;
var canvasHeight=580;
var screenWidth=window.innerWidth;
var w;

var base = new Image(); 
var bg = new Image();
var bgimg = new Image(); 
var pipeTopG = new Image(); 
var pipeBottomG = new Image(); 
var ym = new Image(); 


var bird = new Image(); 
var pipeTop = new Image();
var pipeBottom = new Image();

base.src = "images/base.png";
bgimg.src = "images/background.png";
pipeTopG.src = "images/pipe-green-up.png";
pipeBottomG.src = "images/pipe-green-down.png";
ym.src = "images/yellowbird.png";

canvas.width = canvasWidth;
canvas.height = canvasHeight;
w = (screenWidth/2) - screenWidth*0.135;

var b=0;
var birdColor = Math.random(); 
var baseWidth = 336; 
var baseHeight = 112; 
var bx = 40; 
var by = 40; 
var dy = 55; 
var g = 1.8; 
var pipeDist = 450;
var px = 51; 
var py = 317; 
var pdx = 1; 
var score = 0;
var x = 80;  
var y = 260;  

var birdArray = new Array(); 
var pipeArray = [];
var pause = false;

function bgSelector(){
		bg = bgimg;
}

function birdColorSelector(){
		bird = ym;
}

function pipeSelector(){
		pipeTop = pipeTopG;
		pipeBottom = pipeBottomG;
}

function birdFramesInitialiser(){
	birdArray[0] = new Image();
	birdArray[0] = bird;
}

function pipe(p,q){
	this.p = p;
	this.q = q;

	this.update = function(){
		if(this.p <= -px){
			this.p = (canvasWidth-px)+20;
			this.q = -1*(Math.random()*170);
		}
	}

	this.collide = function(){
		if ((x + bx >= this.p) && (x <= (this.p + px)) && (y <= (this.q + py)))
		{ 
			pause=true;	
		}
		else if( (x+bx>=this.p) && (x<=(this.p+px)) && (y+by>=(this.q+pipeDist)) ) {	  
			pause=true;	
		}
		else if( (y+by) >= (canvasHeight-baseHeight) ) {   
			pause=true;	
		}
	}
	this.score = function(){

		if(x==(this.p+px) && (y>(this.q+py)) && (y<(this.q+pipeDist))) {
			score++;
		}
	}
}

function pipePosition(i){
	var p= canvasWidth+i*200; 
	var q= -1*(Math.random()*170); 
	pipeArray.push(new pipe(p,q));
}

for(i=0;i<2;i++){
	pipePosition(i);
}

function gameInitialiser(){
	bgSelector();
	birdColorSelector();
	pipeSelector();
	birdFramesInitialiser();
	ctx.fillStyle= '#000000';
	ctx.font = '25px Arial';
}

document.addEventListener('keydown',function(event){
				if(event.keyCode==32){ //Spacebar keycode
					y=y-dy;
					
				}
			}, false);

document.addEventListener('keydown',function(event){
				if(event.keyCode == 13){ //Enter keyCode
        			window.location.reload();
				}
			}, false);

function draw(){
	ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(birdArray[0],x,y,bx,by);
	for(j=0; j<pipeArray.length; j++){
		pipeArray[j].update();
		ctx.drawImage(pipeTop,pipeArray[j].p,pipeArray[j].q);
		ctx.drawImage(pipeBottom,pipeArray[j].p,pipeArray[j].q+pipeDist);
		pipeArray[j].collide();
		pipeArray[j].score();
		pipeArray[j].p-=pdx;
	}
	ctx.drawImage(base,0,canvasHeight-baseHeight,canvasWidth,baseHeight);
	ctx.fillStyle= '#000000';
	ctx.font = '25px monospace';
	ctx.fillText("Score: "+score,20,50);

	b+=0.1;
	if(b==0.3){
		b=0;
	}
	y+=g;

	if(pause==true){

			ctx.fillStyle = "#000000";
			ctx.globalAlpha = 0.6;
			ctx.fillRect(70,180,250,150);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "#FF0000";
			ctx.font = "30px monospace";
			ctx.fillText("GAME OVER",110,220);
			ctx.font = "17px Arial";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("Score : "+score,130,260);
			ctx.fillText("Press Enter to restart",130,290);
		
		return;
	}

	requestAnimationFrame(draw);
}

gameInitialiser();
draw();
