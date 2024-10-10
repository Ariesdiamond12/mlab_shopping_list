import { configureStore } from "@reduxjs/toolkit"; //configureStore sets up redux store
import groceryReducer from "./grocerySlice";

// export const store = configureStore({
//   reducer: {
//     //handles all grocery-related state management
//     //all actions like adding, deleting and updating will go thru groceryReducer and update the grocery related part of the state
//     grocery: groceryReducer,
//   },
// });

const store = configureStore({
  reducer: {
    groceryList: groceryReducer,
  },
});
export default store;
