import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group cursor-pointer flex flex-col items-center rounded-2xl shadow-lg overflow-hidden m-3 bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="w-full h-44 sm:h-52 md:h-60 lg:h-72 bg-gray-100 overflow-hidden">
        <img
          src={product?.image || product?.imageUrl}
          alt={product?.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="px-4 py-3 text-center w-full">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {product?.brand || product?.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {product?.title?.length > 60
            ? product?.title.slice(0, 60) + "..."
            : product?.title}
        </p>

        {/* Optional Price Section */}
        {product?.discountedPrice && (
          <div className="flex justify-center items-center space-x-2 mt-3">
            <p className="text-md font-bold text-black">₹{product.discountedPrice}</p>
            {product.price && (
              <p className="text-sm line-through text-gray-400">₹{product.price}</p>
            )}
            {product.discountPersent > 0 && (
              <p className="text-xs text-green-600 font-medium">
                {product.discountPersent}% OFF
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProductCard;
