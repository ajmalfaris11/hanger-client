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
      className="w-full  border rounded-lg shadow-md transition-all cursor-pointer hover:shadow-xl transform hover:scale-105 bg-white hover:bg-gray-50 my-2 sm:my-5"
    >
      <div className="relative h-[10rem] sm:h-[12rem]  rounded-t-lg overflow-hidden">
        <img
          className="h-full w-full object-cover object-top transition-transform duration-300 transform hover:scale-105"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
        {discountPersent > 0 && (
          <div className="absolute top-2 left-2 bg-[#000000] text-white px-3 py-1 rounded-xl text-xs">
            {discountPersent}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm font-medium text-gray-600">{brand}</p>
          <p className="sm:text-md font-semibold text-gray-900 truncate">{title}</p>
          <p className="text-sm text-gray-500">{color}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="font-semibold text-lg text-gray-900">₹{discountedPrice}</p>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500 line-through">₹{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
