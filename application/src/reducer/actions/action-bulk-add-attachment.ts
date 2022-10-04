import {Action} from "redux";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";
import {ItemShortData} from "../../data/value/item-short-data";

export const ACTION_BULK_ADD_ATTACHMENTS = 'ACTION_BULK_ADD_ATTACHMENTS';


export interface ActionBulkAddAttachment extends Action {
    type: string;
    itemId: string;
    name: string;
}

export const createActionBulkAddAttachment = (itemId: string, name: string): ActionBulkAddAttachment => {
    return {
        type: ACTION_BULK_ADD_ATTACHMENTS,
        itemId,
        name
    }
}

export const createReducerBulkAddAttachment = (store: Store | undefined, action: ActionBulkAddAttachment): Store => {
    const state = AppState.bulkAdd;
    const bulkAddAttachment : ItemShortData = {
        itemId: action.itemId,
        name: action.name
    }

    let newStore = {...store!!, ...{state}, ...{bulkAddAttachment}};

    return newStore
}
