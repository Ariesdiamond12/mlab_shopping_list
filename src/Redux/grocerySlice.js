import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "groceryList",
  initialState: [], // Directly store the items as an array
  reducers: {
    setItems: (state, action) => {
      return action.payload; // Replace the state with fetched items
    },

    addItem: (state, action) => {
      state.push(action.payload); // Directly push the new item into the array
      addShoppingItem(action.payload); // Post the item to the server
    },

    fetchItem: (state, action) => {
      // Fetch items from the server and dispatch `setItems` to update the state
      const fetchShoppingList = async (dispatch) => {
        await fetch(`http://localhost:3000/items`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            const user = JSON.parse(localStorage.getItem("userData"));
            // Filter the data based on userId
            const filteredItems = data.filter(
              (item) => item.userId === user.id
            );

            // Dispatch the filtered items or log them
            console.log(filteredItems);
           setItems(filteredItems); // Uncomment this line to update state
          });
      };
      fetchShoppingList(action.payload); // Pass dispatch as argument
    },

    deleteItem: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },

    updateItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      state[index] = updatedItem; // Update the item in the array
    },
  },
});

const addShoppingItem = async (newItem) => {
  await fetch(`http://localhost:3000/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });
};

export default grocerySlice.reducer;
export const { addItem, fetchItem, deleteItem, updateItem, setItems } =
  grocerySlice.actions;
