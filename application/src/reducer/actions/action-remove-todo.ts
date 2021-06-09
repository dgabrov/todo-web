import {Action} from "redux";
import Store from "../../data/store/store";
import MessageData from "../../data/value/message-data";
import {createMessageData} from "./action-send-message";
import AppState from "../../data/value/app-state";

export const ACTION_REMOVE_TODO = 'ACTION_REMOVE_TODO';


export interface ActionRemoveTodo extends Action {
    type: string;
}

export const createActionRemoveTodo = (): ActionRemoveTodo => {
    return {
        type: ACTION_REMOVE_TODO
    }
}

export const createReducerRemoveTodo = (store: Store | undefined, action: ActionRemoveTodo): Store => {
    const selected = store!!.selected;
    let newStore: Store;

    if (selected.length === 0) {
        // there are no items selected at all
        const message: MessageData = createMessageData(true, "please select at least one item to remove");
        const messages = store!!.messages.slice();
        messages.push(message);

        newStore = {...store!!, ...{messages}};
    }
    else {
        const state: AppState = AppState.cdTodo;
        newStore = {...store!!, ...{state}};
    }

    return newStore;
}
