/*=========================================================
LUXURY WEBSITE V2
script.js
Author : Atharv Agarwal
=========================================================*/





/*=========================================================
MOBILE MENU
=========================================================*/

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.innerHTML = navLinks.classList.contains("active")

            ? '<i class="fa-solid fa-xmark"></i>'

            : '<i class="fa-solid fa-bars"></i>';

    });

}





/*=========================================================
CLOSE MENU WHEN LINK IS CLICKED
=========================================================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

        if (menuBtn) {

            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

        }

    });

});





/*=========================================================
STICKY NAVBAR
=========================================================*/

const header = document.querySelector("header");

let isScrolled = false;

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        if (!isScrolled) {

            header.classList.add("scrolled");

            isScrolled = true;

        }

    } else {

        if (isScrolled) {

            header.classList.remove("scrolled");

            isScrolled = false;

        }

    }

});





/*=========================================================
SCROLL REVEAL
=========================================================*/

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {

        root: null,

        rootMargin: "0px 0px -120px 0px",

        threshold: 0.02

    });

    reveals.forEach(item => observer.observe(item));

} else {

    function revealElements() {

        const windowHeight = window.innerHeight;

        reveals.forEach(item => {

            if (!item.classList.contains("active")) {

                const top = item.getBoundingClientRect().top;

                if (top < windowHeight - 120) {

                    item.classList.add("active");

                }

            }

        });

    }

    window.addEventListener("scroll", revealElements);

    window.addEventListener("load", revealElements);

    revealElements();

}





/*=========================================================
BACK TO TOP BUTTON
=========================================================*/

const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}





/*=========================================================
SMOOTH SCROLL FOR INTERNAL LINKS
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});





/*=========================================================
WHATSAPP CONTACT FORM
=========================================================*/

const whatsappContactBtn = document.querySelector(".whatsapp-contact-btn");

if (whatsappContactBtn) {

    whatsappContactBtn.addEventListener("click", (e) => {

        e.preventDefault();

        const name = document.querySelector("#contact-name")?.value.trim() || "";

        const email = document.querySelector("#contact-email")?.value.trim() || "";

        const phone = document.querySelector("#contact-phone")?.value.trim() || "";

        const message = document.querySelector("#contact-message")?.value.trim() || "";

        const whatsappMessage = [

            "Hello HandsomeBath,",

            "",

            `Name: ${name}`,

            `Email: ${email}`,

            `Phone: ${phone}`,

            `Message: ${message}`

        ].join("\n");

        window.open(

            `https://wa.me/918191960414?text=${encodeURIComponent(whatsappMessage)}`,

            "_blank"

        );

    });

}





/*=========================================================
CURRENT YEAR (Optional)
=========================================================*/

const year = document.querySelector("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}





/*=========================================================
PRELOAD FADE-IN
=========================================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});





/*=========================================================
SHOPPING CART
=========================================================*/

const cartToggle = document.querySelector(".cart-toggle");

const cartDrawer = document.querySelector(".cart-drawer");

const cartOverlay = document.querySelector(".cart-overlay");

const cartClose = document.querySelector(".cart-close");

const cartItems = document.querySelector(".cart-items");

const cartEmpty = document.querySelector(".cart-empty");

const cartCount = document.querySelector(".cart-count");

const cartSummary = document.querySelector(".cart-item-summary");

const cartTotal = document.querySelector(".cart-total");

const cartCheckout = document.querySelector(".cart-checkout");

const cartClear = document.querySelector(".cart-clear");

const cartStorageKey = "handsomebathCart";

let cart = [];

function getStoredCart() {

    try {

        return JSON.parse(localStorage.getItem(cartStorageKey)) || [];

    } catch (error) {

        return [];

    }

}

function saveCart() {

    localStorage.setItem(cartStorageKey, JSON.stringify(cart));

}

function formatPrice(price) {

    return `Rs. ${Number(price).toLocaleString("en-IN")}`;

}

function getProductFromButton(button) {

    const card = button.closest(".product-card");

    if (!card) {

        return null;

    }

    const name = card.querySelector(".product-content h3")?.textContent.trim();

    const priceText = card.querySelector(".product-price")?.textContent || "";

    const image = card.querySelector(".product-image img")?.getAttribute("src");

    const price = Number(priceText.replace(/[^\d]/g, ""));

    if (!name || !price || !image) {

        return null;

    }

    return {

        id: `${name}-${price}-${image}`,

        name,

        price,

        image

    };

}

function normalizeCartItems(items) {

    return items
        .filter(item => item.name && item.price && item.image)
        .map(item => ({

            ...item,

            id: item.id || `${item.name}-${item.price}-${item.image}`,

            quantity: Number(item.quantity) || 1

        }));

}

function getCartQuantity() {

    return cart.reduce((total, item) => total + item.quantity, 0);

}

function getCartTotal() {

    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);

}

