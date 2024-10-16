import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center h-20 bg-white fixed top-0 left-0 w-full">
      <div>
        <h1 className="text-3xl font-bold ml-10">Shopping List</h1>
      </div>
      <div>
        {/* <h2>Welcome, `${name}` </h2> */}
        <button className="bg-[#5fa8d3] border-none cursor-pointer h-10 w-24 mr-5 text-white rounded-full">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
