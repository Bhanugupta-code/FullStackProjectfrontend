import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Navbar = ({ itemList }) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [item, setitem] = useState();
  const [data, setdata] = useState([]);
  const searchToggleHandler = () => {
    setSearchToggle((prev) => !prev);
  };
  const navigate = useNavigate();
  const cartpagehandler = () => {
    setSearchToggle(false);
    navigate("/cart");
  }

  const searchItem = () => {
    const datatget = itemList.filter((data) => data.title === item );
   setdata(datatget);
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl text-white uppercase font-extrabold tracking-wide">
          QTN
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={searchToggleHandler}
            className="text-gray-200 hover:text-indigo-400 hover:cursor-pointer transition"
            aria-label="Toggle Search"
          >
            {searchToggle ? (
              <RxCross1 size={28} />
            ) : (
              <IoSearchOutline size={28} />
            )}
          </button>

          <button
            className="text-gray-200 hover:text-indigo-400  hover:cursor-pointer transition"
            aria-label="Cart" onClick={cartpagehandler}
          >
            <FaCartArrowDown size={28} />
          </button>
        </div>
      </div>

      {searchToggle && (
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <div className="flex justify-center items-center">
            <div className="flex w-full sm:w-[450px] border border-gray-600 rounded-xl overflow-hidden shadow-sm bg-gray-800">
              <input
               onChange={(e)=> setitem(e.target.value)}
                type="text"
                value={item}
                placeholder="Search here..."
                className="w-full px-4 py-2 text-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={searchItem}
                className="bg-indigo-600  hover:cursor-pointer text-white px-4 py-2 hover:bg-indigo-500 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      {
  searchToggle && data.map((data,index)=>{
    return (
      <div className="flex justify-center px-10 py-5">
<div
        
          className="w-full my-3 max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
        </div>
    );
  })
      }
    </nav>
  );
};

export default Navbar;
