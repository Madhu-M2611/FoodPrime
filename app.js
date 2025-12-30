// -------------------------------
// CART SYSTEM WITH QUANTITY
// -------------------------------

const addButtons = document.querySelectorAll(".add-btn");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
updateCartUI();

// -------------------------------
// ADD TO CART BUTTON
// -------------------------------
addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    // Check if item already exists
    let existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        name: name,
        price: price,
        qty: 1,
      });
    }

    saveCart();
    updateCartUI();
  });
});

// -------------------------------
// UPDATE CART UI
// -------------------------------
function updateCartUI() {
  if (!cartList || !totalPrice) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let subtotal = item.price * item.qty;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
            <strong>${item.name}</strong>
            <span>$${item.price.toFixed(2)}</span>

            <div class="qty-box">
                <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            </div>

            <strong>$${subtotal.toFixed(2)}</strong>

            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;

    cartList.appendChild(li);
  });

  totalPrice.textContent = total.toFixed(2);

  // Save totals
  localStorage.setItem("cartTotal", total.toFixed(2));
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

// -------------------------------
// CHANGE QUANTITY
// -------------------------------
function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

// -------------------------------
// REMOVE ITEM
// -------------------------------
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

// -------------------------------
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}
// -------------------------------
