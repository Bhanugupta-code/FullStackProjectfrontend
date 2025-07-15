import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ categoryFilter }) => {
  const navigate = useNavigate();

  const productDetailHandler = (data) => {
    navigate("/productdetails", {
      state: { data },
    });
  };

  return (
    <div className="grid grid-cols-1 container mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {categoryFilter.map((data, index) => (
        <div
          key={index}
          className="w-full my-3 max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto"
          onClick={() => productDetailHandler(data)}
        >
          <div className="h-[300px] flex items-center justify-center p-4 border-b">
            <img
              className="max-h-[260px] object-contain"
              src={data.image}
              alt="product"
            />
          </div>

          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {data.title}
            </h2>
            <h4 className="text-md font-bold text-green-700">$ {data.price}</h4>
            <p className="text-sm capitalize text-gray-500">{data.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
