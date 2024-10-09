import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "grocery",
  initialState: { value: { item: "", quantity: 0, notes: "" } },
  reducers: {
    addItem: (state, action) => {
      state.groceryList.push(action.payload);
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
    setItems: (state, action) => {
      state.groceryList = action.payload;
    },
  },
});

export default grocerySlice.reducer;
export const { addItem, deleteItem, updateItem, setItems } =
  grocerySlice.actions;
