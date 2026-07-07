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

            ? "✕"

            : "☰";

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

            menuBtn.innerHTML = "☰";

        }

    });

});





/*=========================================================
STICKY NAVBAR
=========================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});





/*=========================================================
SCROLL REVEAL
=========================================================*/

const reveals = document.querySelectorAll(".reveal");

function revealElements() {

    const windowHeight = window.innerHeight;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealElements);

window.addEventListener("load", revealElements);





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
