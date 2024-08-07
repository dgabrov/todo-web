import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import createEmptyStore from "./data/store/create-empty-store";
import centralReducer from "./reducer/central-reducer";
import {VERSION_NUMBER} from "./util/constants";
import {configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import {createRoot} from "react-dom/client";

const initialState = createEmptyStore();

const store = configureStore({
    reducer: centralReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState: initialState
})
console.log('Version: ' + VERSION_NUMBER);

const container = document.getElementById('root')
const root = createRoot(container!!)

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
