import {Action} from "redux";
import Store from "../../data/store/store";
import {getKeyObject} from "../../util/store-util";

export const ACTION_TOGGLE_SELECT_ITEM = 'ACTION_TOGGLE_SELECT_ITEM';


export interface ActionToggleSelectItem extends Action {
    type: string;
    todoItemId: string;
}

export const createActionToggleSelectItem = (todoItemId: string): ActionToggleSelectItem => {
    return {
        type: ACTION_TOGGLE_SELECT_ITEM,
        todoItemId
    }
}

export const createReducerToggleSelectItem = (store: Store | undefined, action: ActionToggleSelectItem): Store => {
    // if item is selected, unselect it
    // if item is not selected, select it
    const selectObject = getKeyObject(store!!.selected);
    const todoItemId = action.todoItemId;

    if (selectObject.hasOwnProperty(todoItemId)) {
        delete selectObject[todoItemId];
    }
    else {
        selectObject[todoItemId] = "";
    }

    // assemble array with the keys
    const selected = Object.keys(selectObject);

    return {...store!!, ...{selected}};
}
