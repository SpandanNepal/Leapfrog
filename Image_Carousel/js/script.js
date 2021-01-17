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

//update class to target dots
//function updateDots(currentDot, targetDot) {
//  currentDot.classList.remove('active_dots');
//  targetDot.classList.add('active-dots');
//}

var dots = carouselDots.children;
carouselDots[0].classList.add('active_dots');

function nextSlide() {
  var currentImage = imgWrapper.querySelector('.active');
  var nextImage = currentImage.nextElementSibling;

  if (nextImage) {
    moveSlide(imgWrapper, currentImage, nextImage);
    //carousel dots
    //var currentDot = carouselDots.querySelector('.active_dots');
  } else {
    nextImage = images[0];
    moveSlide(imgWrapper, currentImage, nextImage);
    //carousel dots
    //var currentDot = carouselDots.querySelector('.active_dots');
  }
}

function prevSlide() {
  var currentImage = imgWrapper.querySelector('.active');
  var previousImage = currentImage.previousElementSibling;

  if (previousImage) {
    moveSlide(imgWrapper, currentImage, previousImage);
    //carousel dots
  } else {
    previousImage = images[images.length - 1];

    moveSlide(imgWrapper, currentImage, previousImage);
    //carousel dots
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