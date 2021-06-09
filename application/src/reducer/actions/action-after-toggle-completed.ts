import {Action} from "redux";
import {CompletedData} from "../../data/server-data/completed-data";
import Store from "../../data/store/store";
import TodoData from "../../data/value/todo-data";

export const ACTION_AFTER_TOGGLE_COMPLETED = 'ACTION_AFTER_TOGGLE_COMPLETED';

export interface ActionAfterToggleCompleted extends Action {
    type: string;
    data: CompletedData
}

export const createActionAfterToggleCompleted = (data: CompletedData): ActionAfterToggleCompleted => {
    return {
        type: ACTION_AFTER_TOGGLE_COMPLETED,
        data
    }
}

export const createReducerAfterToggleCompleted = (store: Store | undefined, action: ActionAfterToggleCompleted): Store => {
    // new array of todos, with new entry for the item that had the completed status toggled

    let data = action.data;
    const todoItemId = data.todoItemId;
    const completed = data.completed;

    const todo = store!!.todo.map((item) => {
        let res: TodoData;

        if (item.todoItemId === todoItemId) {
            res = {...item, ...{completed}};
        }
        else {
            res = item;
        }

        return res;
    });

    return {...store!!, ...{todo}};
}
