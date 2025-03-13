import { configureStore } from '@reduxjs/toolkit';

import { adminReducer } from './slices/adminSlice';
import { bloodBankReducer } from './slices/bloodBankSlice.js';
import { userReducer } from './slices/userSlice.js';


const store = configureStore({
    reducer: {
        admin: adminReducer,
        bloodBank: bloodBankReducer,
        user: userReducer,
    },
});

export { store }
