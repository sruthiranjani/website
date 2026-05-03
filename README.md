
 WithMore Gifts — Accessories E-Commerce Website

A fully functional, professionally designed e-commerce website for a trendy accessories store. Built with pure HTML, CSS, and JavaScript with Supabase as the backend database.

---


🔗 [View Live Website]
https://sruthiranjani.github.io/website/
---

 Preview

> A luxury-lite, clean, and minimal accessories store with full shopping functionality.

---
 Features

 Shopping
- Browse all 8 accessories products
- Filter by category — Chains, Earrings, Bracelets
- Search products by name (live filter)
- Product detail page with quantity selector
- Add to cart with toast notification

Cart System
- Add / remove items
- Update quantity
- Real-time order total
- Cart persists on page refresh (localStorage)

 User Accounts
- Sign Up with Name, Email, Phone
- Login with Email
- User data saved to Supabase database

 Orders
- Full checkout flow with delivery details
- Orders saved permanently to Supabase
- View all past orders on My Orders page
- Order status badge — "Confirmed"

 Contact
- Contact form saves messages to Supabase
- Instagram and Phone info displayed

All Pages
- Home, Shop, Product Details, Cart
- Checkout, Orders, Login
- About, Contact, FAQ
- Privacy Policy, Terms & Conditions

---

 Backend — Supabase

| Table | Purpose |
|---|---|
| `users` | Stores customer accounts |
| `products` | Product catalog |
| `orders` | Customer orders |
| `contacts` | Contact form messages |

---

 Design System

| Element | Value |
|---|---|
| Background | `#FAFAF8` (off-white) |
| Primary Accent | `#C9A96E` (warm gold) |
| Text | `#1A1A1A` |
| Font — Headings | Cormorant Garamond |
| Font — Body | DM Sans |
| Style | Luxury-lite, minimal, clean |

---

 Project Structure

```
/project1
  /images          → Product images
  /css
    styles.css     → All styling
  /js
    products.js    → Product data
    cart.js        → Cart logic
    script.js      → Page functions + Supabase
  index.html       → Home page
  shop.html        → Shop / Products
  product.html     → Product details
  cart.html        → Shopping cart
  checkout.html    → Checkout + order placement
  orders.html      → My orders
  login.html       → Login / Sign up
  about.html       → About us
  contact.html     → Contact form
  faq.html         → FAQ accordion
  privacy.html     → Privacy policy
  terms.html       → Terms & conditions
```

---

Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling & animations |
| JavaScript (Vanilla) | Frontend logic |
| Supabase | Backend database |
| localStorage | Cart & session backup |
| Google Fonts | Typography |

---
 Getting Started

 1. Clone the Repository
```bash
git clone https://github.com/yourusername/withmore-gifts.git
```

 2. Open Locally
```bash
# Just open index.html in your browser
# No server needed!
```
 3. Supabase Setup
- Create a free account at [supabase.com](https://supabase.com)
- Create these tables: `users`, `products`, `orders`, `contacts`
- Replace the Supabase URL and Key in `script.js`

---

 Products

| # | Name | Category | Price |
|---|---|---|---|
| 1 | Heart Chain | Chains | ₹129 |
| 2 | Classic Jhumkas | Earrings | ₹49 |
| 3 | Designer Jhumkas Set | Earrings | ₹122 |
| 4 | Butterfly Earrings | Earrings | ₹50 |
| 5 | Butterfly Handcuff | Bracelets | ₹70 |
| 6 | Pearl Bracelet | Bracelets | ₹120 |
| 7 | Floral | Chains | ₹170 |
| 8 | Panda Chain | Chains | ₹150 |

---

 Responsive Design

| Device | Layout |
|---|---|
| Mobile (< 768px) | 2 columns, hamburger menu |
| Tablet (768–1024px) | 3 column grid |
| Desktop (> 1024px) | 4 column grid |

---

 Future Enhancements

- [ ] Razorpay payment integration
- [ ] Real password authentication
- [ ] Order tracking system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Wishlist feature

---

 Developed By

**Sruthiranjani**
- 🌐 GitHub: [@sruthiranjani](https://github.com/sruthiranjani)
- 📸 Instagram: [@_.wearmore._gifts](https://instagram.com/_.wearmore._gifts)

---

License

© 2026 WithMore Gifts. All rights reserved.
