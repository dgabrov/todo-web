import {ConfigData} from "./config-data";
import {TokenData} from "./token-data";
import {CONFIG_FILE_URL} from "../../util/constants";

let config: ConfigData | null = null;

const token: TokenData = {
    token: ""
}



export const getConfig = async () : Promise<ConfigData> => {
    if (!config) {
        const response = await fetch(window.location.href + CONFIG_FILE_URL);

        config = await response.json() as ConfigData;
    }

    return config
}

export const getLoadedUrl = () : string => {
    let res = ""

    if (config !== null) {
        res = config.apiUrl
    }

    return res;
}

export const setToken = (tk : string) : void => {
    token.token = tk;
}

export const getToken = () : string => {
    return token.token;
}
