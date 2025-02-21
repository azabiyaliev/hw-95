import {ICocktail} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    deleteCocktailById,
    getCocktails,
    getPickedCocktail,
    postCocktail,
    togglePublished
} from "./cocktailsThunk.ts";
import {RootState} from "../../app/store.ts";

interface CocktailState {
    cocktails: ICocktail[];
    cocktailsLoading: boolean;
    cocktailsError: boolean;
    cocktail: ICocktail | null;
    cocktailLoading: boolean;
    cocktailError: boolean;
    cocktailPostLoading: boolean;
    cocktailDeleteLoading: boolean;
    cocktailPublishedLoading: boolean;
}

const initialState: CocktailState = {
    cocktails: [],
    cocktailsLoading: false,
    cocktailsError: false,
    cocktail: null,
    cocktailLoading: false,
    cocktailError: false,
    cocktailPostLoading: false,
    cocktailDeleteLoading: false,
    cocktailPublishedLoading: false,
}

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.cocktailsLoading;
export const selectCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectCocktailLoading = (state: RootState) => state.cocktails.cocktailLoading;
export const selectCocktailPostLoading = (state: RootState) => state.cocktails.cocktailPostLoading;


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
            .addCase(postCocktail.pending, (state) => {
                state.cocktailPostLoading = true
            })
            .addCase(postCocktail.fulfilled, (state) => {
                state.cocktailPostLoading = false
            })
            .addCase(postCocktail.rejected, (state) => {
                state.cocktailPostLoading = false
            })
            .addCase(deleteCocktailById.pending, (state) => {
                state.cocktailDeleteLoading = true
            })
            .addCase(deleteCocktailById.fulfilled, (state) => {
                state.cocktailDeleteLoading = false
            })
            .addCase(deleteCocktailById.rejected, (state) => {
                state.cocktailDeleteLoading = false
            })
            .addCase(togglePublished.pending, (state) => {
                state.cocktailPublishedLoading = true
            })
            .addCase(togglePublished.fulfilled, (state) => {
                state.cocktailPublishedLoading = false
            })
            .addCase(togglePublished.rejected, (state) => {
                state.cocktailPublishedLoading = false
            })
    }
})

export const cocktailsReducer = cocktailsSlice.reducer;