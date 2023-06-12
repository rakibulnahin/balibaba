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

        // removeFromCart: (state, action) => {
        //     let x = state;
        //     x.splice(action.payload, 1)
        //     return x
        // },

        editCart: (state, action) => {
            let x = state;
            let index = action.payload.index;
            let task = action.payload.increase;
            let product = x[index];
            if(task == true && product['quantity'] < product["instock"]){
                product['quantity'] += 1
            }else if(task == false){
                if(product['quantity'] > 1){
                    product['quantity'] -= 1
                }else{
                    x.splice(index, 1)
                    return x
                }
            }

            x[index] = product
            return x
        },

        clearCart: (state, action) => [],
    }
})

export const {addToCart, removeFromCart, editCart, clearCart} = cartSlice.actions
export default cartSlice.reducer