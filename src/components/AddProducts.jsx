import React, { useState } from "react";
import axios from "axios";

const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;
console.log("Backend link is:", BACKEND_LINK);

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
      const response = await axios.post(
        `${BACKEND_LINK}/admin/addproducts`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product Added Successfully!");

      setname("");
      setprice("");
      setdescription("");
      setcategory("");
      setrate("");
      setcount("");
      setimage(null);
    } catch (err) {
      console.log(err);
    }
  };

  const rateHandle = (value) => {
    console.log(value);
    if (value > 0 && value < 5) {
      setrate(value);
    } else {
      setrate("");
      alert("Rate between 0 to 5.");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className=" shadow-lg bg-gray-100 shadow-gray-300 w-3/4 mx-auto mt-4 px-10 py-1">
        <div className=" flex flex-col mx-auto my-4">
          <h4 className="mb-3 text-3xl font-semibold w-3/4 mx-auto text-center">
            Add Product
          </h4>

          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setname(e.target.value)}
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
            placeholder="Enter the name"
          />

          <input
            type="number"
            value={price}
            name="price"
            onChange={(e) => setprice(e.target.value)}
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
            placeholder="Enter the price"
          />

          <input
            type="text"
            value={category}
            name="category"
            onChange={(e) => setcategory(e.target.value)}
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
            placeholder="Enter the category"
          />

          <textarea
            value={description}
            name="description"
            onChange={(e) => setdescription(e.target.value)}
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
            placeholder="Enter the description"
            rows="3"
          />

          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rate}
            name="category"
            onChange={(e) => rateHandle(e.target.value)}
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
            placeholder="Enter the Rating"
          />

          <input
            type="text"
            value={count}
            name="category"
            onChange={(e) => setcount(e.target.value)}
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
            placeholder="Enter the no.of products."
          />

          <input
            type="file"
            onChange={(e) => setimage(e.target.files[0])}
            name="file"
            className="form-control w-3/4 ps-3 text-lg border my-2 rounded-xl mx-auto"
          />

          <button
            type="submit"
            className="bg-blue-800 text-white rounded-xl mx-auto w-3/4 text-center text-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
