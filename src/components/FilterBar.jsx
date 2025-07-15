import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const FilterBar = ({ itemList }) => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortFilter, setsortFilter] = useState([]);
  useEffect(() => {
    if (itemList) {
      setCategoryFilter(itemList);
      setsortFilter(itemList);
    }
  }, [itemList]);

  const categoryfilterHandler = (value) => {
    if (value === "All Category") {
      setCategoryFilter(itemList);
    } else {
      const data = itemList.filter((item) => item.category === value);
      setCategoryFilter(data);
    }
  };

  const sortHandler = (value) => {
    if (value === "Low to High") {
      const data = [...categoryFilter].sort((a, b) => a.price - b.price);
      setCategoryFilter(data);
    } else if (value === "High to Low") {
      const data = [...categoryFilter].sort((a, b) => b.price - a.price);
      setCategoryFilter(data);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:mx-10 md:px-8 w-fit">
        <div className="container mx-auto px-3 mt-10">
          <div className="w-fit">
            <select
              name="allCategories"
              id="category"
              onChange={(e) => categoryfilterHandler(e.target.value)}
              className="text-lg sm:text-xl border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            >
              <option value="All Category">All Category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewellery</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>
        <div className="container mx-auto px-3 mt-10">
          <div className="w-fit">
            <select
              name="allCategories"
              id="category"
              onChange={(e) => sortHandler(e.target.value)}
              className="text-lg sm:text-xl border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            >
              <option value="Sort by">Sort by</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <ProductCard categoryFilter={categoryFilter} />
    </>
  );
};

export default FilterBar;
