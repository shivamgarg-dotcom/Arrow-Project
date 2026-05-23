 
const categoryData = {
        health: {
            title: "Health & Personal Care",
            products: [
                { id: 501, name: "Himalaya Purifying Neem Face Wash 150ml", price: "₹130",  rating: 4.4, image: "box2_image.jpg" },
                { id: 502, name: "Oral-B Pro 500 Electric Toothbrush",       price: "₹1,499", rating: 4.3, image: "box2_image.jpg" },
                { id: 503, name: "Dettol Antiseptic Liquid 500ml",           price: "₹210",  rating: 4.6, image: "box2_image.jpg" },
                { id: 504, name: "HealthKart Multivitamin Tablets (60ct)",   price: "₹549",  rating: 4.2, image: "box2_image.jpg" },
                { id: 505, name: "Gillette Mach3 Razor with 2 Blades",      price: "₹349",  rating: 4.5, image: "box2_image.jpg" },
                { id: 506, name: "Dove Body Lotion Deeply Nourishing 400ml",price: "₹295",  rating: 4.4, image: "box2_image.jpg" }
            ]
        },
        furniture: {
            title: "Furniture",
            products: [
                { id: 601, name: "Ergonomic Mesh Office Chair with Lumbar Support", price: "₹8,499",  rating: 4.3, image: "box3_image.jpg" },
                { id: 602, name: "Solid Wood 6-Seater Dining Table Set",            price: "₹24,999", rating: 4.5, image: "box3_image.jpg" },
                { id: 603, name: "3-Seater Fabric Sofa (Dark Grey)",                price: "₹18,999", rating: 4.2, image: "box3_image.jpg" },
                { id: 604, name: "Queen Size Storage Bed with Hydraulic Lift",      price: "₹14,499", rating: 4.4, image: "box3_image.jpg" },
                { id: 605, name: "Engineered Wood Bookshelf 5-Tier",                price: "₹3,799",  rating: 4.3, image: "box3_image.jpg" },
                { id: 606, name: "Folding Study Table with Drawer (Walnut)",        price: "₹5,299",  rating: 4.1, image: "box3_image.jpg" }
            ]
        },
        electronics: {
            title: "Electronics",
            products: [
                { id: 701, name: "Samsung 55\" 4K QLED Smart TV (2025)",          price: "₹62,990", rating: 4.5, image: "box4_image.jpg" },
                { id: 702, name: "Apple AirPods Pro (2nd Gen) with ANC",          price: "₹24,900", rating: 4.7, image: "box4_image.jpg" },
                { id: 703, name: "Logitech MX Master 3S Wireless Mouse",          price: "₹8,995",  rating: 4.6, image: "box4_image.jpg" },
                { id: 704, name: "Canon EOS 1500D DSLR Camera (18-55mm Kit)",     price: "₹34,990", rating: 4.4, image: "box4_image.jpg" },
                { id: 705, name: "Mi 65W Fast Charger with USB-C Cable",          price: "₹1,299",  rating: 4.3, image: "box4_image.jpg" },
                { id: 706, name: "boAt Aavante Bar 2200 Soundbar 120W",           price: "₹7,999",  rating: 4.2, image: "box4_image.jpg" }
            ]
        },
        beauty: {
            title: "Beauty Picks",
            products: [
                { id: 801, name: "Lakme 9-to-5 Primer + Matte Lipstick",     price: "₹299",  rating: 4.4, image: "box5_image.jpg" },
                { id: 802, name: "Maybelline Fit Me Matte Foundation 30ml",  price: "₹419",  rating: 4.3, image: "box5_image.jpg" },
                { id: 803, name: "The Body Shop Tea Tree Skin Clearing Toner",price: "₹895", rating: 4.5, image: "box5_image.jpg" },
                { id: 804, name: "Biotique Bio Honey Gel Face Wash 100ml",   price: "₹149",  rating: 4.2, image: "box5_image.jpg" },
                { id: 805, name: "Nykaa Matte Eyeshadow Palette 9 Shades",   price: "₹599",  rating: 4.4, image: "box5_image.jpg" },
                { id: 806, name: "WOW Skin Science Hair Mask 200ml",         price: "₹499",  rating: 4.3, image: "box5_image.jpg" }
            ]
        },
        petcare: {
            title: "Pet Care",
            products: [
                { id: 901, name: "Pedigree Adult Dry Dog Food Chicken 3kg",    price: "₹849",  rating: 4.5, image: "box6_image.jpg" },
                { id: 902, name: "Whiskas Adult Cat Food Ocean Fish 1.2kg",    price: "₹550",  rating: 4.4, image: "box6_image.jpg" },
                { id: 903, name: "Stainless Steel Pet Food & Water Bowl Set",  price: "₹349",  rating: 4.3, image: "box6_image.jpg" },
                { id: 904, name: "Pet Grooming Brush — Removes Loose Fur",    price: "₹399",  rating: 4.2, image: "box6_image.jpg" },
                { id: 905, name: "Adjustable Dog Harness with Leash (Medium)", price: "₹699",  rating: 4.4, image: "box6_image.jpg" },
                { id: 906, name: "Automatic Pet Water Fountain 2L",            price: "₹1,299", rating: 4.5, image: "box6_image.jpg" }
            ]
        },
        toys: {
            title: "Toys",
            products: [
                { id: 1001, name: "LEGO Classic Creative Bricks Set 484pcs",     price: "₹2,499", rating: 4.7, image: "box7_image.jpg" },
                { id: 1002, name: "Hot Wheels 20-Car Gift Pack",                  price: "₹799",  rating: 4.5, image: "box7_image.jpg" },
                { id: 1003, name: "Funskool Monopoly Junior Board Game",          price: "₹699",  rating: 4.3, image: "box7_image.jpg" },
                { id: 1004, name: "Remote Control Off-Road Car 1:16 Scale",      price: "₹1,899", rating: 4.2, image: "box7_image.jpg" },
                { id: 1005, name: "Orbeez Ultimate Soothing Spa Activity Kit",   price: "₹999",  rating: 4.4, image: "box7_image.jpg" },
                { id: 1006, name: "Crayola 64-Count Crayon Box with Sharpener",  price: "₹449",  rating: 4.6, image: "box7_image.jpg" }
            ]
        },
        fashion: {
            title: "Discover Fashion Trends",
            products: [
                { id: 1101, name: "Men's Slim Fit Blazer — Navy Blue",          price: "₹2,999", rating: 4.3, image: "box8_image.jpg" },
                { id: 1102, name: "Women's Floral Wrap Midi Dress",             price: "₹1,499", rating: 4.4, image: "box8_image.jpg" },
                { id: 1103, name: "Unisex Oversized Hoodie — Charcoal Grey",    price: "₹1,199", rating: 4.5, image: "box8_image.jpg" },
                { id: 1104, name: "Women's Gold-Tone Statement Earrings",       price: "₹399",  rating: 4.2, image: "box8_image.jpg" },
                { id: 1105, name: "Men's Genuine Leather Belt — Brown",         price: "₹849",  rating: 4.3, image: "box8_image.jpg" },
                { id: 1106, name: "Canvas Tote Bag with Zipper — Beige",        price: "₹599",  rating: 4.4, image: "box8_image.jpg" }
            ]
        }
    };
 
    function getCart()         { return JSON.parse(localStorage.getItem("arrowCart") || "[]"); }
    function saveCart(c)       { localStorage.setItem("arrowCart", JSON.stringify(c)); }
    function getCartCount()    { return getCart().reduce((s, i) => s + i.qty, 0); }

    function refreshCartBadge() {
        const count   = getCartCount();
        const cartEl  = document.querySelector(".nav-cart");
        if (!cartEl) return;
        let badge = cartEl.querySelector(".cart-badge");
        if (!badge) {
            badge = document.createElement("span");
            badge.className = "cart-badge";
            badge.style.cssText = "background:#f08804;color:#0c1b33;font-size:.75rem;font-weight:bold;border-radius:50%;padding:1px 6px;margin-left:2px;vertical-align:top;";
            cartEl.appendChild(badge);
        }
        badge.textContent = count;
        badge.style.display = count > 0 ? "inline" : "none";
    }

  
    function showCategory(key) {
        const data = categoryData[key];
        if (!data) return;

        // Populate title
        document.getElementById("productViewTitle").textContent = data.title;
        document.getElementById("productViewSub").textContent   = `${data.products.length} products`;

        // Build product cards
        const grid = document.getElementById("productGrid");
        grid.innerHTML = "";
        data.products.forEach(p => {
            const stars = "★".repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? "½" : "☆".repeat(5 - Math.ceil(p.rating)));
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='box1_image.jpg'">
                    <div class="product-card-body">
                        <p class="product-card-name">${p.name}</p>
                        <p class="product-card-rating">${stars} <span style="color:#555;">(${p.rating})</span></p>
                        <p class="product-card-price">${p.price}</p>
                        <div class="qty-container">
                            <button class="qty-btn" onclick="changeQty(event,-1,${p.id})">−</button>
                            <span class="qty-display" id="qty-${p.id}">1</span>
                            <button class="qty-btn" onclick="changeQty(event,1,${p.id})">+</button>
                        </div>
                        <button class="add-to-cart-btn"
                            onclick="addToCart(event,${p.id},'${p.name.replace(/'/g,"\\'")}','${p.price}','${p.image}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });

        // Toggle views
        document.getElementById("mainView").classList.add("hidden");
        document.getElementById("productView").classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.getElementById("backBtn").addEventListener("click", () => {
        document.getElementById("productView").classList.add("hidden");
        document.getElementById("mainView").classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Attach to category cards
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", function () {
            showCategory(this.dataset.category);
        });
    });

     
    //  QTY + CART FUNCTIONS
    
    function changeQty(e, delta, id) {
        e.stopPropagation();
        const el  = document.getElementById(`qty-${id}`);
        const val = Math.max(1, parseInt(el.textContent) + delta);
        el.textContent = val;
    }

    function addToCart(e, id, name, price, image) {
        e.stopPropagation();
        const qty  = parseInt(document.getElementById(`qty-${id}`).textContent);
        let   cart = getCart();
        const idx  = cart.findIndex(i => i.id === id);
        if (idx !== -1) cart[idx].qty += qty;
        else cart.push({ id, name, price, image, qty });
        saveCart(cart);
        refreshCartBadge();

        // Button feedback
        const btn = e.target;
        const orig = btn.textContent;
        btn.textContent = `Added ${qty} ✓`;
        btn.style.background = "#88c540";
        document.getElementById(`qty-${id}`).textContent = "1";
        setTimeout(() => { btn.textContent = orig; btn.style.background = ""; }, 1200);

        showToast(`"${name.substring(0, 30)}…" added to cart`);
    }
 
    //  TOAST
     
    function showToast(msg) {
        const t = document.getElementById("arrow-toast");
        t.textContent = msg;
        t.style.opacity = "1";
        clearTimeout(t._timer);
        t._timer = setTimeout(() => { t.style.opacity = "0"; }, 2500);
    }

    
    //  INIT
   
    document.addEventListener("DOMContentLoaded", refreshCartBadge);
    