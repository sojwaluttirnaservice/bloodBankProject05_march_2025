import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axiosInstance/axiosInstance"; // Import axios instance

const initialAdminState = {
    username: "",
    role: "",
    token: null,
    isAuthenticated: false,
};

// Function to retrieve admin details from localStorage
const getAdminDataFromLocalStorage = () => {
    try {
        if (typeof window === "undefined") {
            return initialAdminState;
        }

        let storedData = localStorage.getItem("admin");
        if (storedData) {
            let parsedData = JSON.parse(storedData);

            // Set token in axios instance if exists
            if (parsedData.token) {
                instance.defaults.headers.common["Authorization"] = `Bearer ${parsedData.token}`;
            }

            return parsedData;
        }

        return initialAdminState;
    } catch (err) {
        console.error("Error:", err);
        return initialAdminState;
    }
};

const adminSlice = createSlice({
    name: "admin",
    initialState: getAdminDataFromLocalStorage(),

    reducers: {
        onLogin: (state, action) => {
            let { username, token, role } = action.payload;
            state.username = username;
            state.token = token;
            state.role = role || "admin";
            state.isAuthenticated = true;

            // Set token in axios instance for future requests
            instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Save updated state to localStorage
            localStorage.setItem("admin", JSON.stringify(state));
        },

        onLogout: (state) => {
            state.username = "";
            state.role = "";
            state.token = null;
            state.isAuthenticated = false;

            // Remove token from axios instance headers
            delete instance.defaults.headers.common["Authorization"];

            // Remove admin details from localStorage
            localStorage.removeItem("admin");
        },
    },
});

export const { onLogin, onLogout } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
