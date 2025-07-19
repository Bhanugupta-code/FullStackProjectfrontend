import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import ProductDetails from "./pages/ProductDetails";
import Loader from "./components/Loader";

const App = () => {
  const [itemList, setItemlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedresults, setsearchedresults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log("Data received");
      setItemlist(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar itemList={itemList} setsearchedresults={setsearchedresults} />
      <Routes>
        <Route
          path="/"
          element={
            <Home itemList={itemList} searchedresults={searchedresults} />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetails" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
