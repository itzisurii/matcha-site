let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price.replace("$", "")); 
      const category = button.dataset.category || "General";

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, category, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });

  if (document.getElementById("cart-items")) {
    renderCart();
  }
});

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>YOUR CART IS EMPTY</p>";
    if (totalDisplay) totalDisplay.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <h3>${item.name} <small>(${item.category || ""})</small></h3>
      <p>Price: $${item.price}</p>
      <p>Quantity:
          <button onclick="updateQuantity(${index}, -1)">−</button>
          ${item.quantity}
          <button onclick="updateQuantity(${index}, 1)">+</button>
      </p>
      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;
    container.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  if (totalDisplay) totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  location.reload();
}
