import React from "react";
import { HiClipboardList } from "react-icons/hi";
import { BsBasket2Fill } from "react-icons/bs";

function ShoppingList() {
  return (
    <div className="bg-[#9BBEC8] flex py-4 min-h-screen justify-evenly">
      {/* 1st Column */}
      <div className="bg-white place-self-center w-1/2 max-w-md flex flex-col p-7 min-h-[550px] rounded-lg">
        {/* Title */}
        <div className="flex items-center mt-7 gap-2">
          <HiClipboardList className="text-5xl" />
          <h1 className="text-3xl font-semibold">Add Grocery</h1>
        </div>
        {/* Input Box */}

        <div>
          <input type="text" placeholder="Add " />
        </div>
      </div>

      {/*   2nd Column */}
      <div className="bg-white place-self-center w-1/2 max-w-md flex flex-col p-7 min-h-[550px] rounded-lg">
        {/* Title */}
        <div className="flex items-center mt-7 gap-2">
          <BsBasket2Fill className="text-5xl" />
          <h1 className="text-3xl font-semibold">Grocery List</h1>
        </div>
        {/* Input Box */}

        <div>
          <input type="text" placeholder="Add " />
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
