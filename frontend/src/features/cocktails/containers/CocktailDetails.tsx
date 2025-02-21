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
    const loading = useAppSelector(selectCocktailLoading);

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
                        <Box sx={{
                            width: "50%",
                            mt: 2,
                            mx: "auto",
                            display: 'flex',
                            alignItems: 'stretch',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            border: "1px solid gray",
                            borderRadius: 4,
                            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                        }}>
                            <CardMedia
                                component="img"
                                sx={{minHeight: "100%", width: "45%", objectFit: "fill", borderBottomLeftRadius: 14, borderTopLeftRadius: 14, }}
                                src={apiUrl + "/" + cocktail.image}
                                alt={cocktail.title}
                            />
                            <CardContent sx={{width:'55%', minHeight: '100%'}}>
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