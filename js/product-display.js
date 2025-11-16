function renderProducts(productsToRender, containerElement) {
    if (!containerElement) {
        console.error("Container element not found for rendering products.");
        return;
    }

    let productHTML = "";

    if (productsToRender.length === 0) {
        productHTML = "<p>No products found matching your criteria.</p>";
    } else {
        productsToRender.forEach(product => {
            // Ensure price is a number before calling toLocaleString
            const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);

            productHTML += `
                <div class="product-card" data-id="${product.id}" data-name="${product.name}" data-price="${price}" data-img="${product.img}">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₱${price.toLocaleString()}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
        });
    }

    containerElement.innerHTML = productHTML;
}
