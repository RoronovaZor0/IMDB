import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./favouriteReducer";

export default configureStore({
    reducer:{
        favourites: favouriteReducer,
    },
})