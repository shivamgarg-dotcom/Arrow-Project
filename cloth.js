function getCart() {
  return JSON.parse(localStorage.getItem("arrowCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("arrowCart", JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartDisplay() {
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = getCartCount();
}


const clothingKeywords = [
  "Men's T-Shirts", "Men's Jeans", "Women's Kurtas",
  "Women's Dresses", "Sneakers", "Jackets"
];
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

if (searchInput && searchSuggestions) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    searchSuggestions.innerHTML = "";
    if (query.length > 0) {
      const filtered = clothingKeywords.filter(k => k.toLowerCase().includes(query));
      if (filtered.length > 0) {
        filtered.forEach(keyword => {
          const div = document.createElement("div");
          div.classList.add("suggestion-item");
          div.textContent = keyword;
          div.addEventListener("click", () => {
            searchInput.value = keyword;
            searchSuggestions.classList.remove("active");
          });
          searchSuggestions.appendChild(div);
        });
        searchSuggestions.classList.add("active");
      } else {
        searchSuggestions.classList.remove("active");
      }
    } else {
      searchSuggestions.classList.remove("active");
    }
  });

  document.addEventListener("click", function (event) {
    if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
      searchSuggestions.classList.remove("active");
    }
  });
}

//  Product Database  

const productsData = {
  "Mens Casuals": [
    { id: 101, name: "Solid Navy Blue T-Shirt",  price: "₹499",   image: " pic 1.png" },
    { id: 102, name: "Slim Fit Blue Denim Jeans", price: "₹1,299", image: " pic 2.png" },
    { id: 103, name: "Classic White Polo",         price: "₹699",   image: " pic6.jpeg" },
    { id: 104, name: "Black Casual Chinos",        price: "₹999",   image: " pic 4.png" }
  ],
  "Womens Ethnic": [
    { id: 201, name: "Cotton Printed Anarkali",  price: "₹1,499", image: "pic13.jpeg" },
    { id: 202, name: "Silk Blend Saree",          price: "₹2,999", image: "pic14.jpeg" },
    { id: 203, name: "Embroidered Kurta Set",     price: "₹1,899", image: "pic15.jpeg" },
    { id: 204, name: "Designer Dupatta",          price: "₹499",   image: "pic16.jpeg" }
  ],
  "Footwear": [
    { id: 301, name: "Running Sneakers",          price: "₹1,599", image: "pic9.jpeg" },
    { id: 302, name: "Formal Leather Shoes",      price: "₹2,199", image: " pic11.jpeg" },
    { id: 303, name: "Women's Block Heels",       price: "₹1,199", image: " pic10.jpeg" },
    { id: 304, name: "Casual Slip-on Flats",      price: "₹599",   image: " pic12.jpeg" }
  ],
  "Winter": [
    { id: 401, name: "Quilted Winter Jacket",     price: "₹2,499", image: "pic5.jpeg" },
    { id: 402, name: "Fleece Pullover Hoodie",    price: "₹999",   image: "pic 3.jpeg" },
    { id: 403, name: "Thermal Innerwear Set",     price: "₹799",   image: " pic7.jpeg" },
    { id: 404, name: "Woolen Beanie & Scarf",     price: "₹499",   image: " pic8.jpeg" }
  ]
};

//   View Toggler 

const mainView           = document.getElementById("mainView");
const productView        = document.getElementById("productView");
const backBtn            = document.getElementById("backBtn");
const dynamicTitle       = document.getElementById("dynamicCategoryTitle");
const dynamicProductGrid = document.getElementById("dynamicProductGrid");

const categoryBoxes = document.querySelectorAll(".category-box");
categoryBoxes.forEach(box => {
  box.addEventListener("click", function () {
    const categoryKey = this.getAttribute("data-category");
    mainView.classList.add("hidden");
    productView.classList.remove("hidden");
    dynamicTitle.textContent = this.querySelector(".box-title").textContent;
    loadProducts(categoryKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

backBtn.addEventListener("click", () => {
  productView.classList.add("hidden");
  mainView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//   Load Products into Grid 

function loadProducts(categoryKey) {
  dynamicProductGrid.innerHTML = "";
  const products = productsData[categoryKey];
  if (!products) return;

  products.forEach(product => {
    dynamicProductGrid.innerHTML += `
      <div class="box">
        <div class="box-img-wrap">
          <img src="${product.image}" alt="${product.name}" class="box-img">
        </div>
        <div class="box-content" style="align-items: center; text-align: center;">
          <h3 class="box-title">${product.name}</h3>
          <p class="product-price">${product.price}</p>

          <!-- Quantity Controller -->
          <div class="qty-container">
            <button class="qty-btn" onclick="updateQuantity(event, -1, ${product.id})">−</button>
            <span class="qty-display" id="qty-${product.id}">1</span>
            <button class="qty-btn" onclick="updateQuantity(event, 1, ${product.id})">+</button>
          </div>

          <button class="add-to-cart-btn" onclick="addToCart(event, ${product.id}, '${product.name}', '${product.price}', '${product.image}')">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

//  Quantity Control  

function updateQuantity(event, change, productId) {
  event.stopPropagation();
  const qtyEl = document.getElementById(`qty-${productId}`);
  let qty = parseInt(qtyEl.textContent) + change;
  if (qty < 1) qty = 1;
  qtyEl.textContent = qty;
}

//  Add to Cart (saves to localStorage)  

function addToCart(event, productId, name, price, image) {
  event.stopPropagation();

  const qtyEl   = document.getElementById(`qty-${productId}`);
  const qtyToAdd = parseInt(qtyEl.textContent);

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qtyToAdd;
  } else {
    cart.push({ id: productId, name, price, image, qty: qtyToAdd });
  }

  saveCart(cart);
  updateCartDisplay();

  // Button feedback
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = `Added ${qtyToAdd} ✓`;
  btn.style.backgroundColor = "#88c540";

  qtyEl.textContent = "1"; // Reset qty display

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.backgroundColor = "";
  }, 1200);
}

//  Auth Nav Update

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

// Init on Page Load

document.addEventListener("DOMContentLoaded", () => {
  updateAuthNav();
  updateCartDisplay();
});