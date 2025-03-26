import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    address: '',
    phone: '',
    duration: ''
  });

  // Load products from localStorage on first render
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Save products to localStorage
  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Handle input change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add a new product
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Product Name and Price are required!");
      return;
    }

    const updatedProducts = [...products, { ...newProduct, bids: [] }];
    saveProducts(updatedProducts);
    setNewProduct({ name: '', quantity: '', price: '', address: '', phone: '', duration: '' });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Dashboard</h1>
      
      {/* Product Form */}
      <div className="card p-3">
        <h3>Post a Product</h3>
        <input type="text" name="name" placeholder="Product Name" className="form-control mb-2" value={newProduct.name} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity" className="form-control mb-2" value={newProduct.quantity} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" className="form-control mb-2" value={newProduct.price} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" className="form-control mb-2" value={newProduct.address} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" className="form-control mb-2" value={newProduct.phone} onChange={handleChange} />
        <input type="number" name="duration" placeholder="Bidding Duration (hours)" className="form-control mb-2" value={newProduct.duration} onChange={handleChange} />
        <button className="btn btn-primary w-100" onClick={addProduct}>Post Product</button>
      </div>

      {/* Product List */}
      <h2 className="mt-4">Available Products</h2>
      {products.length === 0 ? <p>No products yet.</p> : 
        products.map((product, index) => (
          <Product key={index} product={product} index={index} saveProducts={saveProducts} />
        ))
      }
    </div>
  );
}

function Product({ product, index, saveProducts }) {
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState(product.bids || []);

  const placeBid = () => {
    if (!bidAmount || bidAmount <= product.price) {
      alert("Bid must be higher than the starting price!");
      return;
    }

    const newBid = { amount: bidAmount, bidder: `User-${Math.floor(Math.random() * 1000)}` };
    const updatedBids = [...bids, newBid];
    setBids(updatedBids);

    // Update the product bids
    const updatedProduct = { ...product, bids: updatedBids };
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products[index] = updatedProduct;
    saveProducts(products);

    setBidAmount('');
  };

  return (
    <div className="card p-3 mt-3">
      <h4>{product.name}</h4>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Seller Address:</strong> {product.address}</p>
      <p><strong>Contact:</strong> {product.phone}</p>
      <p><strong>Bidding Ends In:</strong> {product.duration} hours</p>

      {/* Bidding Section */}
      <div className="mt-3">
        <h5>Place a Bid</h5>
        <input type="number" className="form-control mb-2" placeholder="Your Bid" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
        <button className="btn btn-success" onClick={placeBid}>Submit Bid</button>
      </div>

      {/* Display Bids */}
      <h5 className="mt-3">Bidding History</h5>
      {bids.length === 0 ? <p>No bids yet.</p> :
        <ul className="list-group">
          {bids.map((bid, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between">
              <span>{bid.bidder}</span> <strong>${bid.amount}</strong>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Dashboard;