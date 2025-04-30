import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import ProductCard from "../ProductCard/ProductCard";



const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, review } = useSelector((store) => store);
  const params = useParams();
  const jwt = localStorage.getItem("jwt");
  // console.log("param",productId,customersProduct.product)


  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };
  const handleSubmit = () => {
    const data = { productId: params.productId, size: selectedSize?.name };
    dispatch(addItemToCart({ data, jwt }));
    navigate("/cart")
  };

  useEffect(() => {
    const data = { productId: params.productId }
    dispatch(findProductById(data));
    // dispatch(getAllReviews(productId));
  }, [params.productId]);

  // console.log("reviews ",review)

  return (
    <div className="bg-white lg:px-20">
      {/* <div className="pt-6"> */}


      {/* product details */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 pt-10 max-w-7xl mx-auto mb-16">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <div className="rounded-lg overflow-hidden max-w-sm mx-auto">
            <img
              src={products.product?.imageUrl}
              alt="product image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 px-2 sm:px-0">
          {/* Brand & Title */}
          <div>
            <h1 className="text-xl font-bold text-gray-800">{products.product?.brand}</h1>
            <h2 className="text-lg text-gray-600 mt-1">{products.product?.title}</h2>
          </div>

          {/* Price Info */}
          <div className="flex items-center space-x-4 text-lg">
            <span className="text-2xl font-bold text-gray-900">
              ₹{products.product?.discountedPrice}
            </span>
            <span className="line-through text-gray-500">
              ₹{products.product?.price}
            </span>
            <span className="font-semibold">
              {products.product?.discountPersent}% Off
            </span>
          </div>

          {/* Ratings */}
          <div className="flex items-center space-x-3">
            <Rating
              name="read-only"
              value={4.6}
              precision={0.5}
              readOnly
              sx={{
                color: "black",
              }}
            />            <span className="text-sm text-gray-500">
              {products.product?.rating?.length || 132} Ratings
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {products.product?.totalCount} Reviews
            </span>
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Select Size</h3>
            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="grid grid-cols-3 sm:grid-cols-4 gap-3"
            >
              {products.product?.size?.map((size) => (
                <RadioGroup.Option
                  key={size.name}
                  value={size}
                  disabled={size.quantity === 0}
                  className={({ active }) =>
                    classNames(
                      size.quantity > 0
                        ? "cursor-pointer bg-white text-gray-900 border hover:bg-gray-100"
                        : "cursor-not-allowed bg-gray-100 text-gray-400",
                      active ? "ring-2 ring-indigo-500" : "",
                      "rounded-md text-center py-2 px-3 text-sm font-medium relative"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                      {size.quantity > 0 ? (
                        <span
                          className={classNames(
                            checked ? "border-indigo-600" : "border-transparent",
                            "absolute inset-0 rounded-md border-2 pointer-events-none"
                          )}
                        />
                      ) : (
                        <span
                          className="absolute inset-0 rounded-md border-2 border-gray-300 pointer-events-none"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 w-full h-full text-gray-300"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1={0} y1={100} x2={100} y2={0} />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>

          {/* Add to Cart Button */}
          <div>
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{
                padding: "0.75rem 2rem",
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "#111" },
              }}
            >
              Add to Cart
            </Button>
          </div>

          {/* Description */}
          <div className="pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Description</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {products.product?.description}
            </p>
          </div>
        </div>
      </section>


      {/* rating and review section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <h1 className="font-semibold text-xl sm:text-2xl pb-4 text-center">
          Recent Review & Ratings
        </h1>

        <div className="border p-5 rounded-xl shadow-sm bg-white">
          <Grid container spacing={4}>
            {/* Reviews Section */}
            <Grid item xs={12} md={7}>
  <div className="space-y-4 text-sm">
    {(review.reviews?.length > 0 ? review.reviews : [
      {
        name: "John Doe",
        rating: 5,
        comment: "Excellent quality! Looks and feels premium.",
        date: "2025-04-01",
      },
      {
        name: "Aisha Khan",
        rating: 4,
        comment: "Pretty good. Matches the image and size is perfect.",
        date: "2025-03-29",
      },
      {
        name: "Rahul Verma",
        rating: 4.5,
        comment: "Comfortable and durable, worth the price.",
        date: "2025-03-27",
      },
    ]).map((item, index) => (
      <div
        key={index}
        className="border rounded-lg p-3 bg-white shadow-sm space-y-1"
      >
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-900">{item.name}</p>
          <span className="text-xs text-gray-500">{item.date}</span>
        </div>
        <Rating
          name={`rating-${index}`}
          value={item.rating}
          precision={0.5}
          readOnly
          sx={{ color: "black" }}
          size="small"
        />
        <p className="text-gray-700 text-sm">{item.comment}</p>
      </div>
    ))}
  </div>
</Grid>


            {/* Ratings Section */}
            <Grid item xs={12} md={5}>
              <h2 className="text-lg sm:text-xl font-semibold pb-2 text-gray-800">
                Product Ratings
              </h2>
              <div className="flex items-center space-x-3 pb-6">
                <Rating
                  name="read-only"
                  value={4.6}
                  precision={0.5}
                  readOnly
                  sx={{
                    color: "black",
                  }}
                />                <p className="opacity-60 text-sm">
                  {products.product?.rating?.length || 132} Ratings
                </p>
              </div>

              {/* Ratings Breakdown */}
              {[
                { label: "Excellent", value: 40, count: 192 },
                { label: "Very Good", value: 30, count: 130 },
                { label: "Good", value: 25, count: 110 },
                { label: "Average", value: 21, count: 80 },
                { label: "Poor", value: 10, count: 30 }
              ].map((item, index) => (
                <Box key={index} className="mb-4">
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={4} sm={3}>
                      <p className="text-sm">{item.label}</p>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          bgcolor: "#e0e0e0", // track color
                          height: 8,
                          borderRadius: 5,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "black", // progress bar color
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-xs opacity-60">{item.count}</p>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </div>
      </section>

      {/* similer product */}
      <section className="pt-10">
        <h1 className="py-5 text-xl font-bold">Similer Products</h1>
        <div className="flex flex-wrap space-y-5 justify-center">
          {products.products?.content?.map((item, index) => (
            <ProductCard key={item.id || index} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
