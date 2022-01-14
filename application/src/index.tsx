import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore, PreloadedState} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import Store from "./data/store/store";
import createEmptyStore from "./data/store/create-empty-store";
import centralReducer from "./reducer/central-reducer";

const initialState: PreloadedState<Store> = createEmptyStore();

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(centralReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
