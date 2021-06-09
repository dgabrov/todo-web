import {Action} from "redux";
import Store from "../../data/store/store";
import {EditItemData} from "../../data/value/edit-item-data";
import AppState from "../../data/value/app-state";

export const ACTION_EDIT_STORAGE_ITEM = 'ACTION_EDIT_STORAGE_ITEM';


export interface ActionEditStorageItem extends Action {
    type: string;
    itemId: string;
    adding: boolean;
}

export const createActionEditStorageItem = (itemId: string, adding: boolean): ActionEditStorageItem => {
    return {
        type: ACTION_EDIT_STORAGE_ITEM,
        itemId,
        adding
    }
}

export const createReducerEditStorageItem = (store: Store | undefined, action: ActionEditStorageItem): Store => {
    const editItemData : EditItemData = {
        adding: action.adding,
        itemId: action.itemId
    }

    const state = {
        state: AppState.editItem
    }

    return {...store!!, ...{editItem: editItemData, ...state}}
}
