import React from "react";

function HomeSectionCard() {
  return (
    <div className="curson-pointer flex flex-col items-center rounded-lg shadow-lg overflow-hidden  mx-2 mb-10">
        <div className="h-[13rem] w-full bg-black rounded-lg overflow-hidden">
            <img className="object-cover object-top w-full" src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png" alt="" />
        </div>
        <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">awasa</h3>
            <p className="mt-2 text-sm text-gray-500">Women kurta latest collection</p>
        </div>
    </div>
  );
}

export default HomeSectionCard;
