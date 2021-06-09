import {Action} from "redux";
import Store from "../../data/store/store";
import {CompleteItemData} from "../../data/item/complete-item-data";

export const ACTION_UNSELECT_ALL_ATTACHMENTS = 'ACTION_UNSELECT_ALL_ATTACHMENTS';


export interface ActionUnselectAllAttachments extends Action {
    type: string;
    itemId: string;
}

export const createActionUnselectAllAttachments = (itemId: string): ActionUnselectAllAttachments => {
    return {
        type: ACTION_UNSELECT_ALL_ATTACHMENTS,
        itemId
    }
}

export const createReducerUnselectAllAttachments = (store: Store | undefined, action: ActionUnselectAllAttachments): Store => {
    const items = store!!.items;
    const attachmentSelected = {...items.attachmentSelected};
    const itemId = action.itemId;

    // search for item
    // if item found, then remove all attachment ids from selected
    const found: CompleteItemData | undefined = items.items.find((item) => {
        return item.itemId === itemId;
    });

    if (found) {
        found
            .attachments
            .map((attachment) => attachment.attachmentId)
            .forEach((id) => {
                delete attachmentSelected[id];
            });
    }

    return {...store!!, ...{items: {...items, ...{attachmentSelected}}}};
}
