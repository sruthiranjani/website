/* ==================== SHARED UI FUNCTIONS ==================== */

/**
 * Update cart badge in navbar with current item count
 */
function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  if (cartBadge) {
    const count = getCartCount();
    if (count > 0) {
      cartBadge.textContent = count;
      cartBadge.style.display = "flex";
    } else {
      cartBadge.style.display = "none";
    }
  }
}

/**
 * Toggle hamburger menu on mobile
 */
function toggleHamburgerMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navCenter = document.querySelector(".nav-center");

  if (hamburgerBtn && navCenter) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navCenter.classList.toggle("active");
    });

    // Close menu when link clicked
    navCenter.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navCenter.classList.remove("active");
      });
    });
  }
}

/**
 * Show toast notification with optional buttons
 * @param {string} message - Toast message
 * @param {Array} buttons - Optional buttons array [{text, callback, isPrimary}]
 * @param {number} duration - Auto-close duration in ms (0 = no auto-close)
 */
function showToast(message, buttons = [], duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";

  let html = `<div class="toast-content">${message}</div>`;

  if (buttons.length > 0) {
    html += '<div class="toast-buttons">';
    buttons.forEach((btn) => {
      const btnClass = btn.isPrimary
        ? "toast-btn toast-btn-primary"
        : "toast-btn toast-btn-secondary";
      html += `<button class="${btnClass}">${btn.text}</button>`;
    });
    html += "</div>";
  }

  toast.innerHTML = html;
  document.body.appendChild(toast);

  // Add button click handlers
  toast.querySelectorAll(".toast-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (buttons[index].callback) {
        buttons[index].callback();
      }
      toast.remove();
    });
  });

  // Auto remove toast after duration
  if (duration > 0) {
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, duration);
  }
}

/**
 * Get URL query parameter by name
 * @param {string} paramName - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getURLParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

/**
 * Navigate to URL with optional parameters
 * @param {string} url - Destination URL
 * @param {Object} params - Optional query parameters
 */
function navigateToURL(url, params = {}) {
  let queryString = "";
  if (Object.keys(params).length > 0) {
    queryString =
      "?" + new URLSearchParams(params).toString();
  }
  window.location.href = url + queryString;
}

/* ==================== ACCORDION FUNCTIONS ==================== */

/**
 * Initialize accordion functionality
 */
function initAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");

    if (header) {
      header.addEventListener("click", () => {
        // Close other accordions
        accordions.forEach((other) => {
          if (other !== accordion) {
            other.classList.remove("active");
          }
        });

        // Toggle current accordion
        accordion.classList.toggle("active");
      });
    }
  });
}

/* ==================== TAB FUNCTIONS ==================== */

/**
 * Initialize tab switching
 */
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      const activeContent = document.querySelector(
        `.tab-content[data-tab="${tabName}"]`
      );
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });
}

/* ==================== PAGE INITIALIZATION ==================== */

/**
 * Initialize all common page elements
 */
function initPage() {
  updateCartBadge();
  toggleHamburgerMenu();
  initAccordions();
  initTabs();
}

// Run on page load
document.addEventListener("DOMContentLoaded", initPage);

/* ==================== PRODUCT PAGE FUNCTIONS ==================== */

/**
 * Load and display product details
 */
