document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search');
    const searchInput = document.querySelector('.search-input');

    if (searchForm && searchInput) {
        // Create suggestions container dynamically
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('search-suggestions');
        // Insert it after the search input, not at the end of the form
        searchInput.parentNode.insertBefore(suggestionsContainer, searchInput.nextSibling);

        // --- 1. Autocomplete Suggestions ---
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            suggestionsContainer.innerHTML = '';

            if (query.length < 2) { // Only show suggestions for 2 or more characters
                suggestionsContainer.style.display = 'none';
                return;
            }

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                // Create a list of suggestion items
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

        // --- Hide suggestions when clicking outside the search form ---
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });

        // --- 2. Search Form Submission ---
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // Redirect to the products page with the search query
                window.location.href = `products.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});
