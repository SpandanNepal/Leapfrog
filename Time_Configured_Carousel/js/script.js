function Carousel(carouselId, intervalTime, containerWidth, imgWidth)
{
  this.intervalTime = intervalTime;
  this.containerWidth = containerWidth;
  this.imgWidth = imgWidth;
  this.slideInterval;

  this.carouselWrapper = document.getElementById(carouselId);
  
  this.imgWrapper = this.carouselWrapper.children[0];
  this.carouselDots = document.createElement('div');
  this.arrowBtn = document.createElement('div');
  this.images = this.imgWrapper.children;
  this.dots = this.carouselDots.children;

  this.slideInterval = setInterval(this.nextImgSlider.bind(this), this.intervalTime);
}

Carousel.prototype.imgWrapperWidth = function() {
  this.carouselWrapper.style.width = this.containerWidth + 'px';

  var carouselWrapperWidth = this.images.length * this.imgWidth;
  this.imgWrapper.style.width = carouselWrapperWidth + 'px';

  for (var index = 0; index < this.images.length; index++) {
    this.images[index].style.left = this.imgWidth * index + 'px';
    this.images[index].style.float = 'left';
  }

  this.images[this.images.length - 1].style.float = 'none';
};

Carousel.prototype.addArrowBtn = function addArrowBtn() {
  var that = this;
  this.arrowBtn.classList.add('buttons');
  this.carouselWrapper.appendChild(this.arrowBtn);

  var lArrowBtn = document.createElement('button');
  lArrowBtn.classList.add('prevBtn');
  lArrowBtn.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
  this.arrowBtn.appendChild(lArrowBtn);

  var rArrowBtn = document.createElement('button');
  rArrowBtn.classList.add('nextBtn');
  rArrowBtn.innerHTML = '<i class="fas fa-arrow-circle-right"></i>';
  this.arrowBtn.appendChild(rArrowBtn);

  rArrowBtn.addEventListener('click', function() {
    that.nextImgSlider();
  });

  lArrowBtn.addEventListener('click', function() {
    that.prevImgSlider();
  });
};

Carousel.prototype.carouselIndicator = function carouselIndicator() {
  this.carouselDots.classList.add('carousel_dots');
  this.carouselWrapper.appendChild(this.carouselDots);
  for (var i = 0; i < this.images.length; i++) {
    this.carouselDots[i] = document.createElement('button');
    this.carouselDots.appendChild(this.carouselDots[i]);
  }
  this.carouselDots[0].classList.add('active_dots');
};

Carousel.prototype.nextImgSlider = function nextImgSlider() {
  var curImg = this.imgWrapper.querySelector('.active');
  var nextImg = curImg.nextElementSibling;

  if (nextImg) {
    this.changeImgSlide(this.imgWrapper, curImg, nextImg);
    //carousel dots functionality to be added here
    //var currentDot = this.carouselDots.querySelector('.active_dots');
  } else {
    nextImg = this.images[0];
    this.changeImgSlide(this.imgWrapper, curImg, nextImg);
    //carousel dots functionality to be added here
  }
};

Carousel.prototype.prevImgSlider = function prevImgSlider() {
  var curImg = this.imgWrapper.querySelector('.active');
  var prevImg = curImg.previousElementSibling;

  if (prevImg) {
    this.changeImgSlide(this.imgWrapper, curImg, prevImg);
    //carousel dots functionality to be added here
  } else {
    prevImg = this.images[this.images.length - 1];
    this.changeImgSlide(this.imgWrapper, curImg, prevImg);
    //carousel dots functionality to be added here
  }
};

Carousel.prototype.changeImgSlide = function(imgWrapper, curImg, targetImage){
  imgWrapper.style.transform ='translateX(-' + targetImage.style.left + ')';
  curImg.classList.remove('active');
  targetImage.classList.add('active');
};

Carousel.prototype.clearResetInterval = function clearResetInterval() {
  if (this.auto) {
    clearInterval(this.slideInterval);
    this.slideInterval = setInterval(
      this.nextImgSlider.bind(this),
      this.intervalTime
    );
  }
};

//Carousel.prototype.updateDots = function(currentDot, targetDot) {
//  currentDot.classList.remove('active_dots');
//  targetDot.classList.add('active_dots');
//};

Carousel.prototype.start = function() {
  this.imgWrapperWidth();
  this.addArrowBtn();
  this.carouselIndicator();
};

var carouselId1 = new Carousel('carousel_id', 2000, 600, 600);
carouselId1.start();