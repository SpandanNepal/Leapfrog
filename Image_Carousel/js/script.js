var carouselWrapper = document.querySelector('.carousel_container');
var img_w = 600;
var img_h = 400;
carouselWrapper.style.width = img_w + 'px';
carouselWrapper.style.height = img_h + 'px';

var next = document.getElementById('next_btn');
var prev = document.getElementById('prev_btn');

var imgWrapper = document.querySelector('.carousel_image_wrapper');
var images = imgWrapper.children;

var carouselWrapperWidth = images.length * img_w;
imgWrapper.style.width = carouselWrapperWidth + 'px';

for (var index = 0; index < images.length; index++) {
  images[index].style.left = img_w * index + 'px';
}

var carouselDots = document.querySelector('.carousel_dots');
//adding carousel dots
for (var i = 0; i < images.length; i++) {
  carouselDots[i] = document.createElement('button');
  carouselDots.appendChild(carouselDots[i]);
}

carouselDots.addEventListener('click', function(e) {
  var targetDot = e.target.closest('button');

  if (!targetDot) return;

  var currentImage = imgWrapper.querySelector('.active');
  var currentDot = carouselDots.querySelector('.active_dots');
  var dotsArr = [].slice.call(dots);
  var targetIndex = dotsArr.indexOf(targetDot);

  var targetImage = images[targetIndex];
  moveSlide(imgWrapper, currentImage, targetImage);
  updateDots(currentDot, targetDot);

});

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('active_dots');
  targetDot.classList.add('active_dots');
}

var dots = carouselDots.children;
carouselDots[0].classList.add('active_dots');

function nextSlide() {
  var currentImage = imgWrapper.querySelector('.active');
  var nextImage = currentImage.nextElementSibling;

  if (nextImage) {
    moveSlide(imgWrapper, currentImage, nextImage);
    var currentDot = carouselDots.querySelector('.active_dots');
    var nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);
  } else {
    nextImage = images[0];
    moveSlide(imgWrapper, currentImage, nextImage);
    var currentDot = carouselDots.querySelector('.active_dots');
    var dotsArr = [].slice.call(dots);
    var nextDot = dotsArr[0];
    updateDots(currentDot, nextDot);
  }
}

function prevSlide() {
  var currentImage = imgWrapper.querySelector('.active');
  var previousImage = currentImage.previousElementSibling;

  if (previousImage) {
    moveSlide(imgWrapper, currentImage, previousImage);
    var currentDot = carouselDots.querySelector('.active_dots');
    var prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);
  } else {
    previousImage = images[images.length - 1];

    moveSlide(imgWrapper, currentImage, previousImage);
    var currentDot = carouselDots.querySelector('.active-dots');
    var dotsArr = [].slice.call(dots);
    var nextDot = dotsArr[dotsArr.length - 1];
    updateDots(currentDot, nextDot);
  }
}

function moveSlide(imgWrapper, currentImage, targetImage) {
  imgWrapper.style.transform =
    'translateX(-' + targetImage.style.left + ')';
  currentImage.classList.remove('active');
  targetImage.classList.add('active');
}

next.addEventListener('click', function() {
  nextSlide();
});

prev.addEventListener('click', function() {
  prevSlide();
});