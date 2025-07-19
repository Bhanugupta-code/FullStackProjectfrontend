import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Navbar = ({ itemList, setsearchedresults }) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [item, setitem] = useState("");
  const [data, setdata] = useState([]);
  const searchToggleHandler = () => {
    setSearchToggle((prev) => !prev);
  };
  const navigate = useNavigate();
  const cartpagehandler = () => {
    setSearchToggle(false);
    navigate("/cart");
  };

  const searchItem = () => {
    const datatget = itemList.filter((data) =>
      data.title.toLowerCase().includes(item.toLowerCase())
    );
    if (datatget.length > 0) {
      setsearchedresults(datatget);
    } else {
      alert("No such item found.");
    }
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
            aria-label="Cart"
            onClick={cartpagehandler}
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
                onChange={(e) => setitem(e.target.value)}
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
    </nav>
  );
};

export default Navbar;
