import React, { useState } from "react";
import { HiClipboardList } from "react-icons/hi";
import { BsBasket2Fill } from "react-icons/bs";

function ShoppingList() {
  const [groceryList, setGroceryList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [queried, setQueried] = useState(groceryList);

  const handleAddItem = () => {
    if (itemName && quantity) {
      const newItem = { name: itemName, quantity, notes };
      const updatedList = [...groceryList, newItem];
      setGroceryList(updatedList);
      setQueried(updatedList);
      setItemName("");
      setQuantity("");
      setNotes("");

      fetch(`http://localhost:3000/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      }).then((response) => {
        response.json();
      });
    }
  };

  const handleDeleteItem = (index) => {
    const updatedList = groceryList.filter((_, i) => i !== index);
    setGroceryList(updatedList);
    setQueried(updatedList);
  };

  const handleUpdateItem = (index) => {
    const updatedItem = {
      ...groceryList[index],
      name: itemName,
      quantity,
      notes,
    };

    const updatedList = [
      ...groceryList.slice(0, index),
      updatedItem,
      ...groceryList.slice(index + 1),
    ];

    setGroceryList(updatedList);
    setQueried(updatedList);
    setEditingItem(null);
    setItemName("");
    setQuantity("");
    setNotes("");
  };

  const handleEditItem = (index) => {
    setEditingItem(index);
    const item = groceryList[index];
    setItemName(item.name);
    setQuantity(item.quantity);
    setNotes(item.notes);
  };

  // Search function
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredList = groceryList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setQueried(filteredList);
  };

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
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Name of Items"
          />
        </div>
        <label htmlFor="quantity">
          <h1 className="text-lg font-medium">Quantity</h1>
        </label>
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity in kgs"
        />
        <label htmlFor="quantity">
          <h1 className="text-lg font-medium">Notes(optional)</h1>
        </label>
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
        <button
          className="border-none rounded-full bg-[#146C94] h-16 w-full pl-6 pr-2 text-white text-lg font-medium cursor-pointer"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>

      {/* 2nd Column */}
      <div className="bg-white place-self-center w-1/2 max-w-md flex flex-col p-7 min-h-[650px] rounded-lg">
        {/* Title */}
        <div className="flex items-center mt-7 gap-2">
          <BsBasket2Fill className="text-5xl" />
          <h1 className="text-3xl font-semibold">Grocery List</h1>
        </div>
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />

        {/* Grocery List */}
        <ul>
          {queried.map((item, index) => (
            <li key={index} className="py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p>Quantity: {item.quantity} kgs</p>
              {item.notes && <p>Notes: {item.notes}</p>}
              <div className="flex gap-2">
                <div>
                  <button onClick={() => handleDeleteItem(index)}>
                    delete
                  </button>
                </div>
                <div>
                  <button onClick={() => handleEditItem(index)}>edit</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList;
