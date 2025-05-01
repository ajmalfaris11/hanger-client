import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../../Redux/Customers/Payment/Action";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { useParams, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, paymentId, paymentStatus, dispatch, jwt]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 py-8 mb-[-100px]">
      <CheckCircleIcon sx={{ fontSize: 60, color: "#000" }} />
      <h1 className="text-2xl font-bold mt-4 text-center">Thank you for your purchase</h1>
      <p className="text-gray-600 mt-2 text-center">
        We've received your order. It will Deliver in 5-7 business days.
        <br />
        Your order number is <span className="font-medium">#{orderId?.slice(0, 6)?.toUpperCase()}</span>
      </p>

      <div className="bg-white mt-8 rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {order.order?.orderItems?.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center border-b py-2">
            <div className="flex items-center space-x-3">
              <img
                src={item.product.imageUrl}
                alt={item.product.title}
                className="w-14 h-14 rounded-md object-cover object-top"
              />
              <p className="text-sm">{item.product.title}</p>
            </div>
            <p className="font-medium text-sm w-[50px] text-end">₹ {item.discountedPrice}</p>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span>
          <span>₹ {order.order?.totalDiscountedPrice}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-5 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
