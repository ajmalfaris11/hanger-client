import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">About Hanger</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          At <span className="font-semibold text-black">Hanger</span>, we believe fashion is more than just clothing — it's a statement. 
          Our mission is to bring you curated fashion pieces that combine modern trends, affordability, and premium quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Story</h2>
            <p className="text-gray-600">
              Founded with a passion for fashion, Hanger started as a small idea to make trendy fashion accessible to everyone. Today, we serve thousands of happy customers across the country.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">What We Offer</h2>
            <p className="text-gray-600">
              From everyday wear to exclusive collections, Hanger offers a wide range of fashion products including shoes, accessories, and seasonal essentials — all with unbeatable value.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Why Choose Hanger</h2>
            <p className="text-gray-600">
              With a commitment to quality, fast delivery, and exceptional customer support, Hanger is your trusted fashion partner — always ahead in style and service.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <p className="text-gray-700">
            Join the <span className="font-semibold text-black">Hanger</span> family and elevate your fashion game — one outfit at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
