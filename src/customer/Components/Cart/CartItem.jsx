import React from "react";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../Redux/Customers/Cart/Action";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?._id, jwt };
    dispatch(removeCartItem(data));
  };

  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
      jwt,
    };
    dispatch(updateCartItem(data));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top rounded-md"
            src={item?.product?.imageUrl}
            alt="product image"
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="text-lg font-semibold text-gray-800">{item?.product?.title}</p>
          <p className="text-sm text-gray-500 mt-1">
            Brand: <span className="text-gray-700">{item?.product?.brand}</span>
          </p>
          <p className="text-sm text-gray-500">
            Size: <span className="text-gray-700">{item?.size}</span>
          </p>
          <div className="flex space-x-2 items-center pt-2">
            <p className="text-sm text-gray-400 line-through">
              ₹{item?.product?.price}
            </p>
            <p className="text-lg font-bold text-gray-900">
              ₹{item?.product?.discountedPrice}
            </p>
            <p className="text-sm font-semibold text-green-600">
              {item?.product?.discountPersent}% off
            </p>
          </div>
        </div>
      </div>

      {showButton && (
        <div className="lg:flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item?.quantity <= 1}
              color="secondary"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span className="py-1 px-5 border rounded-md text-sm font-medium">
              {item?.quantity}
            </span>
            <IconButton onClick={() => handleUpdateCartItem(1)} color="success">
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <Button onClick={handleRemoveItemFromCart} variant="text" color="error">
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
