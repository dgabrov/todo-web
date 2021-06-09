import {Action} from "redux";
import Store from "../../data/store/store";
import MessageData from "../../data/value/message-data";
import {createMessageData} from "./action-send-message";
import AppState from "../../data/value/app-state";

export const ACTION_REMOVE_STORAGE_ITEM = 'ACTION_REMOVE_STORAGE_ITEM';


export interface ActionRemoveStorageItem extends Action {
    type: string;
}

export const createActionRemoveStorageItem = (): ActionRemoveStorageItem => {
    return {
        type: ACTION_REMOVE_STORAGE_ITEM
    }
}

export const createReducerRemoveStorageItem = (store: Store | undefined, action: ActionRemoveStorageItem): Store => {
    const storeItemData = store!!.items;
    const selected = storeItemData.selected;

    let res: Store;

    if (Object.keys(selected).length === 0) {
        const message : MessageData = createMessageData(true, "please select at least one item to delete");

        const messages = store!!.messages.slice();
        messages.push(message);

        res = {...store!!, ...{messages}};
    }
    else {
        const state : AppState = AppState.cdItem;

        res = {...store!!, ...{state}}
    }

    return res;
}
