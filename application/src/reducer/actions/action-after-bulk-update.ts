import {Action} from "redux";
import TodoData from "../../data/value/todo-data";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_BULK_UPDATE = 'ACTION_AFTER_BULK_UPDATE';


export interface ActionAfterBulkUpdate extends Action {
    type: string;
    todoItems: TodoData[] // those are the bulk updated todos
}

export const createActionAfterBulkUpdate = (todoItems: TodoData[]): ActionAfterBulkUpdate => {
    return {
        type: ACTION_AFTER_BULK_UPDATE,
        todoItems
    }
}

export const createReducerAfterBulkUpdate = (store: Store | undefined, action: ActionAfterBulkUpdate): Store => {
    const todoItems = action.todoItems;

    const todoKeys: { [key: string]: TodoData; } = {};
    todoItems.forEach((item) => {todoKeys[item.todoItemId] = {...item};});

    const todo = store!!.todo.map((item) => {
        let res : TodoData;

        const id = item.todoItemId;
        if (todoKeys.hasOwnProperty(id)) {
            res = todoKeys[id];
        }
        else {
            res = item;
        }

        return res;
    });

    // all being done well, go back to the todolist
    const state : AppState = AppState.todo;

    return {...store!!, ...{todo, state}};
}
