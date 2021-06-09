import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_TOGGLE_SELECT_STORAGE_ITEM = 'ACTION_TOGGLE_SELECT_STORAGE_ITEM';


export interface ActionToggleSelectStorageItem extends Action {
    type: string;
    itemId: string;
}

export const createActionToggleSelectStorageItem = (itemId: string): ActionToggleSelectStorageItem => {
    return {
        type: ACTION_TOGGLE_SELECT_STORAGE_ITEM,
        itemId
    }
}

export const createReducerToggleSelectStorageItem = (store: Store | undefined, action: ActionToggleSelectStorageItem): Store => {
    const itemId = action.itemId;
    const selected = {...store!!.items.selected};

    if (selected.hasOwnProperty(itemId)) {
        delete selected[itemId];
    }
    else {
        selected[itemId] = "";
    }

    let items = {...store!!.items, ...{selected}};
    return {...store!!, ...{items}};
}
