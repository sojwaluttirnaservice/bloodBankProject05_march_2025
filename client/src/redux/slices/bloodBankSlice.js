import { createSlice } from "@reduxjs/toolkit";



let initialBloodBankState = {
    bloodBank: {},
    token: null,
    isAuthenticated: false
}

const bloodBankSlice = createSlice({
    name: "bloodBank",

    initialState: initialBloodBankState,

    reducers: {
        onLogin: (state, action) => {
            let { bloodBank, token } = action.payload;
            state.bloodBank = bloodBank;
            state.token = token;
            state.isAuthenticated = true;
        },

        // eslint-disable-next-line no-unused-vars
        onLogout: (state, action) => {
            return { ...initialBloodBankState }
        }


        
    }
})


export const { onLogin, onLogout } = bloodBankSlice.actions;

export default bloodBankSlice.reducer