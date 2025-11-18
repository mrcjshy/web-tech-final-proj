// USING EVENT DELEGATION FOR A MORE ROBUST AND PERFORMANT SOLUTION
const LOGGED_IN_KEY = "tm_logged_in_user";

document.addEventListener('click', function(event) {
    // CHECK IF THE CLICKED ELEMENT IS AN ADD TO CART BUTTON
    if (event.target.classList.contains('add-to-cart')) {
        const productCard = event.target.closest('.product-card');
        if (productCard) {
            handleAddToCart(productCard);
        }
    }
});

function isUserLoggedIn() {
    const loggedInUser = localStorage.getItem(LOGGED_IN_KEY);
    if (!loggedInUser) {
        return false;
    }
    try {
        const user = JSON.parse(loggedInUser);
        return user && (user.username || user.email);
    } catch (error) {
        return false;
    }
}

function handleAddToCart(productCard) {
    // CHECK IF USER IS LOGGED IN
    if (!isUserLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

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