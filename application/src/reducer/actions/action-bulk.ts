import {Action} from "redux";
import Store from "../../data/store/store";
import {createMessageData} from "./action-send-message";
import MessageData from "../../data/value/message-data";
import AppState from "../../data/value/app-state";

export const ACTION_BULK = 'ACTION_BULK';


export interface ActionBulk extends Action {
    type: string;
}

export const createActionBulk = (): ActionBulk => {
    return {
        type: ACTION_BULK
    }
}

export const createReducerBulk = (store: Store | undefined, action: ActionBulk): Store => {
    // at least one should be selected, if not a message will be dispatched
    const selected = store!!.selected;

    let newStore: Store;

    if (selected.length === 0) {
        const message : MessageData = createMessageData(true, "please select at least one item for bulk processing");

        const messages = store!!.messages.slice();
        messages.push(message);

        newStore = {...store!!, ...{messages}};
    }
    else {
        const state : AppState = AppState.bulk;

        newStore = {...store!!, ...{state}}
    }

    return newStore
}
