import React from 'react';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Outlet} from "react-router-dom";
import {Header} from "../widgets/header/Header";

const App = () => {
    return (
        <Provider store={store}>
            <Header/>
            <Outlet/>
        </Provider>
    );
};

export default App;