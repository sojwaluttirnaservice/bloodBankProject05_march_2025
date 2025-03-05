import { createSlice } from "@reduxjs/toolkit";



let initialUserState = {
    user: {},
    token: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",

    initialState: initialUserState,

    reducers: {
        onLogin: (state, action) => {
            let { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
        },

        // eslint-disable-next-line no-unused-vars
        onLogout: (state, action) => {
            return { ...initialUserState }
        }
    }
})


export const { onLogin, onLogout } = userSlice.actions;

export default userSlice.reducer