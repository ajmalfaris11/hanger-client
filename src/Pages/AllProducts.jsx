import React, { useEffect, useState } from 'react';
import ProductCard from '../customer/Components/Product/ProductCard/ProductCard';
import api from '../config/api';

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('api/products')
      .then((response) => {
        setProducts(response.data.content);  // Assuming the response is an array of products
        console.log("Products fetched successfully:", response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  return (
    <div className="lg:col-span-5 w-full px-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {products?.map((item, index) => (
          <ProductCard key={item.id || index} product={item} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
