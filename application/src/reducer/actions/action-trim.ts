import {Action} from "redux";
import Store from "../../data/store/store";
import {createMessageData} from "./action-send-message";
import TodoData from "../../data/value/todo-data";
import {getKeyObject} from "../../util/store-util";

export const ACTION_TRIM = 'ACTION_TRIM';


export interface ActionTrim extends Action {
    type: string;
}

export const createActionTrim = (): ActionTrim => {
    return {
        type: ACTION_TRIM
    }
}

export const createReducerTrim = (store: Store | undefined, action: ActionTrim): Store => {
    const selected = store!!.selected;

    // if nothing is selected, will setup an error message; if something is selected, will trim
    // the items at the ones that are selected
    let newStore: Store;

    if (selected.length === 0) {
        const message = createMessageData(true, 'cannot trim as you did not select any todo items');

        const messages = store!!.messages.slice();
        messages.push(message);

        newStore = {...store!!, ...{messages}}
    }
    else {
        const selectedObject = getKeyObject(store!!.selected);

        const todo = store!!.todo.filter((todoItem: TodoData) => {
            // only the selected items remain
            return selectedObject.hasOwnProperty(todoItem.todoItemId);
        });

        newStore = {...store!!, ...{todo}};
    }

    return newStore;
}
