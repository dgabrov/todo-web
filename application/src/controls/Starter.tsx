import React, {useEffect} from 'react';
import Store from "../data/store/store";
import {connect} from "react-redux";
import {StarterProps} from "../data/props/starter/starter-props";
import {StarterPropsData} from "../data/props/starter/starter-props-data";
import {StarterPropsCallback} from "../data/props/starter/starter-props-callback";
import {createEffectLoadSettings} from "../reducer/effects/effect-load-settings";

const Starter = (props: StarterProps) => {

    useEffect(() => {
        props.loadSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<h2>Loading...</h2>);
}

const storeToProp = (store: Store): StarterPropsData => {
    return {}
}

const dispatch = (dispatch: any) : StarterPropsCallback => {
    return {
        loadSettings() {
            dispatch(createEffectLoadSettings());
        }
    }
}

export default connect(storeToProp, dispatch)(Starter)
