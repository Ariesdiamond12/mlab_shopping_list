import React from "react";
import { HiClipboardList } from "react-icons/hi";
import { BsBasket2Fill } from "react-icons/bs";

function ShoppingList() {
  return (
    <div className="bg-[#9BBEC8] flex py-4 min-h-screen justify-evenly">
      {/* 1st Column */}
      <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[650px] rounded-lg">
        {/* Title */}
        <div className="flex items-center mt-7 gap-2">
          <HiClipboardList className="text-5xl" />
          <h1 className="text-3xl font-semibold">Add Grocery</h1>
        </div>

        {/* Input Box */}

        <div>
          <input
            className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
            type="text"
            placeholder="Name of Items"
          />
        </div>
        <label htmlFor="quantity">
          <h1 className="text-lg font-medium">Quantity</h1>
        </label>
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          placeholder="Quantity in kgs"
        />
        <label htmlFor="quantity">
          <h1 className="text-lg font-medium">Notes(optional)</h1>
        </label>
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          placeholder="Notes"
        />
        <button className="border-none rounded-full bg-[#146C94] h-16 w-full pl-6 pr-2 text-white text-lg font-medium cursor-pointer">
          Add
        </button>
      </div>

      {/*   2nd Column */}
      <div className="bg-white place-self-center w-1/2 max-w-md flex flex-col p-7 min-h-[650px] rounded-lg">
        {/* Title */}
        <div className="flex items-center mt-7 gap-2">
          <BsBasket2Fill className="text-5xl" />
          <h1 className="text-3xl font-semibold">Grocery List</h1>
        </div>
        {/* Input Box */}

        <div>
          <input
            className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
