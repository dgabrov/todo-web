import {Action} from "redux";
import Store from "../../data/store/store";
import {getKeyObject} from "../../util/store-util";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_DELETE_STORAGE_ITEMS = 'ACTION_AFTER_DELETE_STORAGE_ITEMS';

export interface ActionAfterDeleteStorageItems extends Action {
    type: string;
    ids: string[];
}

export const createActionAfterDeleteStorageItems = (ids: string[]): ActionAfterDeleteStorageItems => {
    return {
        type: ACTION_AFTER_DELETE_STORAGE_ITEMS,
        ids
    }
}

export const createReducerAfterDeleteStorageItems = (store: Store | undefined, action: ActionAfterDeleteStorageItems): Store => {
    const storeDataItems = store!!.items;
    let ids = action.ids;
    const idsObject = getKeyObject(ids);

    const items = storeDataItems.items.filter((item) => {
        let itemId = item.itemId;

        return !idsObject.hasOwnProperty(itemId);
    });

    const selected = {...storeDataItems.selected};
    ids.forEach((id) => delete selected[id]);

    // unselect all the attachments with this occasion as this is too much work to see precisely
    // which ones belong to the deleted items. Maybe some other time.
    const newItems = {...storeDataItems, ...{items, selected, attachmentSelected: {}}};

    return {...store!!, ...{items: newItems}, ...{state: AppState.items}}
}