function openCart() {

    if (!cartDrawer || !cartOverlay) {

        return;

    }

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");

}

function closeCart() {

    if (!cartDrawer || !cartOverlay) {

        return;

    }

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");

}

function buildCheckoutLink() {

    const lines = cart.map((item, index) => (

        `${index + 1}. ${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`

    ));

    const message = [

        "Hello HandsomeBath,",

        "",

        "I want to place an order for:",

        ...lines,

        "",

        `Total: ${formatPrice(getCartTotal())}`

    ].join("\n");

    return `https://wa.me/918191960414?text=${encodeURIComponent(message)}`;

}

function renderCart() {

    if (!cartItems || !cartEmpty || !cartCount || !cartSummary || !cartTotal || !cartCheckout) {

        return;

    }

    const quantity = getCartQuantity();

    cartCount.textContent = quantity;

    cartSummary.textContent = `${quantity} ${quantity === 1 ? "item" : "items"}`;

    cartTotal.textContent = formatPrice(getCartTotal());

    cartItems.innerHTML = "";

    cartEmpty.classList.toggle("show", cart.length === 0);

    cartCheckout.classList.toggle("disabled", cart.length === 0);

    cartCheckout.href = cart.length ? buildCheckoutLink() : "#";

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>${formatPrice(item.price)}</span>
                <div class="cart-qty">
                    <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                    <strong>${item.quantity}</strong>
                    <button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    <button class="cart-remove" type="button" data-action="remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;

        cartItems.appendChild(cartItem);

    });

    saveCart();

}

function addToCart(button) {

    const product = getProductFromButton(button);

    if (!product) {

        return;

    }

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }

    button.textContent = "Added";

    setTimeout(() => {

        button.textContent = "Add To Cart";

    }, 1200);

    renderCart();

    openCart();

}

function updateCartItem(id, action) {

    const item = cart.find(cartItem => cartItem.id === id);

    if (!item) {

        return;

    }

    if (action === "increase") {

        item.quantity += 1;

    }

    if (action === "decrease") {

        item.quantity -= 1;

    }

    if (action === "remove" || item.quantity <= 0) {

        cart = cart.filter(cartItem => cartItem.id !== id);

    }

    renderCart();

}

document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => addToCart(button));

});

if (cartToggle) {

    cartToggle.addEventListener("click", openCart);

}

if (cartClose) {

    cartClose.addEventListener("click", closeCart);

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCart);

}

if (cartItems) {

    cartItems.addEventListener("click", event => {

        const button = event.target.closest("button");

        if (!button) {

            return;

        }

        updateCartItem(button.dataset.id, button.dataset.action);

    });

}

if (cartClear) {

    cartClear.addEventListener("click", () => {

        cart = [];

        renderCart();

    });

}

cart = normalizeCartItems(getStoredCart());

renderCart();

