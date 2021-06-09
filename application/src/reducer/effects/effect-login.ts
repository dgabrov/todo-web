import LoginData from "../../data/value/login-data";
import {createActionSendMessage} from "../actions/action-send-message";
import {login} from "../../service/server";
import {createActionAfterLogin} from "../actions/action-after-login";
import {setToken} from "../../data/config/config-accessor";

const processEffectLogin = async (dispatch: any, getsStore: any, data: LoginData): Promise<number> => {
    const tokenLoginData = await login(data);

    dispatch(createActionAfterLogin(tokenLoginData));
    setToken(tokenLoginData.token);

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
