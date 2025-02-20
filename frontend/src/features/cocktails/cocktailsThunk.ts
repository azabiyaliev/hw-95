import {Cocktail, ICocktail} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {RootState} from "../../app/store.ts";

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

export const postCocktail = createAsyncThunk<void, Cocktail, { state: RootState}>(
    "cocktails/postCocktail",
    async (cocktail, { getState }) => {
        const token = getState().users.user?.token;

        const formData = new FormData();

        const keys = Object.keys(cocktail) as (keyof Cocktail)[];

        keys.forEach((key) => {
            const value = cocktail[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post("/cocktails", formData, {
            headers: {'Authorization': token},
        });
    }
)

export const deleteCocktailById = createAsyncThunk<void, string,  {state: RootState }>(
    "cocktails/deleteCocktailById",
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.delete(`/cocktails/${id}`, {headers: {'Authorization': token}});
    }
)


export const togglePublished = createAsyncThunk<void, string, {state: RootState}>(
    'cocktails/togglePublished',
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.patch(`/cocktails/${id}/togglePublished`, {headers: {'Authorization': token}});
    }
)
