import {Action} from "redux";
import Store from "../../data/store/store";
import createEmptyStore from "../../data/store/create-empty-store";

export const ACTION_LOGOUT = 'ACTION_LOGOUT';


export interface ActionLogout extends Action {
    type: string;
}

export const createActionLogout = (): ActionLogout => {
    return {
        type: ACTION_LOGOUT
    }
}

export const createReducerLogout = (store: Store | undefined, action: ActionLogout): Store => {
    return createEmptyStore();
}
