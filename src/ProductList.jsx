import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice"; // adjust the path if needed

const ProductList = () => {
  const dispatch = useDispatch();

  // state to track which items have been added
  const [addedToCart, setAddedToCart] = useState({});

  // your plants array (categories and plants)
  const plantsArray = [
    {
      category: "Indoor Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "/images/snakeplant.jpg",
          description: "A hardy plant for indoors",
          cost: 15.99,
        },
        {
          name: "Peace Lily",
          image: "/images/peacelily.jpg",
          description: "Beautiful flowering plant",
          cost: 19.99,
        },
      ],
    },
    {
      category: "Outdoor Plants",
      plants: [
        {
          name: "Rose Bush",
          image: "/images/rosebush.jpg",
          description: "Classic garden rose bush",
          cost: 29.99,
        },
      ],
    },
  ];

  // function to add item to cart + update local state
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Redux
    setAddedToCart((prev) => ({
      ...prev,
      [product.name]: true, // mark this product as added
    }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((category, index) => (
        <div key={index}>
          <h1>
            <div>{category.category}</div>
          </h1>
          <div className="product-list">
            {category.plants.map((plant, plantIndex) => (
              <div className="product-card" key={plantIndex}>
                <img
                  className="product-image"
                  src={plant.image}
                  alt={plant.name}
                />
                <div className="product-title">{plant.name}</div>
                <div className="product-description">{plant.description}</div>
                <div className="product-cost">${plant.cost}</div>
                <button
                  className="product-button"
                  onClick={() => handleAddToCart(plant)}
                  disabled={!!addedToCart[plant.name]} // disable if already added
                >
                  {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;