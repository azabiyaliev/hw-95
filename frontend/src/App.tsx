import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./features/users/containers/RegisterPage.tsx"
import LoginPage from "./features/users/containers/LoginPage.tsx";
import {Typography} from "@mui/material";
import Cocktails from "./features/cocktails/containers/Cocktails.tsx";
import CocktailDetails from "./features/cocktails/containers/CocktailDetails.tsx";

const App = () => {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/*" element={<Typography variant="h4" sx={{textAlign: "center"}}>Not found </Typography>}/>
                <Route path="/" element={<Cocktails/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/cocktails" element={<Cocktails/>}/>
                <Route path="/cocktails/:idCocktail" element={<CocktailDetails/>}/>
            </Routes>
        </>
    )
};

export default App
