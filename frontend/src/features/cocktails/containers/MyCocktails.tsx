import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCocktails, selectCocktailsLoading} from "../cocktailsSlice.ts";
import {selectUser} from "../../users/usersSlice.ts";
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";
import Container from "@mui/material/Container";
import {useEffect} from "react";
import {getCocktails} from "../cocktailsThunk.ts";

const MyCocktails = () => {

    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(getCocktails());
    }, [dispatch])

    console.log(cocktails)

    return (
        <Container maxWidth="lg">
            <Grid container direction={"row"}>
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {cocktails.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No cocktails yet
                            </Typography>
                        ) : (
                            <>
                                {cocktails.map((cocktail) => {
                                    if (!(user && (user._id === cocktail.user))) return null;
                                    return (
                                        <Grid key={cocktail._id} size={4}>
                                            <Card sx={{maxWidth: 345, mb: 2, mt: 5, borderRadius: 2, boxShadow: 3, "&:hover": { boxShadow: 10, color: "#388e3c" }}}>
                                                <CardActionArea to={`/cocktails/${cocktail._id}`} component={NavLink}>
                                                    <CardMedia
                                                        style={{width: "100%"}}
                                                        height={400}
                                                        component="img"
                                                        image={apiUrl + "/" + cocktail.image}
                                                        title={cocktail.title}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h6" textAlign="center" fontWeight="bold">{cocktail.title}</Typography>
                                                    </CardContent>
                                                    {(user && user._id === cocktail.user && !cocktail.isPublished) ?
                                                        (<CardContent sx={{ textAlign: "center", mt: -3 }}>Ваш коктейл находится на рассмотрении модератора</CardContent>)
                                                        : null}
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </>
                        )}
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default MyCocktails;