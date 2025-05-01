import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [jwt, cart.updateCartItem, cart.deleteCartItem]);

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-16">
      {cart.cartItems.length > 0 ? (
        <div className="lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Your Cart</h2>
            <div className="space-y-4">
              {cart.cartItems.map((item, index) => (
                <CartItem
                  key={item?.id || index}
                  item={item}
                  showButton={true}
                />
              ))}
            </div>
          </div>

          {/* Price Details Section */}
          <div className="bg-white shadow-md rounded-xl p-6 sticky top-10 h-fit mt-16">
            <h3 className="text-lg font-bold text-gray-700 mb-4">PRICE DETAILS</h3>
            <hr className="mb-4" />
            <div className="space-y-4 text-sm text-gray-700 font-medium">
              <div className="flex justify-between">
                <span>Price ({cart.cart?.totalItem} item)</span>
                <span>₹{cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-red-700">-₹{cart.cart?.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{cart.cart?.totalDiscountedPrice}</span>
              </div>
            </div>
            <Button
              onClick={() => navigate("/checkout?step=2")}
              variant="contained"
              sx={{
                padding: ".8rem 2rem",
                marginTop: "2rem",
                width: "100%",
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              }}
              className="text-lg font-semibold"
            >
              Check Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your cart is empty!
          </h2>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{
              marginTop: "1rem",
              padding: ".8rem 2rem",
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
