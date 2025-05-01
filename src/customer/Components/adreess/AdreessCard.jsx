import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>

      <div className="space-y-2 text-gray-700">
        <p className="font-semibold text-lg">
          {address?.firstName} {address?.lastName}
        </p>

        <p className="text-sm leading-relaxed">
          {address?.streetAddress}, {address?.city}, {address?.state} - {address?.zipCode}
        </p>

        <div className="mt-3">
          <p className="font-semibold text-sm text-gray-600">Phone Number</p>
          <p className="text-base">{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
