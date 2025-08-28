import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const CART_KEY = "cartItems";
const QTY_KEY = "cartQuantities";

const Cart = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    const storedQty = localStorage.getItem(QTY_KEY);
    if (storedCart) setCartProducts(JSON.parse(storedCart));
    if (storedQty) setQuantities(JSON.parse(storedQty));
  }, []);

  useEffect(() => {
    if (product) {
      setCartProducts((prev) => {
         const unique = prev.filter((p) => p._id !== product._id);
        const updatedCart = [...unique,product];
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
        return updatedCart;
      });

      setQuantities((prev) => {
        const updatedQty = {
          ...prev,
            [product._id]: prev[product._id] ? prev[product._id] + 1 : 1,
        };
        localStorage.setItem(QTY_KEY, JSON.stringify(updatedQty));
        return updatedQty;
      });
    }
  }, [product]);

  const increaseQty = (id) => {
    setQuantities((prev) => {
      const updated = {
        ...prev,
        [id]: Math.min((prev[id] || 1) + 1, 5),
      };
      localStorage.setItem(QTY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => {
      const updated = {
        ...prev,
        [id]: Math.max((prev[id] || 1) - 1, 1),
      };
      localStorage.setItem(QTY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const OrderHandler = () => {
    if (cartProducts.length < 1) {
      alert("You have no orders. Plaese place some orders.");
    } else {
      alert("Order Successfully.");
    }
  };

  const removeItem = (id) => {
    const updatedCart = cartProducts.filter((p) => p._id !== id);
    const { [id]: _, ...updatedQty } = quantities;

    setCartProducts(updatedCart);
    setQuantities(updatedQty);

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    localStorage.setItem(QTY_KEY, JSON.stringify(updatedQty));
  };

  return (
    <div className="container my-10 mx-auto bg-gray-300 rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 px-5 py-3 rounded-2xl flex items-center justify-evenly flex-col md:flex-row gap-3"
            >
              <div className="md:w-1/4 w-full flex items-center justify-center">
                <img
                  className="w-full max-h-[200px] object-contain rounded-2xl"
                  src={`${BACKEND_LINK}/image/${item.image}`}
                  alt={item.name}
                />
              </div>

              <div className="md:w-1/3 w-full">
                <h1 className="text-xl text-center font-bold text-gray-800">
                  {item.name}
                </h1>
                <p className="text-green-700 text-center text-lg font-semibold">
                  $ {item.price}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <button
                    className="bg-black hover:cursor-pointer text-white rounded-2xl px-2 py-1"
                    onClick={() => decreaseQty(item._id)}
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="text-lg font-semibold">
                    {quantities[item._id] || 1}
                  </span>
                  <button
                    className="bg-black hover:cursor-pointer text-white rounded-2xl px-2 py-1"
                    onClick={() => increaseQty(item._id)}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
              <p className="text-lg font-medium">
                ${(item.price * (quantities[item._id] || 1)).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:cursor-pointer"
              >
                <MdDelete size={30} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={OrderHandler}
        className="mt-6 px-6 py-2 bg-gray-900 hover:cursor-pointer text-white rounded hover:bg-gray-800 disabled:opacity-50"
      >
        Place Order
      </button>
    </div>
  );
};

export default Cart;
