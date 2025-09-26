import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const Authentication = () => {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!toggle && password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    // For Register Page.
    if (!toggle) {
      try {
        const data = { name, email, password, toggle, role };
        const res = await axios.post(`${BACKEND_LINK}/user`, data);
        console.log(res);
        const { success, token } = res.data;
        localStorage.setItem("token", token);
        alert(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setRole("User");
        setConfirmPassword("");
        navigate("/", { replace: true });
      } catch (err) {
        if (err.response && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong while registering!");
        }

        return;
      }
    }
    // For Login page.
    else {
      try {
        const data = { name, email, password, toggle, role };
        const res = await axios.post(`${BACKEND_LINK}/user`, data);
        const token = res.data.token;
        localStorage.setItem("token", token);
        alert(res.data.message);
        navigate("/", {
          replace: true,
        });
      } catch (err) {
        if (err.response && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong while registering!");
        }

        return;
      }
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-300 via-pink-300 to-cyan-300 items-center min-h-screen ">
      <div className="w-full max-w-md  bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {toggle ? "Login" : "Register"}
        </h2>

        <form
          onSubmit={submitHandler}
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          {/* Dummy hidden input to prevent Chrome autofill */}
          <input
            type="text"
            name="fakeuser"
            autoComplete="new-password"
            className="hidden"
          />

          {!toggle && (
            <input
              className="rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="email"
            name="email"
            required
            autoComplete="off-random"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!toggle && (
            <select
              className="rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          )}
          {!toggle && (
            <>
              <input
                className="rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                type="password"
                name="confirmpassword"
                required
                autoComplete="new-password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition"
          >
            {toggle ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {toggle ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setToggle(!toggle)}
            className="text-purple-600 font-semibold hover:underline"
          >
            {toggle ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
