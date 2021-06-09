import {Action} from "redux";
import {AttachmentData} from "../../data/item/attachment-data";
import Store from "../../data/store/store";
import {CompleteItemData} from "../../data/item/complete-item-data";
import {findItemById} from "../../util/store-util";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_UPDATE_ATTACHMENT = 'ACTION_AFTER_UPDATE_ATTACHMENT';


export interface ActionAfterUpdateAttachment extends Action {
    type: string;
    attachment: AttachmentData;
    adding: boolean;
}

export const createActionAfterUpdateAttachment = (attachment: AttachmentData, adding: boolean): ActionAfterUpdateAttachment => {
    return {
        type: ACTION_AFTER_UPDATE_ATTACHMENT,
        attachment,
        adding
    }
}

export const createReducerAfterUpdateAttachment = (store: Store | undefined, action: ActionAfterUpdateAttachment): Store => {
    const {adding, attachment} = action;

    const itemId = attachment.itemId;
    const attachmentId = attachment.attachmentId;

    // find first the item with the itemId given
    const item: CompleteItemData|null = findItemById(store!!, itemId);
    const newItem = {...item!!};

    if (adding) {
        newItem.attachments = newItem.attachments.slice();
        newItem.attachments.push(attachment);
    }
    else {
        newItem.attachments = newItem.attachments.map<AttachmentData>((item) => {
            const id = item.attachmentId;
            let res: AttachmentData;

            if (id === attachmentId) {
                res = {...attachment};
            }
            else {
                res = item;
            }

            return res;
        })
    }

    const items = store!!.items.items.map((it) => {
        if (it.itemId === itemId) {
            return newItem;
        }
        else {
            return it;
        }
    });

    return {...store!!, ...{items: {...store!!.items, ...{items: items}}, state: AppState.items} };
}
