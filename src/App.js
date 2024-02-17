// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: "Shirt", price: 10, image: "https://assets.ajio.com/medias/sys_master/root/20231010/R4fd/6525266eddf77915192fb5de/-288Wx360H-466691165-offwhite-MODEL.jpg", rating: 4 },
    { id: 2, name: "Watch", price: 15, image: "https://staticimg.titan.co.in/Titan/Catalog/2693WM01_1.jpg", rating: 5 },
    { id: 3, name: "Flipflop", price: 20, image: "https://imagescdn.planetfashion.in/img/app/product/7/720625-7970803.jpg?auto=format&w=494.40000000000003", rating: 3 },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchTerm("")}>Clear</button>
          </div>
        </nav>
      </header>
      <div className="product-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <div className="rating">Rating: {product.rating}</div>
              <div className="quantity-control">
                <button onClick={() => decrementQuantity(product.id)}>-</button>
                <span>{cart.find(item => item.id === product.id)?.quantity || 0}</span>
                <button onClick={() => incrementQuantity(product.id)}>+</button>
              </div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;