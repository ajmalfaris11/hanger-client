import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { title, brand, imageUrl, price, discountedPrice, color, discountPersent } = product;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="w-[12rem] border m-4 rounded-lg shadow-md transition-all cursor-pointer hover:shadow-xl transform"
    >
      <div className="relative h-[12rem] rounded-t-lg overflow-hidden">
        <img
          className="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-110"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
        {discountPersent > 0 && (
          <div className="absolute top-2 left-2 bg-[#333333] text-white px-2 py-1 rounded-full text-xs">
            {discountPersent}% OFF
          </div>
        )}
      </div>
      <div className="textPart bg-white p-4 rounded-b-lg">
        <div className="mb-2">
          <p className="font-medium text-gray-600 opacity-80">{brand}</p>
          <p className="text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{color}</p>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <p className="font-semibold text-lg text-gray-900">₹{discountedPrice}</p>
          <p className="text-sm text-gray-500 line-through">₹{price}</p>
          {discountPersent > 0 && (
            <p className="text-green-600 text-sm font-semibold">{discountPersent}% off</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
