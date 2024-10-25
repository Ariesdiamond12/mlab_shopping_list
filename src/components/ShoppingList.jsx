import React, { useEffect, useId, useState } from "react";
import { HiClipboardList } from "react-icons/hi";
import { BsBasket2Fill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  fetchItem,
  deleteItem,
  updateItem,
} from "../Redux/grocerySlice";
import Navbar from "./Navbar";

function ShoppingList() {
  const categories = [
    "All",
    "Beverages",
    "Bread/Bakery",
    "Canned Food",
    "Dairy",
    "Dry/Baking Goods",
    "Frozen Foods",
    "Meat",
    "Fruits",
    "Vegetables",
    "Cleaning Supplies",
    "Paper Goods",
    "Personal Care",
    "Other",
  ];

  const groceryList = useSelector((state) => state.groceryList);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("name"); // Default sort by name
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    dispatch(fetchItem());
    setUser(JSON.parse(localStorage.getItem("userData")));
  }, [dispatch]);

  const handleAddItem = () => {
    if (user && itemName && quantity) {
      const newItem = {
        userId: user.id,
        name: itemName,
        quantity,
        notes,
        category: selectedCategory,
      };

      // Reset the fields
      setItemName("");
      setQuantity("");
      setNotes("");
      setSelectedCategory("");

      dispatch(addItem(newItem));
    }
  };

  // Sort items based on selected sort option
  const sortedList = [...groceryList].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "quantity") {
      return a.quantity - b.quantity;
    } else if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Filter items by category
  const filteredList = sortedList.filter(
    (item) => filterCategory === "All" || item.category === filterCategory
  );

  // Filter by search term
  const queriedList = filteredList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(index));
  };

  const handleEditItem = (index) => {
    const item = groceryList[index];
    setItemName(item.name);
    setQuantity(item.quantity);
    setNotes(item.notes);
    setSelectedCategory(item.category);
    setEditingItem(index);
  };

  const handleUpdateItem = () => {
    const updatedItem = {
      name: itemName,
      quantity,
      notes,
      category: selectedCategory,
    };

    dispatch(updateItem({ index: editingItem, updatedItem }));
    setEditingItem(null);

    // Reset the fields
    setItemName("");
    setQuantity("");
    setNotes("");
    setSelectedCategory("");
  };

  return (
    <div className="bg-[#9BBEC8] flex py-4 min-h-screen justify-evenly">
      <Navbar />
      {console.log(groceryList)}

      {/* Add Item Section */}
      <div className="mt-32 bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[650px] rounded-lg">
        <div className="flex items-center mt-7 gap-2">
          <HiClipboardList className="text-5xl" />
          <h1 className="text-3xl font-semibold">
            {editingItem !== null ? "Edit Grocery" : "Add Grocery"}
          </h1>
        </div>

        <div>
          <input
            className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Name of Items"
          />
        </div>

        <label htmlFor="categories">
          <h1 className="text-lg font-medium">Category</h1>
        </label>
        <select
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.slice(1).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

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
          onClick={editingItem !== null ? handleUpdateItem : handleAddItem}
        >
          {editingItem !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Grocery List Section */}
      <div className="mt-32 bg-white place-self-center w-1/2 max-w-md flex flex-col p-7 min-h-[680px] rounded-lg">
        <div className="flex items-center mt-7 gap-2">
          <BsBasket2Fill className="text-5xl" />
          <h1 className="text-3xl font-semibold">Grocery List</h1>
        </div>

        {/* Search */}
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter by Category */}
        <div className="flex space-x-4 my-4">
          <select
            className="bg-gray-200 h-12 w-full rounded-full flex-1"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort by Option */}
          <select
            className="bg-gray-200 h-12 w-full rounded-full flex-1"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        {/* Displaying the List */}
        <ul className="max-h-[400px] overflow-y-auto">
          {queriedList.length > 0 ? (
            queriedList.map((item, index) => (
              <li key={index} className="py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p>Category: {item.category}</p>
                <p>Quantity: {item.quantity} kgs</p>
                {item.notes && <p>Notes: {item.notes}</p>}
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-[#b90504] text-white px-4 py-2 rounded-full"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    onClick={() => handleEditItem(index)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No items match your criteria.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList;
