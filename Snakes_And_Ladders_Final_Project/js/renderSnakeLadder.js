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