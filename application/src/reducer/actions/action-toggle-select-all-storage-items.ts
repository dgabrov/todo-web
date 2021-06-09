import {Action} from "redux";
import Store from "../../data/store/store";
import {getKeyObject} from "../../util/store-util";

export const ACTION_TOGGLE_SELECT_ALL_STORAGE_ITEMS = 'ACTION_TOGGLE_SELECT_ALL_STORAGE_ITEMS';


export interface ActionToggleSelectAllStorageItems extends Action {
    type: string;
}

export const createActionToggleSelectAllStorageItems = (): ActionToggleSelectAllStorageItems => {
    return {
        type: ACTION_TOGGLE_SELECT_ALL_STORAGE_ITEMS
    }
}

export const createReducerToggleSelectAllStorageItems = (store: Store | undefined, action: ActionToggleSelectAllStorageItems): Store => {
    const storeItems = store!!.items;
    const selected = storeItems.selected;
    const items = storeItems.items;

    let newSelected = {};

    if (Object.keys(selected).length < items.length) {
        // add all ids
        newSelected = getKeyObject(items.map((item) => item.itemId));
    }

    return {...store!!, ...{items: {...storeItems, ...{selected: newSelected}}}};
}
