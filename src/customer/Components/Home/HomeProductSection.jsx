import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import { Link } from "react-router-dom";
import "./HomeProductSection.css";

const HomeProductSection = ({ section, data }) => {
  if (!data || data.length === 0) return null;

  const groupItems = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedItems = groupItems(data.slice(0, 18), 8);

  const items = groupedItems.map((group, idx) => (
    <div key={idx} className="grid grid-cols-2 grid-raws-3 md:grid-cols-4 xl:grid-cols-4 sm:gap-4 sm:px-2">
      {group.map((product, index) => (
        <HomeProductCard key={index} product={product} />
      ))}
    </div>
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-10 py-4 md:py-8">
      <h2 className="text-center text-2xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-wider border-b-4 border-black inline-block pb-2 mb-8">
        {section}
      </h2>

      <AliceCarousel
        mouseTracking
        disableButtonsControls
        disableDotsControls
        items={items}
        animationType="fadeout"
        animationDuration={800}
      />

      <div className="text-center mt-6">
        <Link
          to={`/${data[0].topLavelCategory}/${data[0].secondLavelCategory}/${data[0].thirdLavelCategory}`}
          className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-200"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default HomeProductSection;
