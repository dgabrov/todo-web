import {Action} from "redux";
import {ItemData} from "../../data/item/item-data";
import Store from "../../data/store/store";
import {CompleteItemData} from "../../data/item/complete-item-data";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_UPDATE_STORAGE_ITEM = 'ACTION_AFTER_UPDATE_STORAGE_ITEM';


export interface ActionAfterUpdateStorageItem extends Action {
    type: string;
    adding: boolean;
    item: ItemData;
}

export const createActionAfterUpdateStorageItem = (adding: boolean, item: ItemData): ActionAfterUpdateStorageItem => {
    return {
        type: ACTION_AFTER_UPDATE_STORAGE_ITEM,
        adding,
        item
    }
}

export const createReducerAfterUpdateStorageItem = (store: Store | undefined, action: ActionAfterUpdateStorageItem): Store => {
    const adding = action.adding;
    const item = action.item;

    const storeItemData = {...store!!.items};

    if (adding) {
        const items = storeItemData.items.slice();

        // turn item into a completed item data and then proceed with it
        items.push({...item, ...{attachments: []}});

        storeItemData.items = items;
    }
    else {
        storeItemData.items = storeItemData.items.map<CompleteItemData>((current) => {
            let res : CompleteItemData;
            const itemId = current.itemId;

            if (itemId !== item.itemId) {
                res = current;
            }
            else {
                res = {...item, ...{attachments: current.attachments}};
            }

            return res;
        });
    }

    // put together the new state and return it
    return {...store!!, ...{items:storeItemData, state: AppState.items}}
}
