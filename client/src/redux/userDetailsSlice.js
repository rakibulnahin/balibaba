import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: null,
    reducers: {
        setUserDetails: (state, action) => {
            return action.payload
        },
        clearUserDetails: () => null
    },
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;