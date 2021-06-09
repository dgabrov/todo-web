import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Store from "./data/store/store";
import Header from "./controls/Header";
import AppProps from "./data/props/app/app.props";
import {mainComponent} from "./data/controllers/main-component";
import {messageRefreshMs} from "./util/constants";
import AppPropsData from "./data/props/app/app-props-data";
import AppPropsCallback from "./data/props/app/app-props-callback";
import {createActionRefreshMessages} from "./reducer/actions/acton-refresh-messages";

const App = (props: any) => {

    const p = props as AppProps;
    const component = mainComponent(p.state);

    useEffect(() => {
        const intervalHandle = setInterval(() => {
            props.refreshMessages();
        }, messageRefreshMs);

        return () => {
            clearInterval(intervalHandle);
        }
    });

    return (
        <div>
            <Header/>
            {component}
        </div>
    );
}

const storeToProps = (store: Store): AppPropsData => {
    return {
        state: store.state
    }
}

const dispatch = (dispatch: any): AppPropsCallback => {
    return {
        refreshMessages: () => {
            dispatch(createActionRefreshMessages());
        }
    };
}


export default connect(storeToProps, dispatch)(App);
