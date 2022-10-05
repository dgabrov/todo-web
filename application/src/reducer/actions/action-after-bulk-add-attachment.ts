import {Action} from "redux";
import {AttachmentData} from "../../data/item/attachment-data";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_BULK_ADD_ATTACHMENT = 'ACTION_AFTER_BULK_ADD_ATTACHMENT';


export interface ActionAfterBulkAddAttachment extends Action {
    type: string;
    itemId: string;
    attachments: AttachmentData[];
}

export const createActionAfterBulkAddAttachment = (itemId: string, attachments: AttachmentData[]): ActionAfterBulkAddAttachment => {
    return {
        type: ACTION_AFTER_BULK_ADD_ATTACHMENT,
        itemId,
        attachments
    }
}

export const createReducerAfterBulkAddAttachment = (store: Store | undefined, action: ActionAfterBulkAddAttachment): Store => {
    let items = store!!.items;
    items = {...items};

    const it = items.items;
    items.items = [...it];

    // find the index with the item id
    let index = -1;
    const len = items.items.length;
    for (let i = 0; i < len; i++) {
        const item = items.items[i];
        const currentItemId = item.itemId;

        if (action.itemId === currentItemId) {
            index = i;
            break;
        }
    }

    // the stuff works if index found is bigger or equal to zero
    if (index >= 0) {
        const current = items.items[index];
        items.items[index] = {...current};

        // remained to add the attachments
        items.items[index].attachments = [...items.items[index].attachments, ...action.attachments];
    }

    return {...store!!, items, state: AppState.items};
}
