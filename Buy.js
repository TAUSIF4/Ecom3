import React from 'react';
import { Link } from 'react-router-dom';

function Buy() {
  return (
    <div className='bg-light vh-100 d-flex flex-column justify-content-center align-items-center'>
      <h1 className="text-primary mb-4">Buy Products</h1>
      
      <div className='bg-white p-4 rounded w-50 shadow'>
        <h2>Available Products</h2>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between">
            <span>Product 1 - $100</span>
            <button className="btn btn-success">Buy Now</button>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Product 2 - $200</span>
            <button className="btn btn-success">Buy Now</button>
          </li>
        </ul>

        <Link to="/" className="btn btn-outline-primary w-100 mt-3">Back to Home</Link>
      </div>
    </div>
  );
}

export default Buy;