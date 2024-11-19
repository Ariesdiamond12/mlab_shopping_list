import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Navbar() {
  const [email, setEmail] = useState();
  const navigate = useNavigate()

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to register user
      const response = await fetch("http://localhost:3000/itemsToShare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        

        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      // setError("Error registering user");
    }
  };

  const handleLogout = () => {
    // Clear any user session data (e.g., localStorage)
    localStorage.removeItem("users");
    navigate("/login"); 
  };

  return (
    <div className="flex justify-between items-center h-20 bg-white fixed top-0 left-0 w-full">
      <div>
        <h1 className="text-3xl font-bold ml-10">Shopping List</h1>
      </div>

      <div className="flex items-center">
        {/* <form className="flex items-center" onSubmit={handleEmail}>
          <input
            className="flex items-center my-7 bg-gray-200 outline-none h-10 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full translate-x-12"
            type="text"
            value={email}
            placeholder="email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="bg-[#5fa8d3] border-none cursor-pointer h-10 w-28 mr-5 text-white rounded-full z-10"
            type="submit"
          >
            Share
          </button>
        </form> */}

        <button className="bg-[#5fa8d3] border-none cursor-pointer h-10 w-24 mr-5 text-white rounded-full" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
