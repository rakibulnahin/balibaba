import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./userDetailsSlice";
import cartReducer from "./cartSlice"

export const store = configureStore({
    reducer: {
        userDetails: userDetailsReducer,
        cartDetails: cartReducer,
    }
})