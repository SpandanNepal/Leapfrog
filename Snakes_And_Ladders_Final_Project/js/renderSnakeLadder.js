var sources = {
  snakeA: 'images/snake-longest.png',
  snakeB: 'images/snake-medium-opposite.png',
  snakeC: 'images/snake-long-slanted-right.png',
  snakeD: 'images/snake-medium.png',
  snakeE: 'images/snake-small-slanted.png',
  snakeF: 'images/snake-medium-opposite.png',
  ladderA: 'images/ladder-medium.png',
  ladderB: 'images/ladder-small.png',
  ladderC: 'images/ladder-small.png',
  ladderD: 'images/ladder-medium.png',
  ladderE: 'images/ladder-large.png'
};

function drawSnakesLadders(sources, callback)
{
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for(var src in sources) {
    numImages++;
  }
  for(var src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function renderSnakeLadders()
{
  drawSnakesLadders(sources, function (images)
  {
    if (globalPosition % 2 == 0) {
      renderSquareBoard();
      ctx.drawImage(images.snakeA, 80, 25);
      ctx.drawImage(images.snakeB, 190, 320);
      showPlayerPosition();
    }
    else {
      renderSquareBoard();
      ctx.drawImage(images.snakeA, 205, 25);
      ctx.drawImage(images.snakeB, 70, 320);
      showPlayerPosition();
    }
    
    ctx.drawImage(images.ladderB, 145, 400);
    ctx.drawImage(images.ladderC, 20, 140);
    ctx.drawImage(images.snakeC, 270, 120);
    ctx.drawImage(images.ladderD, 520, 330);
    ctx.drawImage(images.snakeD, 140, 70);
    ctx.drawImage(images.ladderA, 395, 20);
  });
}