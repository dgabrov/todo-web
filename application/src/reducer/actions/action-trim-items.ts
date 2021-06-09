import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_TRIM_ITEMS = 'ACTION_TRIM_ITEMS';


export interface ActionTrimItems extends Action {
    type: string;
}

export const createActionTrimItems = (): ActionTrimItems => {
    return {
        type: ACTION_TRIM_ITEMS
    }
}

export const createReducerTrimItems = (store: Store | undefined, action: ActionTrimItems): Store => {
    // get the selected items and then keep only those who are selected
    const currentItems = store!!.items;
    const selected = currentItems.selected;

    const items = currentItems.items.filter((item) => {
        const itemId = item.itemId;

        return selected.hasOwnProperty(itemId);
    })

    const crtItems = {...currentItems, ...{items}}
    const newStore = {...store!!, ...{items: crtItems}}

    return newStore;
}
