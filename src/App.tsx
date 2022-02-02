import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import "./App.css";
import RecoverPasswordPage from "./pages/recover-password/RecoverPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/recover" element={<RecoverPasswordPage />} />
    </Routes>
  );
}

export default App;
