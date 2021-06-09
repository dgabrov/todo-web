import {Action} from "redux";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_REMOVE_ATTACHMENT = 'ACTION_AFTER_REMOVE_ATTACHMENT';


export interface ActionAfterRemoveAttachment extends Action {
    type: string;
}

export const createActionAfterRemoveAttachment = (): ActionAfterRemoveAttachment => {
    return {
        type: ACTION_AFTER_REMOVE_ATTACHMENT
    }
}

export const createReducerAfterRemoveAttachment = (store: Store | undefined, action: ActionAfterRemoveAttachment): Store => {
    const storeItemData = store!!.items;
    const attachmentSelected = storeItemData.attachmentSelected;

    const items = storeItemData.items.map((item) => {
        const res = {...item};

        res.attachments = res.attachments.filter((attachment) => {
            return !attachmentSelected.hasOwnProperty(attachment.attachmentId);
        });

        return res;
    });

    const newStoreItemData = {...storeItemData, ...{items, attachmentSelected: {}}};
    return {...store!!, ...{items: newStoreItemData}, ...{state: AppState.items}};
}
