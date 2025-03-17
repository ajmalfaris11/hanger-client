import React from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const HomeSectionCarousel = () => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const items = [1, 1, 1, 1, 1].map((item) => <HomeSectionCard />);
  return (
    <div className="relative py-4 flex flex-row items-center justify-center w-full">
      <div className="flex items-center">
        <button className="p-2 bg-white ml-5 mb-20 h-10 text-black rounded-full shadow-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out focus:outline-none">
          <ChevronLeftIcon />
        </button>
      </div>
      <div className="relative p-4 overflow-x-scroll w-full">
        <h1 class="text-2xl font-bold text-black mb-4 ml-4">WOMENS </h1>

        <AliceCarousel
          items={items}
          disableButtonsControls
          autoPlay
          responsive={responsive}
          disableDotsControls
        />
      </div>
      <div className="flex items-center">
        <button className="p-2 bg-white mr-5 mb-20 h-10 text-black rounded-full shadow-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out focus:outline-none">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
