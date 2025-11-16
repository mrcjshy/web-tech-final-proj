
document.addEventListener('DOMContentLoaded', () => {

  const cartItemsContainer = document.querySelector('.cart-container');

  const selectAllCheckbox = document.getElementById('selectall');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];



  function renderCart() {

    // Remove existing cart items

    const existingCartItems = document.querySelectorAll('.cart-item');

    existingCartItems.forEach(item => item.remove());



    if (cart.length === 0) {

      const emptyCartMessage = document.createElement('p');

      emptyCartMessage.textContent = 'Your cart is empty.';

      cartItemsContainer.appendChild(emptyCartMessage);

      if (document.querySelector('.checkout')) {

        document.querySelector('.checkout').remove();

      }

      return;

    }



    cart.forEach((item, index) => {

      const cartItemElement = document.createElement('div');

      cartItemElement.classList.add('cart-item');

      cartItemElement.innerHTML = `

        <div class="item-details">

          <input type="checkbox" name="select" id="select" checked>

          <img src="${item.img}" alt="${item.name}">

          <p>${item.name}</p>

        </div>

        <div class="item-price">

          <p>₱${item.price}</p>

        </div>

        <div class="item-quantity">

          <input type="number" value="${item.quantity}" min="1" data-index="${index}">

        </div>

        <div class="item-total">

          <p>₱${item.price * item.quantity}</p>

        </div>

        <div class="item-actions">

          <button class="delete-item" data-index="${index}">Delete</button>

        </div>

      `;

      cartItemsContainer.appendChild(cartItemElement);

    });



    if (!document.querySelector('.checkout')) {

      const checkoutSection = document.createElement('div');

      checkoutSection.classList.add('checkout');

      checkoutSection.innerHTML = `

        <div class="total-price">

          <p>Total: ₱<span id="total-price">0</span></p>

        </div>

        <button class="checkout-btn">Checkout</button>

      `;

      document.body.appendChild(checkoutSection);

    }

    updateTotalPrice();

  }



  function updateTotalPrice() {

    let totalPrice = 0;

    const selectedItems = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');

    selectedItems.forEach(selectedItem => {

      const cartItem = selectedItem.closest('.cart-item');

      const price = parseFloat(cartItem.querySelector('.item-price p').textContent.replace('₱', ''));

      const quantity = parseInt(cartItem.querySelector('.item-quantity input').value);

      totalPrice += price * quantity;

    });

    if (document.getElementById('total-price')) {

      document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    }

  }



  selectAllCheckbox.addEventListener('change', () => {

    const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');

    checkboxes.forEach(checkbox => {

      checkbox.checked = selectAllCheckbox.checked;

    });

    updateTotalPrice();

  });



  cartItemsContainer.addEventListener('change', (event) => {

    if (event.target.type === 'checkbox' || event.target.type === 'number') {

      const index = event.target.dataset.index;

      if (event.target.type === 'number') {

        cart[index].quantity = parseInt(event.target.value);

        localStorage.setItem('cart', JSON.stringify(cart));

        renderCart();

      }

      updateTotalPrice();

    }

  });



  cartItemsContainer.addEventListener('click', (event) => {

    if (event.target.classList.contains('delete-item')) {

      const index = event.target.dataset.index;

      cart.splice(index, 1);

      localStorage.setItem('cart', JSON.stringify(cart));

      renderCart();

    }

  });



  renderCart();

});
