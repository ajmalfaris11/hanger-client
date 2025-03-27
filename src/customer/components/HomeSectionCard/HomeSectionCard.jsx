import React from "react";

function HomeSectionCard({product}) {
  return (
    <div className="group cursor-pointer flex flex-col items-center rounded-xl shadow-md overflow-hidden mx-2 mb-10 transition-transform duration-300 transform hover:scale-105 bg-white mt-2">
    <div className="h-[14rem] w-full bg-gray-100 rounded-t-xl overflow-hidden">
        <img className="object-cover object-top w-full h-full transition-opacity duration-300 group-hover:opacity-95" 
             src={product.imageUrl} 
             alt={product.title} />
    </div>

    <div className="px-2 py-4 w-full text-center">
        <h3 className="text-lg font-semibold text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-600">{product.title}</p>
    </div>
</div>
  );
}

export default HomeSectionCard;
