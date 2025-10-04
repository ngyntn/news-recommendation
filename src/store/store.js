import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        news: newsReducer, 
        user: userReducer,
    },
});

export default store;