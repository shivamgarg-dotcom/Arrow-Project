 

function getCart() {
  return JSON.parse(localStorage.getItem("arrowCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("arrowCart", JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// Update Cart Badge in Navbar 

function updateCartBadge() {
  const count = getCartCount();
  const cartEl = document.querySelector(".nav-cart");
  if (!cartEl) return;
  const oldBadge = cartEl.querySelector(".cart-badge");
  if (oldBadge) oldBadge.remove();
  if (count > 0) {
    const badge = document.createElement("span");
    badge.className = "cart-badge";
    badge.textContent = count;
    badge.style.cssText = `
      background: #f08804;
      color: #0c1b33;
      font-size: 0.75rem;
      font-weight: bold;
      border-radius: 50%;
      padding: 1px 6px;
      margin-left: 2px;
      vertical-align: top;
    `;
    cartEl.appendChild(badge);
  }
}

// ─── Parse price string to number (e.g. "₹1,299" → 1299) ────────────────────

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[₹,]/g, ""), 10) || 0;
}

// ─── Render Cart Items ────────────────────────────────────────────────────────

function renderCart() {
  const cart = getCart();
  const cartLeft = document.querySelector(".cart-left");
  if (!cartLeft) return;

  // Clear existing static content (keep cart-header)
  const header = cartLeft.querySelector(".cart-header");
  cartLeft.innerHTML = "";
  if (header) cartLeft.appendChild(header);

  // Add price label back
  const priceLabel = document.createElement("p");
  priceLabel.className = "price-label";
  priceLabel.textContent = "Price";
  if (header) header.appendChild(priceLabel);

  const divider = document.createElement("div");
  divider.className = "cart-divider";
  cartLeft.appendChild(divider);

  if (cart.length === 0) {
    // Empty cart message
    const empty = document.createElement("div");
    empty.style.cssText = "text-align:center; padding: 60px 20px; color: #555;";
    empty.innerHTML = `
      <i class="fa-solid fa-cart-shopping" style="font-size:3rem; color:#ccc; margin-bottom:16px;"></i>
      <h2 style="margin-bottom:10px;">Your Arrow Cart is empty</h2>
      <p style="margin-bottom:20px;">Looks like you haven't added anything yet.</p>
      <a href="Arrow.html" style="
        background:#ffd814; border:1px solid #fcd200; border-radius:20px;
        padding:10px 24px; font-weight:bold; text-decoration:none; color:#0c1b33;
      ">Continue Shopping</a>
    `;
    cartLeft.appendChild(empty);
    updateSummary(0, 0);
    return;
  }

  cart.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.dataset.id = item.id;

    const itemPrice = parsePrice(item.price);
    const lineTotal = itemPrice * item.qty;

    // Build qty options
    let qtyOptions = "";
    for (let i = 1; i <= 10; i++) {
      qtyOptions += `<option value="${i}" ${item.qty === i ? "selected" : ""}>Qty: ${i}</option>`;
    }

    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='box1_image.jpg'">
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="stock-status">In stock</p>
        <p class="shipping-info">Eligible for FREE Shipping</p>
        <p style="font-size:0.85rem; color:#555; margin-bottom:8px;">
          Unit price: <strong>${item.price}</strong>
        </p>
        <div class="cart-item-actions">
          <select class="qty-select" data-id="${item.id}">
            ${qtyOptions}
          </select>
          <span class="action-divider">|</span>
          <a href="#" class="action-link delete-btn" data-id="${item.id}">Delete</a>
          <span class="action-divider">|</span>
          <a href="#" class="action-link save-btn" data-id="${item.id}">Save for later</a>
        </div>
      </div>
      <div class="cart-item-price">
        <p><strong>₹${lineTotal.toLocaleString("en-IN")}.00</strong></p>
      </div>
    `;

    cartLeft.appendChild(itemEl);

    const divEl = document.createElement("div");
    divEl.className = "cart-divider";
    cartLeft.appendChild(divEl);
  });

  // Subtotal row at bottom
  const totalItems = getCartCount();
  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);

  const subtotalRow = document.createElement("div");
  subtotalRow.className = "cart-subtotal-bottom";
  subtotalRow.innerHTML = `
    <p>Subtotal (${totalItems} item${totalItems !== 1 ? "s" : ""}): 
      <strong>₹${subtotal.toLocaleString("en-IN")}.00</strong>
    </p>
  `;
  cartLeft.appendChild(subtotalRow);

  updateSummary(totalItems, subtotal);

  // Attach event listeners
  attachCartEvents();
}

// ─── Update Summary Box (right side) ─────────────────────────────────────────

function updateSummary(totalItems, subtotal) {
  const checkoutBox = document.querySelector(".checkout-box");
  if (!checkoutBox) return;

  const subtotalEl = checkoutBox.querySelector("h2");
  if (subtotalEl) {
    subtotalEl.innerHTML = `Subtotal (${totalItems} item${totalItems !== 1 ? "s" : ""}): 
      <strong>₹${subtotal.toLocaleString("en-IN")}.00</strong>`;
  }

  // Show/hide free delivery message
  const freeShipping = checkoutBox.querySelector(".free-shipping-bar");
  if (freeShipping) {
    freeShipping.style.display = subtotal >= 499 ? "flex" : "none";
  }
}

// ─── Event Listeners for Delete & Qty Change ─────────────────────────────────

function attachCartEvents() {
  // Quantity change
  document.querySelectorAll(".qty-select[data-id]").forEach(sel => {
    sel.addEventListener("change", function () {
      const id = parseInt(this.dataset.id);
      const newQty = parseInt(this.value);
      let cart = getCart();
      const idx = cart.findIndex(i => i.id === id);
      if (idx !== -1) {
        cart[idx].qty = newQty;
        saveCart(cart);
        renderCart();
        updateCartBadge();
      }
    });
  });

  // Delete
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const id = parseInt(this.dataset.id);
      let cart = getCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);

      // Animate out
      const row = document.querySelector(`.cart-item[data-id="${id}"]`);
      if (row) {
        row.style.transition = "opacity 0.3s, max-height 0.3s";
        row.style.opacity = "0";
        setTimeout(() => {
          renderCart();
          updateCartBadge();
        }, 300);
      } else {
        renderCart();
        updateCartBadge();
      }
    });
  });

  // Save for later (moves to a saved section visually)
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const id = parseInt(this.dataset.id);
      let cart = getCart();
      const item = cart.find(i => i.id === id);
      if (!item) return;

      // Save to "saved for later" list
      let saved = JSON.parse(localStorage.getItem("arrowSavedItems") || "[]");
      if (!saved.find(s => s.id === id)) saved.push(item);
      localStorage.setItem("arrowSavedItems", JSON.stringify(saved));

      // Remove from cart
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCart();
      updateCartBadge();
      showToast(`"${item.name}" saved for later`);
    });
  });
}

// ─── Toast Notification ───────────────────────────────────────────────────────

function showToast(message) {
  const existing = document.getElementById("arrow-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "arrow-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #0c1b33;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 0.9rem;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    opacity: 0;
    transition: opacity 0.3s;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => (toast.style.opacity = "1"));
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Auth Nav on Cart Page ────────────────────────────────────────────────────

function updateAuthNav() {
  const signinEl = document.querySelector(".nav-signin");
  if (!signinEl) return;
  const user = localStorage.getItem("arrowUser");
  const name = localStorage.getItem("arrowUserName");
  if (user) {
    const displayName = name ? name.split(" ")[0] : user.split("@")[0];
    signinEl.innerHTML = `
      <p><span>Hi, ${displayName}</span></p>
      <p class="nav-2">Account &amp; Lists</p>
    `;
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  updateAuthNav();
  updateCartBadge();
  renderCart();
});