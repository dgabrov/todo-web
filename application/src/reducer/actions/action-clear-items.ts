import {Action} from "redux";
import {ActionAddTodoItem} from "./action-add-todo-item";
import Store from "../../data/store/store";

export const ACTION_CLEAR_ITEMS = 'ACTION_CLEAR_ITEMS';


export interface ActionClearItems extends Action {
    type: string;
}

export const createActionClearItems = (): ActionAddTodoItem => {
    return {
        type: ACTION_CLEAR_ITEMS
    }
}

export const createReducerClearItems = (store: Store | undefined): Store => {
    const items = {...store!!.items, ...{items: [], selected: {}, attachmentSelected: {}, expanded: {}}};

    return {...store!!, ...{items}};
}
