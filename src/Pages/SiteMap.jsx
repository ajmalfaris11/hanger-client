import React from 'react';
import { Link } from 'react-router-dom';

const SiteMap = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sitemap</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl">Customer</h3>
          <ul>
            <li>
              <Link to="/" className="text-black hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:text-gray-700">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-black hover:text-gray-700">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-black hover:text-gray-700">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-xl">Company</h3>
          <ul>
            <li>
              <Link to="/terms" className="text-black hover:text-gray-700">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-black hover:text-gray-700">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-black hover:text-gray-700">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="text-black hover:text-gray-700">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-xl">Account</h3>
          <ul>
            <li>
              <Link to="/login" className="text-black hover:text-gray-700">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-black hover:text-gray-700">
                Register
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-black hover:text-gray-700">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-black hover:text-gray-700">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-xl">Social</h3>
          <ul>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
