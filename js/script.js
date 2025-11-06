// BANNER
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

// ADD TO CART
const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = product.dataset.price;
    const img = product.dataset.img;

    const item = { id, name, price, img, quantity: 1 };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if already exists
    const existingItem = cart.find(p => p.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});