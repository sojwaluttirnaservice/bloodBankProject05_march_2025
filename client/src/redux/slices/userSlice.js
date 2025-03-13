import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axiosInstance/axiosInstance"; // Import axios instance

let initialUserState = {
    id: -1,
    full_name: "",
    email: "",
    role: "user",
    token: null,
    isAuthenticated: false,
};

// Function to retrieve user details from localStorage
const getUserDataFromLocalStorage = () => {
    try {
        if (typeof window === "undefined") {
            return initialUserState;
        }

        let storedData = localStorage.getItem("user");
        if (storedData) {
            let parsedData = JSON.parse(storedData);

            // Set token in axios instance if exists
            if (parsedData.token) {
                instance.defaults.headers.common["Authorization"] = `Bearer ${parsedData.token}`;
            }

            return parsedData;
        }

        return initialUserState;
    } catch (err) {
        console.error("Error:", err);
        return initialUserState;
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: getUserDataFromLocalStorage(),

    reducers: {
        onLogin: (state, action) => {
            let { id, full_name, email, token } = action.payload;
            state.id = id;
            state.full_name = full_name;
            state.email = email;
            state.token = token;
            state.isAuthenticated = true;

            // Set token in axios instance for future requests
            instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Save updated state to localStorage
            localStorage.setItem("user", JSON.stringify(state));
        },

        onLogout: (state) => {
            state.id = -1;
            state.full_name = "";
            state.email = "";
            state.role = "user";
            state.token = null;
            state.isAuthenticated = false;

            // Remove token from axios instance headers
            delete instance.defaults.headers.common["Authorization"];

            // Remove user details from localStorage
            localStorage.removeItem("user");
        },
    },
});

export const { onLogin, onLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;
