import {Route, Routes, Navigate} from "react-router-dom";
import {useContext} from "react";
import HomePage from "./pages/home/HomePage";
import Header from "./components/header/Header";
import "./App.css";
//import RecoverPasswordPage from "./pages/recover-password/RecoverPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import {LoginContext} from "./context/loginContext";

function App() {
    const isLoggedIn = useContext(LoginContext)

    return (
        <Routes>
            {
                isLoggedIn ?
                    <>
                        <Route path="/" element={<Navigate to="home"/>}/>
                        <Route path="home" element={<HomePage/>}/>
                    </>
                :
                <Route path="/" element={<LoginPage/>}/>
                /*<Route path="/recover" element={<RecoverPasswordPage />} />*/
            }
        </Routes>
    );
}

export default App;
