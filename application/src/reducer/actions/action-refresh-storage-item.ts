import {Action} from "redux";
import {CompleteItemData} from "../../data/item/complete-item-data";
import Store from "../../data/store/store";

export const ACTION_REFRESH_STORAGE_ITEM = 'ACTION_REFRESH_STORAGE_ITEM';

export interface ActionRefreshStorageItem extends Action {
    type: string;
    data: CompleteItemData
}

export const createActionRefreshStorageItem = (data: CompleteItemData): ActionRefreshStorageItem => {
    return {
        type: ACTION_REFRESH_STORAGE_ITEM,
        data
    }
}

export const createReducerRefreshStorageItem = (store: Store | undefined, action: ActionRefreshStorageItem): Store => {
    const currentItems = store!!.items.items;

    const newItem = action.data;
    const newItemId = newItem.itemId;

    const items = currentItems.map((item) => {
        const itemId = item.itemId;
        if (itemId === newItemId) {
            return newItem;
        }
        else {
            return item;
        }
    });

    const storeItemData = {...store!!.items, ...{items}};
    return {...store!!, ...{items:storeItemData}}
}
