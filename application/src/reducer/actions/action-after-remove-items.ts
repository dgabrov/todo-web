import {Action} from "redux";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_REMOVE_ITEMS = 'ACTION_AFTER_REMOVE_ITEMS';

export interface ActionAfterRemoveItems extends Action {
    type: string;
    ids: string[]
}

export const createActionAfterRemoveItems = (ids: string[]): ActionAfterRemoveItems => {
    return {
        type: ACTION_AFTER_REMOVE_ITEMS,
        ids
    }
}

export const createReducerAfterRemoveItems = (store: Store | undefined, action: ActionAfterRemoveItems): Store => {
    const objIds: { [key: string]: string; } = {};

    const ids = action.ids;
    ids.forEach((id) => {
        objIds[id] = "";
    });

    const todo = store!!.todo.filter((item) => {return !objIds.hasOwnProperty(item.todoItemId);});

    const state = AppState.todo;

    return {...store!!, ...{todo, state}};
}
