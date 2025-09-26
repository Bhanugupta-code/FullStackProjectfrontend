import React, { useState } from "react";
import axios from "axios";

const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const AddProducts = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [image, setimage] = useState(null);
  const [rate, setrate] = useState("");
  const [count, setcount] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("rate", rate);
    formData.append("count", count);

    try {
      await axios.post(`${BACKEND_LINK}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(" Product Added Successfully!");

      setname("");
      setprice("");
      setdescription("");
      setcategory("");
      setrate("");
      setcount("");
      setimage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const rateHandle = (value) => {
    if (value >= 0 && value <= 5) {
      setrate(value);
    } else {
      setrate("");
      alert(" Rate must be between 0 and 5.");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="shadow-lg bg-white rounded-2xl w-3/4 mx-auto mt-8 px-8 py-6 border border-gray-200">
        <h4 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Add New Product
        </h4>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Product Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            placeholder="Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            placeholder="Category"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Description"
            rows="3"
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rate}
            onChange={(e) => rateHandle(e.target.value)}
            placeholder="Rating (0 - 5)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            value={count}
            onChange={(e) => setcount(e.target.value)}
            placeholder="Stock Count"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            onChange={(e) => setimage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-900 file:text-white hover:file:bg-gray-800"
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-900 rounded-lg shadow-md transition duration-300 hover:bg-gray-800"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
