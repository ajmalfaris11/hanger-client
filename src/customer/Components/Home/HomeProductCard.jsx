import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/men/clothing/mens_kurta`)}
      className="group cursor-pointer flex flex-col items-center rounded-xl shadow-md overflow-hidden mx-2 mb-10 transition-transform duration-300 transform hover:scale-105 bg-white mt-2"
    >
      <div className="h-[14rem] w-full bg-gray-100 rounded-t-xl overflow-hidden">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="px-2 py-4 w-full text-center">
  <h3 className="text-lg font-medium text-gray-900">
    {product?.brand || product?.title}
  </h3>
  <p className="mt-2 text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
    {product?.title?.length > 50 ? product?.title.slice(0, 50) + "..." : product?.title}
  </p>
</div>

    </div>
  );
};

export default HomeProductCard;
