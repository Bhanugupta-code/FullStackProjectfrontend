import React, { useState } from "react";
import AddProducts from "../components/AddProducts";
import ProductList from "../components/ProductList";
import UserList from "../components/UserList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products"); 

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

     <div className="relative inline-flex mb-6 border border-gray-300 rounded-lg overflow-hidden">
 
  <div
    className={`absolute top-0 left-0 px-4 h-full w-1/2 bg-gray-900 rounded-lg transition-all duration-300 ease-in-out`}
    style={{ transform: activeTab === "products" ? "translateX(0%)" : "translateX(100%)" }}
  ></div>


  <button
    onClick={() => setActiveTab("products")}
    className={`relative z-10 hover:cursor-pointer px-4 py-2 w-1/2 font-semibold transition-colors duration-300 ${
      activeTab === "products" ? "text-white" : "text-gray-700 hover:text-gray-900"
    }`}
  >
    Products
  </button>

  <button
    onClick={() => setActiveTab("users")}
    className={`relative z-10 hover:cursor-pointer px-4 py-2 w-1/2 font-semibold transition-colors duration-300 ${
      activeTab === "users" ? "text-white" : "text-gray-700 hover:text-gray-900"
    }`}
  >
    Users
  </button>
</div>




      <div className="bg-white shadow-md rounded-lg p-6">
        {activeTab === "products" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Add New Product</h2>
              <AddProducts />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Product List</h2>
              <ProductList />
            </div>
          </>
        )}
        {activeTab === "users" && (
          <>
            <h2 className="text-xl font-semibold mb-3">User List</h2>
            <UserList />
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
