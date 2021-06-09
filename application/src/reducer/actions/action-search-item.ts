import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_SEARCH_ITEM = 'ACTION_SEARCH_ITEM';


export interface ActionSearchItem extends Action {
    search: string;
}

export const createActionSearchItem = (search: string): ActionSearchItem => {
    return {
        type: ACTION_SEARCH_ITEM,
        search: search
    }
}

export const createReducerSearchItem = (store: Store | undefined, action: ActionSearchItem): Store => {
    const search = action.search;
    const newItemStore = {...store!!.items, ...{search}}

    return {...store!!, ...{items: newItemStore}}
}
