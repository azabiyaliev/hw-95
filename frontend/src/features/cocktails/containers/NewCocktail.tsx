import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {Cocktail} from "../../../types";
import {postCocktail} from "../cocktailsThunk.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {selectCocktailPostLoading} from "../cocktailsSlice.ts";
import {CircularProgress} from "@mui/material";
import CocktailForm from "../components/CocktailForm.tsx";


const NewCocktail = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCocktailPostLoading);


    const onSubmitForm = async (cocktail: Cocktail) => {
        try {
            await dispatch(postCocktail(cocktail)).unwrap();
            toast.success("Cocktail was successfully created!");
            navigate("/myCocktails");
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <>
            {loading ? (
                <CircularProgress/>
            ) : (
                <CocktailForm onSubmit={onSubmitForm}/>
            )}

        </>
    );
};

export default NewCocktail;