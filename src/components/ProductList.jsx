import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const ProductList = () => {
  const [productListData, setproductListData] = useState([]);
  const productList = async () => {
    try {
      const productData = await axios.get(`${BACKEND_LINK}/admin`);
      setproductListData(productData.data);
      console.log("Data fetch successfully.", productListData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    productList();
  }, []);
  return (
    <>
      <div className="shadow-lg bg-gray-100 shadow-gray-300 w-3/4 mx-auto mt-4 px-10 py-1">
        <div className="flex flex-col mx-auto my-4">
          <h4 className="mb-3 text-3xl w-3/4 font-semibold mx-auto text-center">
            Product List
          </h4>
          <table>
            <thead>
                <tr>
                     <th className="bg-gray-400 text-lg font-semibold uppercase">
               Sr. no.
              </th>
              <th className="bg-gray-400 text-lg font-semibold uppercase">
                name
              </th>
              <th className="bg-gray-400 text-lg font-semibold uppercase">
                category
              </th>
              <th className="bg-gray-400 text-lg font-semibold uppercase">
                price
              </th>
              <th className="bg-gray-400 text-lg font-semibold uppercase">
                image
              </th>
              </tr>
            </thead>
            <tbody>
             {
                productListData.length>0?
                productListData.map((curelem,index)=>(
 <tr key={index}>
    <td className="text-md w-1/6 px-1.5 text-center capitalize bg-gray-300">
                 {index + 1}
                </td>
                <td className="text-md px-2.5 w-1/6 text-center capitalize bg-gray-300">
                 {curelem.name}
                </td>
                <td className="text-md px-2.5 w-1/6 text-center capitalize bg-gray-300">
                  {curelem.category}
                </td>
                <td className="text-md px-2.5 w-1/6 text-center bg-gray-300">{curelem.price}</td>
                <td className="text-md px-2.5 w-1/6 text-center bg-gray-300">
                <img className="p-1 rounded-xl w-auto lg:h-20 md:h-16 h-12" src={`${BACKEND_LINK}/image/${curelem.image}`} alt="sfds" />
                </td>
              </tr>
                )): (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-600">
                No products available
              </td>
            </tr>
          )
             }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
