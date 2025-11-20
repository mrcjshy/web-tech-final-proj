// LOGGED_IN_KEY DECLARED IN COMMON.JS
document.addEventListener('click', function(event) {
    const addToCartButton = event.target.closest('.add-to-cart');
    if (addToCartButton) {
        event.preventDefault();
        event.stopPropagation();
        
        const productCard = addToCartButton.closest('.product-card');
        if (productCard) {
            handleAddToCart(productCard);
        } else {
            console.error("Cart: Could not find product card for add to cart button", addToCartButton);
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
    console.log("Cart: handleAddToCart called", productCard);
    
    if (!isUserLoggedIn()) {
        console.log("Cart: User not logged in, redirecting to login");
        window.location.href = "login.html";
        return;
    }

    const productId = productCard.dataset.id;
    const productName = productCard.dataset.name;
    const productPrice = productCard.dataset.price;
    const productImg = productCard.dataset.img;

    console.log("Cart: Product data", { productId, productName, productPrice, productImg });

    if (!productId || !productName || !productPrice || !productImg) {
        console.error("Cart: Product card is missing data attributes.", {
            productId,
            productName,
            productPrice,
            productImg,
            productCard
        });
        return;
    }

    const cleanPrice = String(productPrice).replace(/,/g, '');
    const parsedPrice = parseFloat(cleanPrice);

    if (isNaN(parsedPrice)) {
        console.error("Cart: Invalid price", productPrice);
        return;
    }

    const cartItem = {
        id: productId,
        name: productName,
        price: parsedPrice,
        img: productImg,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
        console.log("Cart: Updated existing item quantity");
    } else {
        cart.push(cartItem);
        console.log("Cart: Added new item to cart");
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart: Cart saved to localStorage", cart);
    alert(`"${productName}" has been added to your cart!`);
}