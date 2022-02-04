import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginContext } from "./context/loginContext";
import Header from "./components/header/Header";

function Main() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("key") ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        <App />
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