/*=========================================================
SHOP FILTERING & SORTING COLLECTION INTERACTION
==========================================================*/
document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("shop-product-grid");
    if (!productGrid) return;

    const categoryItems = document.querySelectorAll(".shop-categories li");
    const sortTrigger = document.getElementById("sort-trigger");
    const sortMenu = document.getElementById("sort-menu");
    const sortItems = document.querySelectorAll("#sort-menu li");
    const visibleCountSpan = document.getElementById("visible-count");

    // Load and wrap all product cards
    const cards = Array.from(productGrid.querySelectorAll(".product-card"));
    
    // Parse products and extract information
    const products = cards.map((card, index) => {
        const titleEl = card.querySelector("h3");
        const descEl = card.querySelector("p");
        const title = titleEl ? titleEl.textContent : "";
        const desc = descEl ? descEl.textContent : "";
        const textLower = (title + " " + desc).toLowerCase();
        const badgeEl = card.querySelector(".product-badge");
        const badge = badgeEl ? badgeEl.textContent.toLowerCase() : "";
        
        // Find price
        const priceEl = card.querySelector(".product-price");
        let price = 0;
        if (priceEl) {
            const matches = priceEl.textContent.match(/\d+/g);
            if (matches) {
                price = parseInt(matches.join(""), 10);
            }
        }

        // Determine if it is table or sink
        const isTable = badge.includes("table") || textLower.includes("table");
        const isSink = !isTable;

        // Categorize
        const gemstoneKws = ["gemstone", "malachite", "amethyst", "quartz", "agate", "lapis", "tiger eye", "jasper", "aventurine", "sodalite", "fluorite", "labradorite", "semi precious", "turquoise"];
        const hasGemstone = gemstoneKws.some(kw => textLower.includes(kw));

        const categories = ["all", "on-sale"];

        // 1. Luxury Gemstone Sink
        if (isSink && hasGemstone) {
            categories.push("gemstone-sink");
        }
        // 2. Luxurious Marble Sinks
        if (isSink && textLower.includes("marble") && !hasGemstone && !textLower.includes("onyx")) {
            categories.push("marble-sink");
        }
        // 3. Marble Sinks with Vanity
        if (isSink && (textLower.includes("double") || textLower.includes("cabinet") || textLower.includes("drawer"))) {
            categories.push("vanity-sink");
        }
        // 4. Marble Side Tables
        if (isTable && (textLower.includes("marble") || textLower.includes("onyx")) && !hasGemstone) {
            categories.push("marble-table");
        }
        // 5. Gemstone Side Tables
        if (isTable && hasGemstone) {
            categories.push("gemstone-table");
        }
        // 6. Semi Precious Stones
        if (textLower.includes("semi precious") || (hasGemstone && isTable)) {
            categories.push("semi-precious");
        }
        // 7. Luxury Pedestal Sinks
        if (isSink && textLower.includes("pedestal")) {
            categories.push("pedestal-sink");
        }
        // 8. Luxury Onyx Stone Sinks
        if (isSink && textLower.includes("onyx")) {
            categories.push("onyx-sink");
        }

        return {
            element: card,
            title,
            price,
            index, // Relevance / Default order
            categories
        };
    });

    let currentCategory = "all";
    let currentSort = "relevance";

    // Set filter category items count dynamically
    const categoryCounts = {
        "all": products.length,
        "on-sale": products.length,
        "gemstone-sink": 0,
        "marble-sink": 0,
        "vanity-sink": 0,
        "marble-table": 0,
        "gemstone-table": 0,
        "semi-precious": 0,
        "pedestal-sink": 0,
        "onyx-sink": 0
    };

    products.forEach(p => {
        p.categories.forEach(c => {
            if (c !== "all" && c !== "on-sale" && c in categoryCounts) {
                categoryCounts[c]++;
            }
        });
    });

    // Update count labels in sidebar
    categoryItems.forEach(item => {
        const cat = item.dataset.category;
        const countSpan = item.querySelector("span");
        if (countSpan && cat in categoryCounts) {
            countSpan.textContent = `(${categoryCounts[cat]})`;
        }
    });

    // Toggle sorting dropdown menu
    if (sortTrigger && sortMenu) {
        sortTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            sortMenu.classList.toggle("show");
            sortTrigger.classList.toggle("open");
        });

        document.addEventListener("click", () => {
            sortMenu.classList.remove("show");
            sortTrigger.classList.remove("open");
        });
    }

    // Apply filtering and sorting
    function updateList() {
        // 1. Filter
        let visibleProducts = products.filter(p => p.categories.includes(currentCategory));

        // Hide all cards first
        products.forEach(p => p.element.classList.add("hidden"));

        // 2. Sort
        visibleProducts.sort((a, b) => {
            if (currentSort === "price-asc") {
                return a.price - b.price;
            } else if (currentSort === "price-desc") {
                return b.price - a.price;
            } else if (currentSort === "recent") {
                return b.index - a.index; // Descending index
            } else {
                return a.index - b.index; // Relevance (Default index)
            }
        });

        // 3. Render visible & sorted in DOM
        visibleProducts.forEach(p => {
            p.element.classList.remove("hidden");
            productGrid.appendChild(p.element);
        });

        // 4. Update count
        if (visibleCountSpan) {
            visibleCountSpan.textContent = visibleProducts.length;
        }

        // Trigger reveal scroll effect check if function exists in template
        if (typeof reveal === "function") {
            reveal();
        }
    }

    // Category click handler
    categoryItems.forEach(item => {
        item.addEventListener("click", () => {
            categoryItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            currentCategory = item.dataset.category;
            updateList();
        });
    });

    // Sort item click handler
    sortItems.forEach(item => {
        item.addEventListener("click", () => {
            sortItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            
            const sortVal = item.dataset.sort;
            currentSort = sortVal;

            if (sortTrigger) {
                const label = item.textContent.trim();
                sortTrigger.querySelector("span").textContent = label;
            }

            updateList();
        });
    });

    // Initial load
    updateList();
});

/*=========================================================
FAQ ACCORDION INTERACTION
==========================================================*/
document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const answer = item.querySelector(".faq-answer");
            
            // Toggle active state
            const isActive = item.classList.contains("active");
            
            // Close other items (accordion behavior)
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                otherItem.classList.remove("active");
                const otherAnswer = otherItem.querySelector(".faq-answer");
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                item.classList.remove("active");
                answer.style.maxHeight = null;
            }
        });
    });
});
