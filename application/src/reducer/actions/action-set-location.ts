import {Action} from "redux";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_SET_LOCATION = 'ACTION_SET_LOCATION';

export interface ActionSetLocation extends Action {
    type: string;
    location: AppState
}

export const createActionSetLocation = (location: AppState): ActionSetLocation => {
    return {
        type: ACTION_SET_LOCATION,
        location
    }
}

export const createReducerSetLocation = (store: Store | undefined, action: ActionSetLocation): Store => {
    return {...store!!, ...{state: action.location}}
}
