var buttonPress = false;

function startGame(){
  var game = new GameStart();
  game.start();
}

var startBtn = document.getElementById('start');
startBtn.addEventListener('click', startGame);

function GameStart(){
  this.containerW;
  this.containerH;

  this.maxSpeed = 500;
  this.trackWrapper;
  this.trackInterval;
  this.playerCar;
  //this.score = 0;
  this.opponentCar = [];
  this.opponentCarCounter = 1;
  this.gameSpeed = 5;
  this.maxOpponentCar = 100;
  this.wrapperTop = -500;
  this.minwrapperTop = -500;
  this.opponentCarBottom = 800;
  this.container = document.querySelector('.container');
  this.gameInst = document.querySelector('.instruction');
}

GameStart.prototype.start = function() {
  if (this.gameInst) {
    this.gameInst.style.display = 'none';
  }

  this.containerW = this.container.clientWidth;
  this.containerH = this.container.clientHeight;

  this.initiateRoad();
  this.initiateCar(true, 50, 40);
  document.onkeydown = this.carMove.bind(this);

  this.trackInterval = setInterval(this.loopTrac.bind(this), 1000 / 90);
};

GameStart.prototype.initiateRoad = function() {
  this.trackWrapper = document.createElement('div');
  this.trackWrapper.style.position = 'absolute';
  this.trackWrapper.style.width = this.containerW + 'px';
  this.trackWrapper.style.height = this.containerH + 'px';

  this.container.appendChild(this.trackWrapper);
  for (var i = 0; i < 3; i++) {
    var img = document.createElement('img');
    img.setAttribute('src', 'images/road.png');
    img.style.width = this.containerW + 'px';
    img.style.height = this.containerH + 'px';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    this.trackWrapper.appendChild(img);
  }
};

GameStart.prototype.initiateCar = function(playerCar, posLeft, posBtm) {
  if (playerCar) {
    this.playerCar = new Car(this.container, 'url(images/PlayerCar.png', posLeft, posBtm);
    this.playerCar.carstart();
  } else {
    var enemyCar = new Car(this.container, 'url(images/opponentCar.png)', posLeft, posBtm);
    enemyCar.carstart();
   this.opponentCar.push(enemyCar);
  }
};

GameStart.prototype.carMove = function(event) {
  if (event.keyCode === 65 || event.keyCode === 37) {
    if (!buttonPress) { this.playerCar.moveLeft(); }
  } else if (event.keyCode === 68 || event.keyCode === 39) {
    if (!buttonPress) { this.playerCar.moveRight(); }
  }
};

GameStart.prototype.loopTrac = function() {
  this.wrapperTop < 0 ? (this.wrapperTop += this.gameSpeed) : (this.wrapperTop = this.minwrapperTop);

  this.trackWrapper.style.top = this.wrapperTop + 'px';

  //move opponent car and check collision
  for (var i = 0; i < this.opponentCar.length; i++) {
    this.opponentCar[i].posBtm -= this.gameSpeed;
    this.opponentCar[i].draw();

    //collision detection
    if (this.playerCar.posLeft + 20 < this.opponentCar[i].posLeft + this.opponentCar[i].carWidth && this.playerCar.posLeft + 80 > this.opponentCar[i].posLeft) {
      if (this.playerCar.posBtm + 40 < this.opponentCar[i].posBtm + this.opponentCar[i].carHeight && this.playerCar.posBtm + 160 > this.opponentCar[i].posBtm) {
        clearInterval(this.trackInterval);
        gameOver();
      }
    }
    //remove passed car and increase score
    if (this.opponentCar[i].posBtm < -this.opponentCar[i].carHeight) {
      this.opponentCar.splice(i, 1);
      //this.score += 1;
      //document.getElementById('live_score').innerHTML = this.score;
    }
  }
  
  this.opponentCarCounter = (this.opponentCarCounter + 1) % this.maxOpponentCar;

  if (this.opponentCarCounter == 0) {
    var carLeft = getCarLane(getRandomLane());
    this.initiateCar(false, carLeft, this.opponentCarBottom);
  }
};

function getCarLane(laneVal) {
  var leftLaneVal;
  if (laneVal == 1) {
    leftLaneVal = 50;
  } else if (laneVal == 2) {
    leftLaneVal = 225;
  } else {
    leftLaneVal = 390;
  }
  return leftLaneVal;
}

function getRandomLane() {
  return Math.round(Math.random() * (3 - 1) + 1);
}

function Car(container, imageUrl, posLeft, posBtm) {
  this.container = container;
  this.posBtm = posBtm;
  this.posLeft = posLeft;
  this.imageUrl = imageUrl;
  this.carWidth = 71;
  this.carHeight = 135;
  this.carElement;
  this.laneWidth = 170;
  this.leftPosLane = 100;
  this.rightPosLane = 490;
}

Car.prototype.carstart = function() {
  this.carElement = document.createElement('div');
  this.carElement.style.position = 'absolute';
  this.carElement.style.backgroundImage = this.imageUrl;
  this.carElement.style.width = this.carWidth + 'px';
  this.carElement.style.height = this.carHeight + 'px';
  this.carElement.style.left = this.posLeft + 'px';

  this.draw();

  this.container.appendChild(this.carElement);
};

Car.prototype.draw = function() {
  this.carElement.style.bottom = this.posBtm + 'px';
};

Car.prototype.moveLeft = function() {
  if (this.posLeft > this.leftPosLane) {
    buttonPress = true;
    var leftInterval = setInterval(shiftLeft.bind(this), 1000 / 90);

    var nextPosleft = this.posLeft - this.laneWidth;

    function shiftLeft() {
      if (this.posLeft >= nextPosleft) {
        this.posLeft = nextPosleft;
        this.carElement.style.left = this.posLeft + 'px';
        buttonPress = false;
        clearInterval(leftInterval);
      }
    }
  }
};

Car.prototype.moveRight = function() {
  if (this.posLeft < this.rightPosLane) {
    buttonPress = true;
    var rightInterval = setInterval(shiftRight.bind(this), 1000 / 90);

    var nextPosleft = this.posLeft + this.laneWidth;

    function shiftRight() {
      if (this.posLeft <= nextPosleft) {
        this.posLeft = nextPosleft;
        this.carElement.style.left = this.posLeft + 'px';
        buttonPress = false;
        clearInterval(rightInterval);
      }
    }
  }
};

function gameOver() {
  var container = document.querySelector('.container');
  container.innerHTML = '<div class="finish"><h2>GAME OVER</h2></div>';
}