function loadProductDetail() {
  const productId = parseInt(getURLParam("id"));
  const product = products.find((p) => p.id === productId);

  if (!product) {
    document.body.innerHTML = "<p>Product not found.</p>";
    return;
  }

  // Populate product details
  const detailContainer = document.querySelector(".product-detail");
  if (detailContainer) {
    const html = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image-large">
      </div>
      <div class="product-details">
        <p class="product-category">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="product-price">₹${product.price}</p>
        <p class="product-description">${product.description}</p>
        
        <div class="product-options">
          <div class="quantity-selector">
            <button class="qty-btn" id="qty-minus">−</button>
            <input type="number" id="qty-input" class="qty-input" value="1" min="1">
            <button class="qty-btn" id="qty-plus">+</button>
          </div>
          <button class="btn btn-primary btn-large" id="add-to-cart-btn">Add to Cart</button>
        </div>
        
        <a href="shop.html" class="back-link">← Back to Shop</a>
      </div>
    `;

    detailContainer.innerHTML = html;

    // Quantity controls
    const qtyInput = document.getElementById("qty-input");
    const qtyMinus = document.getElementById("qty-minus");
    const qtyPlus = document.getElementById("qty-plus");
    const addBtn = document.getElementById("add-to-cart-btn");

    qtyMinus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value);
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener("click", () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    // Add to cart
    addBtn.addEventListener("click", () => {
      const quantity = parseInt(qtyInput.value);
      addToCart(product, quantity);
      updateCartBadge();

      showToast("Added to cart!", [
        {
          text: "View Cart",
          callback: () => {
            navigateToURL("cart.html");
          },
          isPrimary: true,
        },
        {
          text: "Continue Shopping",
          callback: () => {
            navigateToURL("shop.html");
          },
          isPrimary: false,
        },
      ]);
    });
  }
}

/* ==================== SHOP PAGE FUNCTIONS ==================== */

/**
 * Render product grid with filters
 */
function renderProductGrid(filter = "All") {
  const gridContainer = document.querySelector(".product-grid");
  if (!gridContainer) return;

  let filtered = products;
  if (filter !== "All") {
    filtered = products.filter((p) => p.category === filter);
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = '<div class="empty-state"><h3>No products found</h3></div>';
    return;
  }

  const html = filtered
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹${product.price}</p>
        <button class="product-btn" onclick="navigateToURL('product.html', {id: ${product.id}})">View Details</button>
      </div>
    </div>
  `
    )
    .join("");

  gridContainer.innerHTML = html;
}

/**
 * Load shop page with filters and search
 */
