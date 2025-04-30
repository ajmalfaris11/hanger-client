import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";


const HomeProductSection = ({ section, data }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2, itemsFit: "contain" },
    568: { items: 3, itemsFit: "contain" },
    1024: { items: 5, itemsFit: "contain" },
  };

  if (!data || data.length === 0) return null;

  const items = data.slice(0, 10).map((item, index) => (
    <div key={index}>
      <HomeProductCard product={item} />
    </div>
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-0 md:py-5">
      <h2 className="text-xl w-auto sm:text-2xl md:text-3xl font-bold text-gray-900 py-2 mb-5 md:mb-10 uppercase tracking-wider text-center border-[1px] rounded-lg border-black">
        {section}
      </h2>
      <div className="relative">
        <AliceCarousel
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={2000}
        />
        {activeIndex < items.length - 5 && (
          <Button
            onClick={slideNext}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              backgroundColor: "black",
            }}
          >
            <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
          </Button>
        )}
        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(90deg)",
              backgroundColor: "black",
            }}
          >
            <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;
