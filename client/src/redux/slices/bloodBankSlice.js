import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axiosInstance/axiosInstance";

let initialBloodBankState = {
    id: -1,
    name: '',
    email: '',
    phone: '',
    role: '',
    token: '',
    isAuthenticated: false
}



const getBloodBankDetailsFromLocalStorage = () => {

    try {
        if (typeof window === 'undefined') {
            return initialBloodBankState;
        }

        let storedData = localStorage.getItem('bloodBank')

        if (storedData) {
            let parsedData = JSON.parse(storedData)
            if (parsedData.token) {
                instance.defaults.headers.common["Authorization"] = `Bearer ${parsedData.token}`;
            }

            return parsedData
        }
        return initialBloodBankState

    } catch (err) {
        console.error('Error:', err);
        return initialBloodBankState
    }
}

// console.log(getBloodBankDetailsFromLocalStorage())


const bloodBankSlice = createSlice({
    name: "bloodBank",

    initialState: getBloodBankDetailsFromLocalStorage(),

    reducers: {
        onLogin: (state, action) => {
            const { id, name, email, phone, role, token } = action.payload;

            state.id = id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.role = role || 'bloodBank';
            state.token = token;
            state.isAuthenticated = true;

            // Save updated state to localStorage

            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

            localStorage.setItem("bloodBank", JSON.stringify(state));
        },

        onLogout: (state) => {
            state.id = -1;
            state.name = "";
            state.email = "";
            state.phone = "";
            state.role = "bloodBank";
            state.token = "";
            state.isAuthenticated = false;


            // Remove token from axios instance headers
            delete instance.defaults.headers.common["Authorization"];

            localStorage.removeItem("bloodBank");
        },
    },
});

export const { onLogin, onLogout } = bloodBankSlice.actions;
export const bloodBankReducer = bloodBankSlice.reducer;
