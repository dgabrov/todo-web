import {Action} from "redux";
import Store from "../../data/store/store";
import TodoData from "../../data/value/todo-data";

export const ACTION_CLEAR = 'ACTION_CLEAR';


export interface ActionClear extends Action {
    type: string;
}

export const createActionClear = (): ActionClear => {
    return {
        type: ACTION_CLEAR
    }
}

export const createReducerClear = (store: Store | undefined, action: ActionClear): Store => {
    const todo: TodoData[] = [];
    const selected: string[] = [];

    // remove the items and the selected items from the store
    return {...store!!, ...{todo, selected}}
}
