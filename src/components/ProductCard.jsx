import React from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const ProductCard = ({categoryFilter}) => {
  const navigate = useNavigate();

  const productDetailHandler = (data) => {
    navigate("/productdetails", {
      state: { data },
    });
  };

  return (
    <div className="container mx-auto p-4 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.isArray(categoryFilter) && categoryFilter.map((data, index) => (
        <div
          key={index}
          onClick={() => productDetailHandler(data)}
          className="group relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer 
                     transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
        >
          <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={`${BACKEND_LINK}/image/${data.image}`}
              alt={data.title || "Product"}
              className="max-h-56 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
              <button
                className="mb-4 px-4 py-2 rounded-lg bg-white text-gray-800 font-medium text-sm shadow-md 
                           hover:bg-gray-100 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>

          <div className="p-2 px-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-0 group-hover:text-teal-600 transition-colors">
              {data.name}
            </h2>
            <h4 className="text-xl font-bold mb-0 text-green-700">$ {data.price}</h4>
            <p className="text-sm capitalize text-gray-500">{data.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
