document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search');
    const searchInput = document.querySelector('.search-input');

    if (searchForm && searchInput) {
        // CREATE SUGGESTIONS CONTAINER DYNAMICALLY
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('search-suggestions');
        // INSERT IT AFTER THE SEARCH INPUT, NOT AT THE END OF THE FORM
        searchInput.parentNode.insertBefore(suggestionsContainer, searchInput.nextSibling);

        // MY SEARCH AUTOCOMPLETE SUGGESTIONS
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            suggestionsContainer.innerHTML = '';

            // SUGGEST FOR 2 OR MORE CHARACTERS ONLY
            if (query.length < 2) { 
                suggestionsContainer.style.display = 'none';
                return;
            }

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                // CREATE A LIST OF SUGGESTION ITEMS
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

        // HIDE SUGGESTION WHEN CLICKING OUTSIDE OF THE SEARCH FORM
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });

        // SEARCH FORM SUBMISSION
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // REDIRECT TO THE PRODUCTS PAGE WITH THE SEARCH QUERY
                window.location.href = `products.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});
