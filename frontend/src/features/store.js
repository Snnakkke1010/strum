import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";



export const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice
    },
    devTools: true
});