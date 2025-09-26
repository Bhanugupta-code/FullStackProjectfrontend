import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import ProductDetails from "./pages/ProductDetails";
import Loader from "./components/Loader";
import AddProducts from "./components/AddProducts";
import Admin from "./pages/Admin";
import Authentication from "./pages/Authentication";
import Footer from "./components/Footer";

const App = () => {
  const [itemList, setItemlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedresults, setsearchedresults] = useState([]);

  const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${BACKEND_LINK}/products`);
      setItemlist(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (loading) return <Loader />;

  const AuthenticateUsercomponenet = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/authentication" replace />;
    }
    return children;
  };

  const Layout = ({ children }) => {
    return (
      <div>
        <Navbar itemList={itemList} setsearchedresults={setsearchedresults} />
        <div className="p-4">{children}</div>
        <Footer />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticateUsercomponenet>
              <Layout>
                <Home itemList={itemList} searchedresults={searchedresults} />
              </Layout>
            </AuthenticateUsercomponenet>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route path="/authentication" element={<Authentication />} />
        <Route
          path="/productdetails"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthenticateUsercomponenet requiredRole="Admin">
              <Layout>
                <Admin />
              </Layout>
            </AuthenticateUsercomponenet>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
