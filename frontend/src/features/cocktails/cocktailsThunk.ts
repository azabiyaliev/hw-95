import {ICocktail} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const getCocktails = createAsyncThunk<ICocktail[], void>(
    "cocktails/getCocktails",
    async () => {
        const response = await axiosAPI.get<ICocktail[]>("/cocktails")
        return response.data || [];
    }
)

export const getPickedCocktail = createAsyncThunk<ICocktail, string>(
    "cocktails/getPickedCocktail",
    async (cocktail) => {
        const response = await axiosAPI.get<ICocktail>(`/cocktails/${cocktail}`)
        return response.data;
    }
)
