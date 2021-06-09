import {CompleteItemData} from "../../data/item/complete-item-data";
import {Action} from "redux";
import Store from "../../data/store/store";
import {getKeyObject} from "../../util/store-util";

export const ACTION_AFTER_ITEM_SEARCH = 'ACTION_AFTER_ITEM_SEARCH';


export interface ActionAfterItemSearch extends Action {
    type: string;
    items: CompleteItemData[]
}

export const createActionAfterItemSearch = (items: CompleteItemData[]): ActionAfterItemSearch => {
    return {
        type: ACTION_AFTER_ITEM_SEARCH,
        items
    }
}

export const createReducerAfterItemSearch = (store: Store | undefined, action: ActionAfterItemSearch): Store => {
    const items: CompleteItemData[] = action.items;

    const itemIds: {[key: string]: string} = {};
    const attachIds: {[key: string]: string} = {};

    items.forEach((item) => {
        itemIds[item.itemId] = "";

        item.attachments.forEach((attachment) => {
            attachIds[attachment.attachmentId] = "";
        })
    });

    // now we ensure that selected, expanded and attachmentSelected only contain stuff that is in the
    // result of the search

    let storeItems = store!!.items;

    const search = storeItems.search;
    const selected = getKeyObject(Object.keys(storeItems.selected).filter((itemId) => {return itemIds.hasOwnProperty(itemId)}));
    const expanded = getKeyObject(Object.keys(storeItems.expanded).filter((itemId) => {return itemIds.hasOwnProperty(itemId)}));
    const attachmentSelected = getKeyObject(Object.keys(storeItems.attachmentSelected).filter((attachmentId) => {return attachIds.hasOwnProperty(attachmentId)}));

    return {...store!!, ...{items: {search, selected, expanded, attachmentSelected, items}}};
}
