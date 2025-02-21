import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./features/users/containers/RegisterPage.tsx"
import LoginPage from "./features/users/containers/LoginPage.tsx";
import {Typography} from "@mui/material";
import Cocktails from "./features/cocktails/containers/Cocktails.tsx";
import CocktailDetails from "./features/cocktails/containers/CocktailDetails.tsx";
import MyCocktails from "./features/cocktails/containers/MyCocktails.tsx";
import NewCocktail from "./features/cocktails/containers/NewCocktail.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

const App = () => {

    const user = useAppSelector(selectUser);


    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/*" element={<Typography variant="h4" sx={{textAlign: "center"}}>Not found </Typography>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Cocktails/>}/>
                <Route path="/cocktails" element={<Cocktails/>}/>
                <Route path="/cocktails/:idCocktail" element={<CocktailDetails/>}/>
                <Route path="/myCocktails" element={
                    <ProtectedRoute isAllowed={user && (user.role === "admin" || user.role === "user")}>
                        <MyCocktails/>
                    </ProtectedRoute>
                }/>
                <Route path="/addNewCocktail" element={
                    <ProtectedRoute isAllowed={user && (user.role === "admin" || user.role === "user")}>
                        <NewCocktail/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </>
    )
};

export default App
