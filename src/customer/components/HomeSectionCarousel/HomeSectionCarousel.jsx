import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const HomeSectionCarousel = ({data, sectionName}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = data.map((item) => (
    <HomeSectionCard product={item} />
  ));
  const carouselRef = React.useRef(null);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const slideNext = () => {
    const newIndex = Math.min(activeIndex + 5, carouselItems.length - 5);
    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const slidePrev = () => {
    const newIndex = Math.max(activeIndex - 5, 0);
    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  return (
    <div className="relative flex flex-row items-center justify-center gap-4 w-full mb-10">
      <button
        className="w-14 h-[50px] flex items-center justify-center bg-white ml-5  rounded-full shadow-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out focus:outline-none "
        onClick={slidePrev}
        disabled={activeIndex === 0}
      >
        <ChevronLeftIcon />
      </button>

      <div className="relative overflow-hidden w-full">
        <h1 className="text-2xl font-bold text-black mb-4 ml-4">{sectionName}</h1>

        <AliceCarousel
          ref={carouselRef}
          items={carouselItems}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
        />
      </div>

      <button
        className="w-14 h-[50px] bg-white mr-5 h-10 text-black rounded-full shadow-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out focus:outline-none"
        onClick={slideNext}
        disabled={activeIndex >= carouselItems.length - 1}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default HomeSectionCarousel;
