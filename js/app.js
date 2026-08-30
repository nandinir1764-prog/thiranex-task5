import { router } from "./router.js";
import { products } from "./products.js";

let cart = [];

const app = document.getElementById("app");


function renderProducts() {

    let productHTML = "";

    products.forEach(product => {

        productHTML += `
            <div class="product-card">

                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">₹${product.price}</p>

                <p>⭐ ${product.rating}</p>

                <a href="#/product/${product.id}" class="details-btn">
                    View Details
                </a>

            </div>
        `;
    });

    return `
        <section>
            <h2>Our Products 🛍️</h2>

            <div class="product-grid">
                ${productHTML}
            </div>
        </section>
    `;
}


function renderProductDetails(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) {

        return `
            <section>
                <h2>Product Not Found ❌</h2>

                <a href="#/products">
                    Back to Products
                </a>
            </section>
        `;
    }

    return `
        <section class="product-details">

            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">

            <div>

                <h2>${product.name}</h2>

                <p>Category: ${product.category}</p>

                <p class="price">₹${product.price}</p>

                <p>⭐ ${product.rating}</p>

                <p>
                    This is a high-quality ${product.name}
                    available at ShopSphere.
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart 🛒
                </button>

                <br><br>

                <a href="#/products">
                    ← Back to Products
                </a>

            </div>

        </section>
    `;
}


function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (product) {

        cart.push(product);

        alert(`${product.name} added to cart!`);

        console.log("Cart:", cart);
    }
}


function renderCart() {

    if (cart.length === 0) {

        return `
            <section class="cart">

                <h2>Your Cart 🛒</h2>

                <p>Your cart is empty.</p>

                <a href="#/products" class="details-btn">
                    Continue Shopping
                </a>

            </section>
        `;
    }


    let cartHTML = "";
    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;

        cartHTML += `
            <div class="cart-item">

                <img src="${product.image}"
                     alt="${product.name}">

                <div>

                    <h3>${product.name}</h3>

                    <p>₹${product.price}</p>

                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });


    return `
        <section class="cart">

            <h2>Your Cart 🛒</h2>

            ${cartHTML}

            <h3 class="cart-total">
                Total: ₹${total}
            </h3>

            <button onclick="clearCart()">
                Clear Cart
            </button>

            <br><br>

            <a href="#/products">
                ← Continue Shopping
            </a>

        </section>
    `;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    renderPage();
}


function clearCart() {

    cart = [];

    renderPage();
}


function renderPage() {

    const route = router();


    if (route.page === "products") {

        app.innerHTML = renderProducts();

    }

    else if (route.page === "product") {

        app.innerHTML = renderProductDetails(route.id);

    }

    else if (route.page === "cart") {

        app.innerHTML = renderCart();

    }

    else if (route.page === "home") {

    app.innerHTML = `
        <section>
            <h2>Welcome to ShopSphere 🛍️</h2>
            <p>Discover quality products at great prices.</p>

            <br>

            <a href="#/products" class="details-btn">
                Shop Now
            </a>
        </section>
    `;
}

else if (route.page === "about") {

    app.innerHTML = `
        <section>
            <h2>About ShopSphere</h2>
            <p>
                ShopSphere is a simple e-commerce product catalog
                created as a web development capstone project.
            </p>
        </section>
    `;
}

else if (route.page === "contact") {

    app.innerHTML = `
        <section>
            <h2>Contact Us</h2>

            <p>Email: support@shopsphere.com</p>
            <p>Phone: +91 98765 43210</p>
        </section>
    `;
}

else {

    app.innerHTML = `
        <section>
            <h2>Page Not Found ❌</h2>
            <a href="#/home">Go Home</a>
        </section>
    `;
}
}


/* Make functions available to HTML buttons */

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;


renderPage();

window.addEventListener("hashchange", renderPage);