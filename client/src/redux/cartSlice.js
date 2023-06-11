import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartDetails",
    initialState: [],
    reducers: {
        addToCart: (state, action)=>{
            return [
                ...state,
                action.payload
            ]
        },

        removeFromCart: (state, action) => {
            let x = state;
            x.splice(action.payload, 1)
            return x
        },

        clearCart: () => []
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer