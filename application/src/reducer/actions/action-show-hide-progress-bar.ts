import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_SHOW_HIDE_PROGRESS_BAR = 'ACTION_SHOW_HIDE_PROGRESS_BAR';


export interface ActionShowHideProgressBar extends Action {
    show: boolean;
}

export const createActionShowHideProgressBar = (show: boolean): ActionShowHideProgressBar => {
    return {
        type: ACTION_SHOW_HIDE_PROGRESS_BAR,
        show
    }
}

export const createReducerShowHideProgressBar = (store: Store | undefined, action: ActionShowHideProgressBar): Store => {
    const showProgressBar = action.show;

    return {...store!!, showProgressBar};
}
