
import {NavLink} from "react-router-dom";
import {Typography} from "@mui/material";


const AddFormMenu = () => {
    return (
        <>
            <Typography
                sx={{ color: "inherit", textDecoration: "none", textTransform: "uppercase", fontSize: 14, mr: 1}}
                component={NavLink}
                to={"/addNewCocktail"}
            >
                Add cocktail
            </Typography>
        </>

    );
};

export default AddFormMenu;