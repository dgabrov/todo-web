import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_EXPAND_ITEM = 'ACTION_EXPAND_ITEM';


export interface ActionExpandItem extends Action {
    type: string;
    itemId: string;
}

export const createActionExpandItem = (itemId: string): ActionExpandItem => {
    return {
        type: ACTION_EXPAND_ITEM,
        itemId
    }
}

export const createReducerExpandItem = (store: Store | undefined, action: ActionExpandItem): Store => {
    const expanded = {...store!!.items.expanded};

    let itemId = action.itemId;

    if (expanded.hasOwnProperty(itemId)) {
        delete expanded[itemId];
    }
    else {
        expanded[itemId] = "";
    }

    const items = {...store!!.items, ...{expanded}};

    return {...store!!, ...{items}};
}
