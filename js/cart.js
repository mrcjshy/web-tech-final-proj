// Using event delegation for a more robust and performant solution
document.addEventListener('click', function(event) {
    // Check if the clicked element is an 'add-to-cart' button
    if (event.target.classList.contains('add-to-cart')) {
        const productCard = event.target.closest('.product-card');
        if (productCard) {
            handleAddToCart(productCard);
        }
    }
});

function handleAddToCart(productCard) {
    const productId = productCard.dataset.id;
    const productName = productCard.dataset.name;
    const productPrice = productCard.dataset.price;
    const productImg = productCard.dataset.img;

    if (!productId || !productName || !productPrice || !productImg) {
        console.error("Product card is missing data attributes.", productCard);
        return;
    }

    const cartItem = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
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
    alert(`"${productName}" has been added to your cart!`);
}