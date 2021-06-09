import {ConfigData} from "./config-data";
import {TokenData} from "./token-data";

const config: ConfigData = {
    apiUrl: ""
};

const token: TokenData = {
    token: ""
}



export const setConfig = (data: ConfigData) : void => {
    config.apiUrl = data.apiUrl;
}

export const getConfig = () : ConfigData => {
    return config;
}

export const setToken = (tk : string) : void => {
    token.token = tk;
}

export const getToken = () : string => {
    return token.token;
}
