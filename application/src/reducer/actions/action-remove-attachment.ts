import {Action} from "redux";
import Store from "../../data/store/store";
import {createMessageData} from "./action-send-message";
import AppState from "../../data/value/app-state";

export const ACTION_REMOVE_ATTACHMENT = 'ACTION_REMOVE_ATTACHMENT';


export interface ActionRemoveAttachment extends Action {
    type: string;
}

export const createActionRemoveAttachment = (): ActionRemoveAttachment => {
    return {
        type: ACTION_REMOVE_ATTACHMENT
    }
}

export const createReducerRemoveAttachment = (store: Store | undefined, action: ActionRemoveAttachment): Store => {
    const storeItemData = store!!.items;
    const attachmentSelected = storeItemData.attachmentSelected;

    let res: Store;

    if (Object.keys(attachmentSelected).length === 0) {
        const messages = store!!.messages.slice();

        messages.push(createMessageData(true, "Please select at least one attachment to delete"));
        res = {...store!!, ...{messages}};
    }
    else {
        res = {...store!!, ...{state: AppState.cdAttachment}};
    }

    return res;
}
