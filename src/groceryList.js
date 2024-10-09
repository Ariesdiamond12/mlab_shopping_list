import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "grocery",
  initialState: { value: { item: "", quantity: 0, notes: "" } },
  reducers: {},
});
