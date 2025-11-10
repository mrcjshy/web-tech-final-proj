
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const productCard = event.target.closest('.product-card');
  const productId = productCard.dataset.id;
  const productName = productCard.dataset.name;
  const productPrice = productCard.dataset.price;
  const productImg = productCard.dataset.img;

  const cartItem = {
    id: productId,
    name: productName,
    price: productPrice,
    img: productImg,
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProductIndex = cart.findIndex(item => item.id === productId);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(productName + " has been added to your cart!");
}
