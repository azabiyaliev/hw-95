import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCocktails, selectCocktailsLoading} from "../cocktailsSlice.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {useEffect} from "react";
import {deleteCocktailById, getCocktails, togglePublished} from "../cocktailsThunk.ts";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
    IconButton, CardActions, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import {apiUrl} from "../../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const Cocktails = () => {

    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCocktails());
    }, [dispatch])

    const deleteCocktail = async (id: string) => {
        await dispatch(deleteCocktailById(id))
        navigate(`/`)
    }

    const publishedCocktail = async (id: string) => {
        await dispatch(togglePublished(id));
        navigate(`/`)
    }


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
                                    if (!cocktail.isPublished && !(user && (user.role === "admin"))) return null;
                                    return (
                                        <Grid key={cocktail._id} size={4}>
                                            <Card sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '93%',
                                                maxWidth: 345,
                                                mt: 5,
                                                borderRadius: 2,
                                                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                                                "&:hover": {boxShadow: 10, color: "#388e3c"}
                                            }}>
                                                <CardActionArea to={`/cocktails/${cocktail._id}`} component={NavLink}
                                                                sx={{flexGrow: 1}}>
                                                    <CardMedia
                                                        style={{width: "100%"}}
                                                        height={400}
                                                        component="img"
                                                        image={apiUrl + "/" + cocktail.image}
                                                        title={cocktail.title}
                                                    />
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: "50%"
                                                    }}>
                                                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                            <CardContent>
                                                                <Typography variant="h6" textAlign="center"
                                                                            fontWeight="bold">{cocktail.title}</Typography>
                                                            </CardContent>
                                                            {(user && (user.role === "admin" || (user._id === cocktail.user && !cocktail.isPublished))) ? (
                                                                <>
                                                                    <CardActions>
                                                                        <IconButton
                                                                            onClick={() => deleteCocktail(cocktail._id)}>
                                                                            <DeleteIcon/>
                                                                        </IconButton>
                                                                    </CardActions>
                                                                </>
                                                            ) : null}
                                                        </Box>
                                                        {(user && user.role === "admin") ?
                                                            (!cocktail.isPublished ? (
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between"
                                                                    }}>
                                                                    <CardContent>Не опубликован</CardContent>
                                                                    <Button
                                                                        onClick={() => publishedCocktail(cocktail._id)}>Опубликовать</Button>
                                                                </Box>
                                                            ) : null)
                                                            : null}
                                                    </Box>

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

export default Cocktails;