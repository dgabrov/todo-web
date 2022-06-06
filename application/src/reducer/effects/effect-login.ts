import LoginData from "../../data/value/login-data";
import {createActionSendMessage} from "../actions/action-send-message";
import {login} from "../../service/server";
import {createActionAfterLogin} from "../actions/action-after-login";
import {setToken} from "../../data/config/config-accessor";
import Cookies from "universal-cookie";
import {TOKEN_COOKIE_NAME} from "../../util/constants";

const processEffectLogin = async (dispatch: any, getsStore: any, data: LoginData): Promise<number> => {
    const tokenLoginData = await login(data);

    dispatch(createActionAfterLogin(tokenLoginData));
    setToken(tokenLoginData.token);

    // and now in addition to the token we set a cookie called 'token12'
    const cookies = new Cookies();
    cookies.set(TOKEN_COOKIE_NAME, tokenLoginData.token, {path:'/', sameSite: 'strict'});

    return 0;
}

export const createEffectLogin = (data: LoginData) => {
    return (dispatch: any, getStore: any) => {
        processEffectLogin(dispatch, getStore, data)
            .then((res) => {
                // no processing, success
            })
            .catch((err) => {
                dispatch(createActionSendMessage(true, err.message));
            });
    }
}
