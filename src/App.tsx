import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home_page/HomePage";
import './App.css'

function App() {
    return (
        <Routes>
            <Route path='/home' element={<HomePage/>}/>
        </Routes>
    );
}

export default App;
