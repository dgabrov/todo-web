import {createActionSendMessage} from "../actions/action-send-message";
import {setConfig} from "../../data/config/config-accessor";
import {createActionSetLocation} from "../actions/action-set-location";
import AppState from "../../data/value/app-state";
import {CONFIG_FILE_URL} from "../../util/constants";

const processEffectLoadSettings = async (dispatch:any) : Promise<boolean> => {
    const response = await fetch(window.location.href + CONFIG_FILE_URL);
    const data = await response.json();

    setConfig(data);

    // and now switch back to the right state
    dispatch(createActionSetLocation(AppState.login));

    return true;
}

export const createEffectLoadSettings = () => {
    return (dispatch: any) => {
        processEffectLoadSettings(dispatch)
            .then((r) => {})
            .catch((err)=>{dispatch(createActionSendMessage(true, err.message))});
    }
}
