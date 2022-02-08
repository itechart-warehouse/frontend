import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import { PersistGate }from 'redux-persist/integration/react'
import {store, persistor} from "./store";

import Header from "./components/header/Header";

function Main() {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );
}

ReactDOM.render(<Main/>, document.getElementById("root"));
