import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_EXPAND_ALL = 'ACTION_EXPAND_ALL';


export interface ActionExpandAll extends Action {
    type: string;
}

export const createActionExpandAll = (): ActionExpandAll => {
    return {
        type: ACTION_EXPAND_ALL
    }
}

export const createReducerExpandAll = (store: Store | undefined, action: ActionExpandAll): Store => {
    // if at least one is expanded, collapse all
    // if none is expanded, expand all

    let currentItems = store!!.items;
    const currentExpanded = currentItems.expanded;

    let newExpanded: {[key: string] : string} = {};

    if (Object.keys(currentExpanded).length === 0) {
        currentItems.items.forEach((item) => {
            newExpanded[item.itemId] = "";
        })
    }

    const items = {...currentItems, ...{expanded: newExpanded}}
    const newStore = {...store!!, ...{items}}

    return newStore;
}
