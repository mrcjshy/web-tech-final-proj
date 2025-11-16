// CAROUSEL
const carouselInner = document.querySelector('.carousel-inner');
let slides = document.querySelectorAll('.carousel-inner .slide');
let index = 0;


const firstClone = slides[0].cloneNode(true);
carouselInner.appendChild(firstClone);
slides = document.querySelectorAll('.carousel-inner .slide'); 

function showNextSlide() {
  index++;
  carouselInner.style.transition = 'transform 1s ease-in-out';
  carouselInner.style.transform = `translateX(-${index * 100}%)`;

  if (index === slides.length - 1) {
    setTimeout(() => {
      carouselInner.style.transition = 'none';
      carouselInner.style.transform = 'translateX(0)';
      index = 0;
    }, 1000); 
  }
}

setInterval(showNextSlide, 2000);

