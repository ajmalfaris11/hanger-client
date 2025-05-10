import React, { useEffect, useState } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import api from "../config/api";

const Homepage = () => {
  const [mensKurta, setMensKurta] = useState([]);
  const [womensKurta, setWomensKurta] = useState([]);
  const [saree, setSaree] = useState([]);
  const [dress, setDress] = useState([]);
  const [gouns, setGouns] = useState([]);

  useEffect(() => {
    api.get("/api/products")
      .then((response) => {
        const products = response.data.content;
        console.log(products);

        const mensKurta = [];
        const womensKurta = [];
        const saree = [];
        const dress = [];
        const gouns = [];

        products.forEach(p => {
          switch (p.thirdLavelCategory) {
            case "mens_kurta":
              mensKurta.push(p);
              break;
            case "Womens_Kurtha":
              womensKurta.push(p);
              break;
            case "Saree":
              saree.push(p);
              break;
            case "Dress":
              dress.push(p);
              break;
            case "Gown":
              gouns.push(p);
              break;
            default:
              break;
          }
        });

        setMensKurta(mensKurta);
        setWomensKurta(womensKurta);
        setSaree(saree);
        setDress(dress);
        setGouns(gouns);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);


  return (
    <div>
      <div className="p-4 bg-black py-6">
        <HomeCarousel images={homeCarouselData} />
      </div>

      <div className="min-h-screen">
        <HomeProductSection data={dress} section={"Women Dress"} />
        <HomeProductSection data={womensKurta} section={"Women's Kurtas"} />
        <HomeProductSection data={mensKurta} section={"Men's Kurta"} />
        <HomeProductSection data={saree} section={"Saree"} />
        <HomeProductSection data={gouns} section={"Women's Gouns"} />
      </div>
    </div>
  );
};

export default Homepage;
