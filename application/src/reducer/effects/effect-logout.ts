import {logout} from "../../service/server";
import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {createActionLogout} from "../actions/action-logout";
import {setToken} from "../../data/config/config-accessor";
import Cookies from "universal-cookie";
import {TOKEN_COOKIE_NAME} from "../../util/constants";

const processEffectLogout = async (dispatch: any, getStore: any) : Promise<number> => {
    await logout();

    // after successfully logging out, dispatch the action that clears
    setToken("");

    // delete the cookie as well
    const cookies = new Cookies();
    cookies.remove(TOKEN_COOKIE_NAME);

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
