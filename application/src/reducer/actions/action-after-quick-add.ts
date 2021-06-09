import {Action} from "redux";
import TodoData from "../../data/value/todo-data";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_QUICK_ADD = 'ACTION_AFTER_QUICK_ADD';


export interface ActionAfterQuickAdd extends Action {
    type: string;
    data: TodoData
}

export const createActionAfterQuickAdd = (data: TodoData): ActionAfterQuickAdd => {
    return {
        type: ACTION_AFTER_QUICK_ADD,
        data
    }
}

export const createReducerAfterQuickAdd = (store: Store | undefined, action: ActionAfterQuickAdd): Store => {
    const todoData: TodoData = action.data;

    const todo = store!!.todo.slice();
    const length = todo.length;

    let index = -1;
    const todoItemId = todoData.todoItemId;

    for (let i = 0; i < length; i++) {
        if (todo[i].todoItemId === todoItemId) {
            index = i;

            break;
        }
    }

    if (index < 0) {
        todo.push(todoData);
    }
    else {
        const itemAtIndex = {...todo[index]};
        todo[index] = itemAtIndex;
    }

    // the new location
    const state = AppState.todo;

    // delete the existent quick add comments field
    const todoDetails = {...store!!.todoDetails, ...{comments: ''}};

    return {...store!!, ...{todo, state, todoDetails}};
}