function loadShopPage() {
  const categoryParam = getURLParam("category") || "All";

  // Set active filter tab
  const filterTabs = document.querySelectorAll(".filter-tab");
  filterTabs.forEach((tab) => {
    tab.classList.remove("active");
    if (tab.getAttribute("data-category") === categoryParam) {
      tab.classList.add("active");
    }
  });

  renderProductGrid(categoryParam);

  // Filter tab click handlers
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-category");
      renderProductGrid(category);

      const searchInput = document.querySelector(".search-input");
      if (searchInput) searchInput.value = "";
    });
  });

  // Search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const activeTab = document.querySelector(".filter-tab.active");
      const activeCategory = activeTab
        ? activeTab.getAttribute("data-category")
        : "All";

      let filtered = products;
      if (activeCategory !== "All") {
        filtered = filtered.filter((p) => p.category === activeCategory);
      }
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query)
      );

      const gridContainer = document.querySelector(".product-grid");
      if (!gridContainer) return;

      if (filtered.length === 0) {
        gridContainer.innerHTML =
          '<div class="empty-state"><h3>No products found</h3></div>';
        return;
      }

      gridContainer.innerHTML = filtered
        .map(
          (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            <button class="product-btn" onclick="navigateToURL('product.html', {id: ${product.id}})">View Details</button>
          </div>
        </div>
      `
        )
        .join("");
    });
  }
}

/* ==================== CART PAGE FUNCTIONS ==================== */

/**
 * Render cart items on cart page
 */
function renderCartItems() {
  const cartContainer = document.querySelector(".cart-items");
  const cart = getCart();

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add some products to get started</p>
        <button class="btn btn-primary" onclick="navigateToURL('shop.html')">Shop Now →</button>
      </div>
    `;

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) checkoutBtn.style.display = "none";

    const totalDiv = document.querySelector(".cart-total");
    if (totalDiv) totalDiv.innerHTML = "";
    return;
  }

  let html = "";
  cart.forEach((item) => {
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">₹${item.price}</p>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="handleRemoveCartItem(${item.id}, -1)">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="handleRemoveCartItem(${item.id}, 1)">+</button>
        </div>
        <div class="cart-item-subtotal">₹${item.price * item.quantity}</div>
        <button class="cart-remove-btn" onclick="handleRemoveCartItem(${item.id}, 'remove')">✕</button>
      </div>
    `;
  });

  cartContainer.innerHTML = html;

  // Update totals
  const total = getCartTotal();
  const totalDiv = document.querySelector(".cart-total");
  if (totalDiv) {
    totalDiv.innerHTML = `<h3>Order Total: ₹${total}</h3>`;
  }
}

/**
 * Handle cart item quantity changes and removal
 */
function handleRemoveCartItem(productId, action) {
  if (action === "remove") {
    removeFromCart(productId);
  } else if (action === 1 || action === -1) {
    updateQuantity(productId, action);
  }

  updateCartBadge();
  renderCartItems();
}

/* ==================== CHECKOUT PAGE FUNCTIONS ==================== */

/**
 * Render checkout order summary
 */
function renderCheckoutSummary() {
  const summaryContainer = document.querySelector(".order-summary");
  const cart = getCart();

  if (!summaryContainer) return;

  if (cart.length === 0) {
    navigateToURL("shop.html");
    return;
  }

  let html = "";
  cart.forEach((item) => {
    html += `
      <div class="summary-item">
        <div>
          <strong>${item.name}</strong> x ${item.quantity}
        </div>
        <div>₹${item.price * item.quantity}</div>
      </div>
    `;
  });

  const total = getCartTotal();
  html += `
    <div class="summary-total">
      <strong>Total:</strong>
      <strong>₹${total}</strong>
    </div>
  `;

  summaryContainer.innerHTML = html;
}

/**
 * Validate checkout form
 */
function validateCheckoutForm() {
  const fields = ["fullname", "phone", "street", "city", "pincode"];
  let isValid = true;

  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest(".form-group");
    const errorMsg = formGroup.querySelector(".error-message");

    if (!field.value.trim()) {
      formGroup.classList.add("error");
      if (errorMsg) {
        errorMsg.textContent = "This field is required";
      }
      isValid = false;
    } else {
      formGroup.classList.remove("error");
    }
  });

  return isValid;
}

/**
 * Handle checkout form submission — saves to Supabase + localStorage
 */
function handleCheckoutSubmit() {
  const submitBtn = document.querySelector(".place-order-btn");

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      if (!validateCheckoutForm()) {
        return;
      }

      const cart = getCart();
      const total = getCartTotal();
      const user = getUser();

      const customerName = document.getElementById("fullname").value;
      const customerPhone = document.getElementById("phone").value;
      const street = document.getElementById("street").value;
      const city = document.getElementById("city").value;
      const pincode = document.getElementById("pincode").value;
      const fullAddress = `${street}, ${city} - ${pincode}`;

      // ── Save to Supabase ──
      try {
        const SUPABASE_URL = 'https://rjjruxjuayqgefhelloz.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_9pZjdtNSoPdewyZNJ2FfyA_iRsSgHNs';
        const { createClient } = supabase;
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

        await supabaseClient.from('orders').insert([{
          user_email: user ? user.email : customerPhone,
          items: cart,
          total: total,
          status: 'Confirmed',
          address: fullAddress
        }]);
      } catch (err) {
        console.log('Supabase save attempted:', err);
      }

      // ── Also save to localStorage (backup) ──
      const order = {
        items: cart,
        total: total,
        customer: {
          name: customerName,
          phone: customerPhone,
          street: street,
          city: city,
          pincode: pincode,
        },
      };

      addOrder(order);
      clearCart();
      updateCartBadge();

      showToast("Order placed successfully! We'll deliver soon.", [], 0);

      setTimeout(() => {
        navigateToURL("orders.html");
      }, 2000);
    });
  }
}

/* ==================== ORDERS PAGE FUNCTIONS ==================== */

/**
 * Load and display user orders — from Supabase first, localStorage as backup
 */
async function loadOrdersPage() {
  const user = getUser();
  if (!user) {
    showToast("Please login to view orders", [], 2000);
    setTimeout(() => {
      navigateToURL("login.html");
    }, 2000);
    return;
  }

  const ordersContainer = document.querySelector(".orders-list");
  if (!ordersContainer) return;

  // ── Try Supabase first ──
  try {
    const SUPABASE_URL = 'https://rjjruxjuayqgefhelloz.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_9pZjdtNSoPdewyZNJ2FfyA_iRsSgHNs';
    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { data: supabaseOrders, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('user_email', user.email)
      .order('created_at', { ascending: false });

    if (!error && supabaseOrders && supabaseOrders.length > 0) {
      let html = "";
      supabaseOrders.forEach((order, index) => {
        const itemsHtml = order.items
          .map(
            (item) => `
              <div class="order-item">
                <img src="${item.image}" alt="${item.name}" />
                <div class="order-item-details">
                  <h4>${item.name}</h4>
                  <p>₹${item.price} × ${item.quantity}</p>
                </div>
              </div>`
          )
          .join("");

        html += `
          <div class="order-card">
            <div class="order-card-header">
              <div>
                <h3>Order #${String(index + 1).padStart(2, "0")}</h3>
                <p class="order-date">Placed on: ${new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <span class="status-badge">${order.status}</span>
            </div>
            <div class="order-items">${itemsHtml}</div>
            <div class="order-card-footer">
              <p><strong>Total:</strong> ₹${order.total}</p>
            </div>
          </div>
        `;
      });

      ordersContainer.innerHTML = html;
      return;
    }
  } catch (err) {
    console.log('Supabase fetch attempted:', err);
  }

  // ── Fallback: localStorage orders ──
  const orders = getOrders();

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <div class="empty-state">
        <h3>No orders yet</h3>
        <p>Start shopping to place your first order</p>
        <button class="btn btn-primary" onclick="navigateToURL('shop.html')">Shop Now</button>
      </div>
    `;
    return;
  }

  let html = "";
  orders.forEach((order) => {
    const itemsHtml = order.items
      .map(
        (item) => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="order-item-details">
              <h4>${item.name}</h4>
              <p>₹${item.price} × ${item.quantity}</p>
            </div>
          </div>`
      )
      .join("");

    html += `
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <h3>Order #${String(order.id).padStart(2, "0")}</h3>
            <p class="order-date">Placed on: ${order.date}</p>
          </div>
          <span class="status-badge">${order.status}</span>
        </div>
        <div class="order-items">${itemsHtml}</div>
        <div class="order-card-footer">
          <p><strong>Total:</strong> ₹${order.total}</p>
        </div>
      </div>
    `;
  });

  ordersContainer.innerHTML = html;
}

/* ==================== LOGIN PAGE FUNCTIONS ==================== */

/**
 * Initialize login/signup tabs
 */
function initLoginPage() {
  const user = getUser();
  if (user) {
    showToast(`Welcome back, ${user.name}!`, [], 1500);
    setTimeout(() => {
      navigateToURL("orders.html");
    }, 1500);
    return;
  }

  initTabs();
  handleSignUp();
  handleLogin();
}

/**
 * Handle sign up form — saves to Supabase + localStorage
 */
function handleSignUp() {
  const signupBtn = document.querySelector("#signup-btn");

  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const phone = document.getElementById("signup-phone").value;

      if (!name || !email || !phone) {
        showToast("Please fill in all fields", [], 2000);
        return;
      }

      // ── Save to Supabase ──
      try {
        const SUPABASE_URL = 'https://rjjruxjuayqgefhelloz.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_9pZjdtNSoPdewyZNJ2FfyA_iRsSgHNs';
        const { createClient } = supabase;
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

        await supabaseClient.from('users').insert([{ name, email, phone }]);
      } catch (err) {
        console.log('Supabase signup attempted:', err);
      }

      // ── Save to localStorage ──
      const user = { name, email, phone };
      saveUser(user);

      showToast(`Welcome, ${name}!`, [], 1500);
      setTimeout(() => {
        navigateToURL("orders.html");
      }, 1500);
    });
  }
}

/**
 * Handle login form — checks Supabase first, localStorage as backup
 */
function handleLogin() {
  const loginBtn = document.querySelector("#login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value;

      if (!email) {
        showToast("Please enter your email", [], 2000);
        return;
      }

      // ── Check Supabase ──
      try {
        const SUPABASE_URL = 'https://rjjruxjuayqgefhelloz.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_9pZjdtNSoPdewyZNJ2FfyA_iRsSgHNs';
        const { createClient } = supabase;
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

        const { data, error } = await supabaseClient
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (!error && data) {
          saveUser({ name: data.name, email: data.email, phone: data.phone });
          showToast(`Welcome back, ${data.name}!`, [], 1500);
          setTimeout(() => navigateToURL("orders.html"), 1500);
          return;
        }
      } catch (err) {
        console.log('Supabase login attempted:', err);
      }

      // ── Fallback: localStorage login ──
      const user = { email, name: "User", phone: "" };
      saveUser(user);

      showToast("Login successful!", [], 1500);
      setTimeout(() => {
        navigateToURL("orders.html");
      }, 1500);
    });
  }
}

/* ==================== CONTACT PAGE FUNCTIONS ==================== */

/**
 * Handle contact form submission — saves to Supabase + shows toast
 */
function handleContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const message = document.getElementById("contact-message").value;

      if (!name || !email || !message) {
        showToast("Please fill in all fields", [], 2000);
        return;
      }

      // ── Save to Supabase ──
      try {
        const SUPABASE_URL = 'https://rjjruxjuayqgefhelloz.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_9pZjdtNSoPdewyZNJ2FfyA_iRsSgHNs';
        const { createClient } = supabase;
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

        await supabaseClient.from('contacts').insert([{ email, message }]);
      } catch (err) {
        console.log('Supabase contact attempted:', err);
      }

      showToast("Message sent! We'll get back to you soon.", [], 3000);
      contactForm.reset();
    });
  }
}
