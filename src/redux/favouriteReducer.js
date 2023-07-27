import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState:{
        value: []
    },
    reducers:{
        addFavourites: (state,action) => {
            state.value = state.value.concat(action.payload);
        },
    },
});

// Actions
export const {addFavourites} = favouritesSlice.actions
export const favMovies = (state)=> state.favourites.value
export default favouritesSlice.reducer