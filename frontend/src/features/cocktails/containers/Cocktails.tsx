import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCocktails, selectCocktailsLoading} from "../cocktailsSlice.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {useEffect} from "react";
import {getCocktails} from "../cocktailsThunk.ts";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography
} from "@mui/material";
import {apiUrl} from "../../../globalConstants.ts";
import {NavLink} from "react-router-dom";
// import {useNavigate} from "react-router-dom";



const Cocktails = () => {

    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCocktails());
    }, [dispatch])


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
                                    if (!cocktail.isPublished && !(user && (user.role === "admin"))) return null;
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
                                                    {(user && user.role === "admin") ?
                                                        (!cocktail.isPublished ? (
                                                            <Box
                                                                sx={{display: "flex", justifyContent: "space-between"}}>
                                                                <CardContent>Not published</CardContent>
                                                                {/*<Button onClick={() => published(artist._id)}>Published</Button>*/}
                                                            </Box>
                                                        ) : null)
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

export default Cocktails;