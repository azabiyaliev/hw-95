import {ICocktail} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCocktails} from "./cocktailsThunk.ts";
import {RootState} from "../../app/store.ts";

interface CocktailState {
    cocktail: ICocktail[];
    cocktailLoading: boolean;
    cocktailError: boolean;
}

const initialState: CocktailState = {
    cocktail: [],
    cocktailLoading: false,
    cocktailError: false,
}

export const selectCocktails = (state: RootState) => state.cocktails.cocktail;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.cocktailLoading;


export const cocktailsSlice = createSlice({
    name: "cocktails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCocktails.pending, (state) => {
                state.cocktailLoading = true
            })
            .addCase(getCocktails.fulfilled, (state, action: PayloadAction<ICocktail[]>) => {
                state.cocktail = action.payload
                state.cocktailLoading = false
            })
            .addCase(getCocktails.rejected, (state) => {
                state.cocktailLoading = false
            })

    }
})

export const cocktailsReducer = cocktailsSlice.reducer;