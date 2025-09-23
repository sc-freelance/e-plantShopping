import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList.jsx";
import CartItems from "./CartItem.jsx";
import Landing from "./Landing.jsx"; // make sure Landing.jsx is in src/

import "./App.css"; // your global styles (also navbar styling)

const App = () => {
  const [page, setPage] = useState("landing"); // start at landing

  // Live cart count from Redux
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div>
      {/* Navbar always visible */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setPage("products")}>
          🌱 Plant Shop
        </div>
        <div className="navbar-links">
          <button onClick={() => setPage("products")}>Shop</button>
          <button onClick={() => setPage("cart")}>Cart ({cartCount})</button>
        </div>
      </nav>

      {/* Conditional rendering */}
      {page === "landing" && (
        <Landing onStartShopping={() => setPage("products")} />
      )}
      {page === "products" && <ProductList />}
      {page === "cart" && (
        <CartItems onContinueShopping={() => setPage("products")} />
      )}
    </div>
  );
};

export default App;