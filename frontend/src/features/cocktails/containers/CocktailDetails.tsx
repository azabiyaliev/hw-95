import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCocktail, selectCocktailLoading} from "../cocktailsSlice.ts";
import {useEffect} from "react";
import {getPickedCocktail} from "../cocktailsThunk.ts";
import {useParams} from "react-router-dom";
import {Box, CardContent, CardMedia, CircularProgress, List, ListItem, Typography} from "@mui/material";
import {apiUrl} from "../../../globalConstants.ts";

const CocktailDetails = () => {

    const params = useParams<{ idCocktail: string }>();
    const dispatch = useAppDispatch();
    const cocktail = useAppSelector(selectCocktail);
    const loading = useAppSelector(selectCocktailLoading)
    console.log(cocktail)

    useEffect(() => {
        if (params.idCocktail)
            dispatch(getPickedCocktail(params.idCocktail));
    }, [dispatch, params]);


    return (
        <>
            {loading ? (
                <CircularProgress/>
            ) : (
                <>
                    {!cocktail ? (<Typography>Not found cocktail</Typography>) : (
                        <Box sx={{width: "70%", m: 2, display: 'flex', justifyContent: 'space-between'}}>
                            <CardMedia
                                component="img"
                                sx={{height: "600px", width: "100%", objectFit: "contain"}}
                                src={apiUrl + "/" + cocktail.image}
                                alt="Long Island Iced Tea"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div" fontWeight="bold">
                                    {cocktail.title}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    Ингредиенты:
                                </Typography>
                                <List dense>
                                    {cocktail.ingredients.map(ingredient => (
                                        <ListItem key={ingredient._id}>
                                            • {ingredient.titleOfIngredient} - {ingredient.quantity}
                                        </ListItem>
                                    ))}
                                </List>
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    Рецепт:
                                </Typography>
                                <Typography variant="body2">
                                    {cocktail.recipe}
                                </Typography>
                            </CardContent>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

export default CocktailDetails;