import React from "react";
import Writing from "../assets/write.jpg";

function Login() {
  return (
    <div className="relative w-full h-screen bg-zinc-800/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={Writing}
        alt=""
      />

      {/* Form */}
      <div className="flex justify-center items-center h-full">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8">
          <h2 className="text-3xl font-bold text-center py-8">Login</h2>
          <div className="flex flex-col mb-4">
            <label> Username</label>
            <input type="text" className="border-relative p-2" />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input className="border-relative p-2" type="password" />
          </div>
          <button className="w-full py-3 mt-8 bg-[#001845] hover:bg-[#0353a4] relative text-white rounded-lg">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
