import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice"; 
import "./CartItem.css";

const CartItems = ({ onContinueShopping }) => {
  const dispatch = useDispatch();

  // Grab cart items from Redux state
  const items = useSelector((state) => state.cart.items);

  // Calculate subtotal for one item
  const calculateItemTotal = (item) => item.cost * item.quantity;

  // Calculate total for all items
  const calculateTotalAmount = () =>
    items.reduce((total, item) => total + calculateItemTotal(item), 0);

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity (or remove if goes to 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); 
    }
  };

  // Remove an item directly
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); 
  };

  // Continue shopping (go back to product list)
  const handleContinueShopping = (e) => {
    onContinueShopping(e); // parent passed function
  };

  // (Optional) Checkout
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.cost}</p>

              <div className="cart-item-quantity">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>

              <p>Total: ${calculateItemTotal(item).toFixed(2)}</p>

              <button
                className="delete-button"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="cart-actions">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItems;