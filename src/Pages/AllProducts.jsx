import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../customer/Components/Product/ProductCard/ProductCard';
import api from '../config/api';
import { Filter } from 'lucide-react';


function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOption, setSortOption] = useState('priceLowToHigh');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = decodeURIComponent(queryParams.get("query")?.toLowerCase() || "");

  useEffect(() => {
    api.get('api/products')
      .then((response) => {
        const fetchedProducts = response.data.content;
        setProducts(fetchedProducts);
        applyFilters(fetchedProducts);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [searchQuery, selectedColors, selectedSizes, sortOption]);

  const applyFilters = (data) => {
    let filtered = data.filter(product =>
      product.title?.toLowerCase().includes(searchQuery) ||
      product.description?.toLowerCase().includes(searchQuery) ||
      product.color?.toLowerCase().includes(searchQuery)
    );

    if (selectedColors.length) {
      filtered = filtered.filter(product =>
        selectedColors.includes(product.color?.toLowerCase())
      );
    }

    if (selectedSizes.length) {
      filtered = filtered.filter(product =>
        selectedSizes.includes(product.size?.toUpperCase())
      );
    }

    if (sortOption === 'priceLowToHigh') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSizeClick = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md mx-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filter Products</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-600 hover:text-black text-xl absolute right-4 top-4"
              >
                &times;
              </button>
            </div>

            {/* Color Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {['black', 'white', 'red', 'blue', 'green', 'beige'].map((color) => (
                  <label key={color} className="text-sm text-gray-700 flex items-center">
                    <input
                      type="checkbox"
                      value={color}
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorChange(color)}
                      className="mr-1 accent-black"
                    />
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`px-3 py-1 border rounded text-sm ${selectedSizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'text-gray-800 border-gray-400 hover:bg-gray-100'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Option */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Sort</h4>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm bg-white text-gray-800 appearance-none focus:outline-none"
              >
                <option value="priceLowToHigh">Price: Low → High</option>
                <option value="priceHighToLow">Price: High → Low</option>
              </select>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Product Grid or No Product */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 mt-6">
          {filteredProducts.map((item, index) => (
            <ProductCard key={item.id || index} product={item} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg font-medium">
          Product Not Available
        </div>
      )}
    </div>
  );
}

export default AllProducts;
