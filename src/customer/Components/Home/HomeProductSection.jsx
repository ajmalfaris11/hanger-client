import HomeProductCard from "./HomeProductCard";
import { Link } from "react-router-dom";
import "./HomeProductSection.css";

const HomeProductSection = ({ section, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="relative px-4 sm:px-6 lg:px-10 py-4 md:py-8">
      <h2 className="text-center text-xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-wider mt-6 mb-4">
        {section}
      </h2>

      {/* Static 2-row grid, showing 8 products */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 sm:gap-4">
        {data.slice(0, 8).map((product, index) => (
          <HomeProductCard key={index} product={product} />
        ))}
      </div>

      {/* View More Button */}
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
