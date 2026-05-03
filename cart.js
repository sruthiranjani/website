/* ==================== CART MANAGEMENT (localStorage) ==================== */

/**
 * Get all items from cart (from localStorage)
 * @returns {Array} Cart items array
 */
function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Add product to cart or increment quantity if exists
 * @param {Object} product - Product object with id, name, price, image
 * @param {Number} quantity - Quantity to add (default 1)
 */
function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCart(cart);
}

/**
 * Remove item from cart by product id
 * @param {Number} productId - Product ID to remove
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
}

/**
 * Update quantity of item in cart
 * @param {Number} productId - Product ID to update
 * @param {Number} delta - Change in quantity (+1 or -1)
 */
function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += delta;
    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }

  saveCart(cart);
}

/**
 * Get total number of items in cart
 * @returns {Number} Total item count
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get total price of cart
 * @returns {Number} Total price
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Clear entire cart
 */
function clearCart() {
  localStorage.removeItem("cart");
}

/**
 * Get orders array from localStorage
 * @returns {Array} Orders array
 */
function getOrders() {
  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : [];
}

/**
 * Save orders to localStorage
 * @param {Array} orders - Orders array
 */
function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

/**
 * Add new order to localStorage
 * @param {Object} orderData - Order data with items, total, etc.
 */
function addOrder(orderData) {
  const orders = getOrders();
  const orderNumber = orders.length + 1;

  const order = {
    id: orderNumber,
    date: new Date().toLocaleDateString(),
    items: orderData.items,
    total: orderData.total,
    status: "Confirmed",
    ...orderData,
  };

  orders.push(order);
  saveOrders(orders);
  return order;
}

/**
 * Get user from localStorage
 * @returns {Object|null} User object or null if not logged in
 */
function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * Save user to localStorage
 * @param {Object} userData - User data with name, email, phone
 */
function saveUser(userData) {
  localStorage.setItem("user", JSON.stringify(userData));
}

/**
 * Clear user (logout)
 */
function clearUser() {
  localStorage.removeItem("user");
}
