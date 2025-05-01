import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { createPayment } from "../../../Redux/Customers/Payment/Action";

const OrderSummary = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId]);

  const handleCreatePayment = () => {
    const data = { orderId: order.order?._id, jwt };
    dispatch(createPayment(data));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Address Section */}
      <div className="bg-white shadow-md rounded-xl p-4 border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {order.order?.orderItems.map((item) => (
            <CartItem key={item.product._id} item={item} showButton={false} />
          ))}
        </div>

        {/* Price Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 border h-fit">
          <p className="text-lg font-semibold text-gray-700 mb-4">Price Details</p>
          <hr className="mb-4" />

          <div className="space-y-3 text-gray-800">
            <div className="flex justify-between">
              <span>Price ({order.order?.totalItem} items)</span>
              <span>₹{order.order?.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-600">-₹{order.order?.discounte}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{order.order?.totalDiscountedPrice}</span>
            </div>
          </div>

          <Button
            onClick={handleCreatePayment}
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              padding: "0.8rem",
              marginTop: "2rem",
              backgroundColor: "#000",
              color: "#fff",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#111",
              },
            }}
          >
            Proceed to Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
