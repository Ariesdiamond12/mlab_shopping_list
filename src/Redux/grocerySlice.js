import { createSlice } from "@reduxjs/toolkit";
import ShoppingList from "../components/ShoppingList";

const grocerySlice = createSlice({
  name: "groceryList",
  // value: { item: "", quantity: 0, notes: "" }
  initialState: [],
  reducers: {
    // ShoppingList: state.ShoppingList;

    setItems: (state, action) => {
      state.groceryList = action.payload;
    },

    addItem: (state, action) => {
      // state.groceryList.push(action.payload);
      addShoppingItem(action.payload);
    },

    fetchItem: (state, payload) => {
      const fetchShoppingList = async () => {
        await fetch(`http://localhost:3000/items`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setItems(data);
          });
      };

      fetchShoppingList();
    },

    deleteItem: (state, action) => {
      state.groceryList = state.groceryList.filter(
        (_, index) => index !== action.payload
      );
    },
    updateItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      state.groceryList[index] = updatedItem;
    },
  },
});

const addShoppingItem = async (newItem) => {
  console.log("trying to add", newItem);
  await fetch(`http://localhost:3000/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  }).then((response) => {
    response.json();
  });
};

export default grocerySlice.reducer;
export const { addItem, fetchItem, deleteItem, updateItem, setItems } =
  grocerySlice.actions;
