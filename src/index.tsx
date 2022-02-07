import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./store";

import Header from "./components/header/Header";

function Main() {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    );
}

ReactDOM.render(<Main/>, document.getElementById("root"));
