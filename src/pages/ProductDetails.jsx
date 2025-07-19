import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.data;
  const navigate = useNavigate();
  const cartHandler = (product) => {
    navigate("/cart", {
      state: { product },
    });
  };
  return (
    <div className="container my-10 mx-auto bg-gray-300 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-6 px-8 py-6 w-full">
        <div className="md:w-1/3 flex items-center justify-center">
          <img
            className="w-full rounded-2xl max-h-[400px]"
            src={product?.image}
            alt={product?.title}
          />
        </div>

        <div className="md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product?.title}</h1>
          <p className="text-green-700 text-xl font-semibold">
            $ {product?.price}
          </p>
          <p className="text-gray-600 capitalize font-medium">
            {product?.category}
          </p>
          <p className="text-gray-700">{product?.description}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-lg">
            {Array.from({ length: 5 }, (_, index) => {
              const rating = product?.rating?.rate || 0;
              if (index + 1 <= Math.floor(rating)) {
                return <span key={index}>★</span>;
              } else if (index + 0.5 < rating) {
                return <span key={index}>⯨</span>;
              } else {
                return <span key={index}>☆</span>;
              }
            })}
            <span className="text-gray-600 text-sm ml-2">
              ({product?.rating?.count} reviews)
            </span>
          </div>

          <button
            onClick={() => cartHandler(product)}
            className="mt-4 px-6 py-2 hover:cursor-pointer bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
