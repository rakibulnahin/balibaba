import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: null,
    reducers: {
        setUserDetails: (state, action) => {
            return action.payload
        },
        clearUserDetials: () => null
    },
})

export const { setUserDetails, clearUserDetials } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;