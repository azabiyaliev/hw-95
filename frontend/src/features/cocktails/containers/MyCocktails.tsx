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
            <Grid container direction={"row"} spacing={3}>
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
                                            <Card sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '95%',
                                                maxWidth: 345,
                                                mt: 5,
                                                borderRadius: 2,
                                                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                                                "&:hover": {boxShadow: 10, color: "#388e3c"}
                                            }}>
                                                <CardActionArea to={`/cocktails/${cocktail._id}`} component={NavLink} sx={{ flexGrow: 1}}>
                                                    <CardMedia
                                                        style={{width: "100%"}}
                                                        height={400}
                                                        component="img"
                                                        image={apiUrl + "/" + cocktail.image}
                                                        title={cocktail.title}
                                                    />
                                                    <CardContent sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                                                        <Typography variant="h6" textAlign="center"
                                                                    fontWeight="bold">{cocktail.title}</Typography>
                                                        {(user && user._id === cocktail.user && !cocktail.isPublished) ?
                                                            (<Typography sx={{textAlign: "center"}}>Ваш коктейл
                                                                находится на рассмотрении модератора</Typography>)
                                                            : null}
                                                    </CardContent>
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