import {Action} from "redux";
import {TokenPersonData} from "../../data/server-data/token-person-data";
import Store from "../../data/store/store";
import PersonData from "../../data/value/person-data";
import createEmptyStore from "../../data/store/create-empty-store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_LOGIN = 'ACTION_AFTER_LOGIN';


export interface ActionAfterLogin extends Action {
    type: string;
    data: TokenPersonData
}

export const createActionAfterLogin = (data: TokenPersonData): ActionAfterLogin => {
    return {
        type: ACTION_AFTER_LOGIN,
        data
    }
}

export const createReducerAfterLogin = (store: Store | undefined, action: ActionAfterLogin): Store => {
    const data: TokenPersonData = action.data;
    const person: PersonData = data;

    const emptyStore : Store = createEmptyStore();

    const res = {
        initialLogin: data.login,
        persons: [person],
        state: AppState.todo,
        token: data.token
    }

    return {...emptyStore, ...res};
}
