let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}


let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}


let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Swiper for Product Slider
var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});



let itemCount = 0;
let totalCost = 0;

const cartItemsContainer = document.querySelector('.cart-items');
const totalCostElement = document.querySelector('.total-cost');
const paymentMethodsElement = document.querySelector('.payment-methods');

let cartItems = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').innerText;
        const priceText = productCard.querySelector('.price').innerText;
        const priceRange = priceText.match(/(\d+)/g);
        const price = parseInt(priceRange[0]);

        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
            existingItem.weight += 1;
        } else {
            cartItems.push({
                name: productName,
                price: price,
                quantity: 1,
                weight: 1
            });
        }
        updateCartDisplay();

       
        if (cartItems.length > 0) {
            paymentMethodsElement.style.display = 'block';
        }

        const addedMsg = productCard.querySelector('.added-msg');
        addedMsg.classList.add('show');
        setTimeout(() => {
            addedMsg.classList.remove('show');
        }, 2000);
    });
});

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    totalCost = 0;

    cartItems.forEach(item => {
        const itemTotal = item.price * item.weight;
        totalCost += itemTotal;

        const cartItemHTML = `
            <div class="box" data-product="${item.name}">
                <h3>${item.name}</h3>
                <span class="price">₹${item.price} x ${item.weight}kg</span>
                <div class="quantity-controls">
                    <button class="minus-btn" onclick="decreaseQuantity('${item.name}')">-</button>
                    <span class="quantity">Qty: ${item.quantity}</span>
                    <button class="plus-btn" onclick="increaseQuantity('${item.name}')">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    totalCostElement.textContent = totalCost;
}

function increaseQuantity(productName) {
    const item = cartItems.find(item => item.name === productName);
    item.quantity++;
    item.weight += 1;
    updateCartDisplay();
}

function decreaseQuantity(productName) {
    const item = cartItems.find(item => item.name === productName);

    if (item.quantity > 1) {
        item.quantity--;
        item.weight -= 1;
    } else {
        cartItems = cartItems.filter(item => item.name !== productName);
    }

    updateCartDisplay();


    if (cartItems.length === 0) {
        paymentMethodsElement.style.display = 'none';
    }
}

const paymentCards = document.querySelectorAll('.payment-card');
const cardDetails = document.querySelector('.card-details');
const upiDetails = document.querySelector('.upi-details');
const codDetails = document.querySelector('.cod-details');
const payNowBtn = document.querySelector('.pay-now-btn');

function resetPaymentDetails() {
    cardDetails.style.display = 'none';
    upiDetails.style.display = 'none';
    codDetails.style.display = 'none';
}

paymentCards.forEach(card => {
    card.addEventListener('click', () => {
        paymentCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        resetPaymentDetails();
        const method = card.getAttribute('data-method');
        if (method === 'credit-card' || method === 'debit-card') {
            cardDetails.style.display = 'block';
        } else if (method === 'upi') {
            upiDetails.style.display = 'block';
        } else if (method === 'cod') {
            codDetails.style.display = 'block';
        }
    });
});


payNowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedMethod = document.querySelector('.payment-card.active');
    if (!selectedMethod) {
        alert("Please select a payment method!");
        return;
    }
    cartItems = [];
    cartItemsContainer.innerHTML = '';
    totalCostElement.textContent = '0';
    paymentMethodsElement.style.display = 'none';
    alert("Payment successful! Your order has been placed.");
    resetPaymentDetails();
    paymentCards.forEach(c => c.classList.remove('active'));
});
