import {logout} from "../../service/server";
import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {createActionLogout} from "../actions/action-logout";
import {setToken} from "../../data/config/config-accessor";

const processEffectLogout = async (dispatch: any, getStore: any) : Promise<number> => {
    await logout();

    // after successfully logging out, dispatch the action that clears
    setToken("");
    dispatch(createActionLogout());

    return 1;
}

export const createEffectLogout = () => {
    return (dispatch: any, getStore: any) => {
        processEffectLogout(dispatch, getStore)
            .then(() => {})
            .catch((err) => {dispatch(createActionSendMessage(true, processError(err)))});
    }
}
