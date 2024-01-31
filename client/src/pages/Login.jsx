import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "https://red-baton-backend.onrender.com/user/login",
        {
          username,
          password,
        }
      );
      if (data) {
        localStorage.setItem("data", data.data);
        console.log(localStorage.getItem("data"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://red-baton-backend.onrender.com/user/register",
        {
          username,
          password,
        }
      );
      if (data) {
        localStorage.setItem("data", data.data);
        console.log(localStorage.getItem("data"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleLoginForm}>
        <span className="text-base font-medium">Login</span>
        <div className="mt-2 flex w-[280px] items-center justify-between mb-3 ">
          <span>username: </span>
          <input
            type="text"
            className="border border-black outline-none text-ellipsis"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex w-[280px] justify-between">
          <span>Password:</span>
          <input
            type="text"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border border-black outline-none text-ellipsis"
          />
        </div>

        <button
          type="submit"
          className=" px-3 rounded-sm bg-slate-400 border-black border mb-6 mt-3"
        >
          login
        </button>
      </form>

      <form onSubmit={handleRegisterForm}>
        <span className="text-base font-medium">Create Account</span>
        <div className="mt-2 flex w-[280px] items-center justify-between mb-3 ">
          <span>username: </span>
          <input
            type="text"
            className="border border-black outline-none text-ellipsis"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex w-[280px] justify-between">
          <span>Password:</span>
          <input
            type="text"
            className="border border-black outline-none text-ellipsis"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className=" px-3 rounded-sm bg-slate-400 border-black border mt-3"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Login;
