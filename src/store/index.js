import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import settingSlice from "./slice/settingSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        setting: settingSlice
    }
});