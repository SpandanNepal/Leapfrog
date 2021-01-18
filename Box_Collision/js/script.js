function Play(totalBalls, ballSize){
  this.totalBalls = totalBalls;
  this.ballSize = ballSize;
  this.balls = [];

  this.boxWrapper = document.getElementById('box_wrapper'); 
}

Play.prototype.createBoxContainer = function (){
  this.boxContainer = document.createElement('div');
  this.boxContainer.classList.add('box_container');
  this.boxWrapper.appendChild(this.boxContainer);

  var boxContainerStyle = getComputedStyle(this.boxContainer);
  this.containerWidth = parseInt(boxContainerStyle.width);
  this.containerHeight = parseInt(boxContainerStyle.height);
};

function randInt(minVal, maxVal) {
  return Math.floor(Math.random() * (Math.floor(maxVal) - Math.floor(minVal)));
}

Play.prototype.createBall = function() {
  while (this.balls.length < this.totalBalls) {
    var ballr = parseInt(this.ballSize)
    var top = randInt(10, this.containerHeight - ballr * 2);
    var left = randInt(10, this.containerWidth - ballr * 2);
    var randDirection = randInt(0, 360);
    var ball = new Ball(this.boxContainer, top, left, ballr, randDirection);

    ball.ballStart();
    this.balls.push(ball);
  }
};

Play.prototype.moveInterval = function() {
  setInterval(this.moveBall.bind(this), 1000 / 60);
};

Play.prototype.moveBall = function() {
  for (var i = 0; i < this.balls.length; i++) {
    //if ball collide with the container
    if (this.balls[i].top < 0 || this.balls[i].left < 0 || this.balls[i].left > this.containerWidth - this.balls[i].r * 2 || this.balls[i].top > this.containerHeight - this.balls[i].r * 2) {
      this.balls[i].bounceDirection = Math.abs(this.balls[i].bounceDirection + 90);
    }

    for (var j = 0; j < this.balls.length; j++) {
      //if balls collide they move in opposite direction
      if (this.balls[i] != this.balls[j]) {
        var dx = this.balls[i].xCenter - this.balls[j].xCenter;
        var dy = this.balls[i].yCenter - this.balls[j].yCenter;
        var distance = Math.sqrt(dx**2 + dy**2);

        if (distance <= this.balls[i].r + this.balls[j].r) {
          this.balls[i].bounceDirection = Math.abs(this.balls[i].bounceDirection + 90); 
          this.balls[j].bounceDirection = Math.abs(this.balls[j].bounceDirection + 90);
        }
      }
    }
    this.balls[i].move();
  }
};

//Ball creation
function Ball(pElement, top, left, r, bounceDirection) {
  this.pElement = pElement;
  this.top = top;
  this.left = left;
  this.r = r;
  this.xCenter = left;
  this.yCenter = top;
  this.bounceDirection = bounceDirection;

  this.ballElement = document.createElement('div');
}

Ball.prototype.ballStart = function() {
  this.ballElement.classList.add('box');
  this.ballElement.style.width = 2 * this.r + 'px';
  this.ballElement.style.height = 2 * this.r + 'px';
  this.ballElement.style.backgroundColor = '#FFA500'
  this.pElement.appendChild(this.ballElement);

  this.draw();
  return this.ballElement;
};

Ball.prototype.draw = function() {
  this.ballElement.style.top = this.top + 'px';
  this.ballElement.style.left = this.left + 'px';
};
//adding the ball speed - idea taken from stackoverflow
Ball.prototype.move = function ()
{
  this.left += 2 * Math.cos((this.bounceDirection / 180) * 3.1415); 
  this.top += 2 * Math.sin((this.bounceDirection / 180) * 3.1415);

  this.xCenter = this.left; 
  this.yCenter = this.top;
  this.draw();
};

Play.prototype.start = function() {
  this.createBoxContainer();
  this.createBall();
  this.moveInterval();
};

//container with 15 balls of size 20px
var game = new Play(15, 20);
game.start();

//container with 100 balls of size 5px
var game1 = new Play(100, 5);
game1.start();