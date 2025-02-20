import {ICocktail} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCocktails, getPickedCocktail} from "./cocktailsThunk.ts";
import {RootState} from "../../app/store.ts";

interface CocktailState {
    cocktails: ICocktail[];
    cocktailsLoading: boolean;
    cocktailsError: boolean;
    cocktail: ICocktail | null;
    cocktailLoading: boolean;
    cocktailError: boolean;
}

const initialState: CocktailState = {
    cocktails: [],
    cocktailsLoading: false,
    cocktailsError: false,
    cocktail: null,
    cocktailLoading: false,
    cocktailError: false,
}

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.cocktailsLoading;
export const selectCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectCocktailLoading = (state: RootState) => state.cocktails.cocktailsLoading;


export const cocktailsSlice = createSlice({
    name: "cocktails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCocktails.pending, (state) => {
                state.cocktailsLoading = true
            })
            .addCase(getCocktails.fulfilled, (state, action: PayloadAction<ICocktail[]>) => {
                state.cocktails = action.payload
                state.cocktailsLoading = false
            })
            .addCase(getCocktails.rejected, (state) => {
                state.cocktailsLoading = false
            })
            .addCase(getPickedCocktail.pending, (state) => {
                state.cocktailLoading = true
            })
            .addCase(getPickedCocktail.fulfilled, (state, action: PayloadAction<ICocktail>) => {
                state.cocktail = action.payload
                state.cocktailLoading = false
            })
            .addCase(getPickedCocktail.rejected, (state) => {
                state.cocktailLoading = false
            })


    }
})

export const cocktailsReducer = cocktailsSlice.reducer;