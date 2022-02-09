import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import "./App.css";
//import RecoverPasswordPage from "./pages/recover-password/RecoverPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import Companies from "./pages/company/Companies";
import Header from "./components/header/Header";

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.user.user.isLoggedIn)
    return (
        <>
            {
                isLoggedIn && <Header/>
            }
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Navigate to="home"/>}/>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="companies" element={<Companies/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/*" element={<Navigate to="/"/>}/>
                        <Route path="/" element={<LoginPage/>}/>
                        {/*<Route path="/password" element={<RecoverPasswordPage />} />*/}
                    </>
                )}
            </Routes>
        </>
    );
}

export default App;
