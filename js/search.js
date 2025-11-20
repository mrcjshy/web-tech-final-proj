document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search');
    const searchInput = document.querySelector('.search-input');

    if (searchForm && searchInput) {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('search-suggestions');
        searchInput.parentNode.insertBefore(suggestionsContainer, searchInput.nextSibling);

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            suggestionsContainer.innerHTML = '';

            if (query.length < 2) { 
                suggestionsContainer.style.display = 'none';
                return;
            }

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                const suggestionsHTML = filteredProducts.slice(0, 5).map(product => 
                    `<a href="products.html?q=${encodeURIComponent(product.name)}" class="suggestion-item">${product.name}</a>`
                ).join('');
                
                suggestionsContainer.innerHTML = suggestionsHTML;
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.innerHTML = '<div class="suggestion-item none">No products found</div>';
                suggestionsContainer.style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});
