import { createSlice } from "@reduxjs/toolkit";



let initialAdminState = {
    admin: {},
    token: null,
    isAuthenticated: false
}

const adminSlice = createSlice({
    name: "admin",

    initialState: initialAdminState,

    reducers: {
        onLogin: (state, action) => {
            let { admin, token } = action.payload;
            state.admin = admin;
            state.token = token;
            state.isAuthenticated = true;
        },

        // eslint-disable-next-line no-unused-vars
        onLogout: (state, action) => {
            return { ...initialAdminState }
        }
    }
})


export const { onLogin, onLogout } = adminSlice.actions;

export default adminSlice.reducer