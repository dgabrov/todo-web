import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_TOGGLE_SHOW_ADDED_UPDATED = 'ACTION_TOGGLE_SHOW_ADDED_UPDATED';


export interface ActionToggleShowAddedUpdated extends Action {
    type: string;
}

export const createActionToggleShowAddedUpdated = (): ActionToggleShowAddedUpdated => {
    return {
        type: ACTION_TOGGLE_SHOW_ADDED_UPDATED
    }
}

export const createReducerToggleShowAddedUpdated = (store: Store | undefined, action: ActionToggleShowAddedUpdated): Store => {
    const showAddedUpdated = ! store!!.showAddedUpdated

    return {...store!!, showAddedUpdated};
}
