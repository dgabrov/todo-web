import {Action} from "redux";
import TodoData from "../../data/value/todo-data";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_MULTIPLE_ADD = 'ACTION_AFTER_MULTIPLE_ADD';


export interface ActionAfterMultipleAdd extends Action {
    type: string;
    data: TodoData[]
}

export const createActionAfterMultipleAdd = (items: TodoData[]): ActionAfterMultipleAdd => {
    return {
        type: ACTION_AFTER_MULTIPLE_ADD,
        data: items
    }
}

export const createReducerAfterMultipleAdd = (store: Store | undefined, action: ActionAfterMultipleAdd): Store => {
    const items: TodoData[] = action.data;
    let existentItems: TodoData[] = [];
    if (store && store?.todo?.length > 0) {
        existentItems = store!!.todo;
    }

    const allItems = [...existentItems, ...items];

    // the new location
    const state = AppState.todo;

    // delete the existent quick add comments field
    const todoDetails = {...store!!.todoDetails, ...{comments: ''}};

    return {...store!!, ...{todo: allItems, state, todoDetails}};
}
