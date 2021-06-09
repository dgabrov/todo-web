import {Action} from "redux";
import TodoData from "../../data/value/todo-data";
import Store from "../../data/store/store";
import AppState from "../../data/value/app-state";

export const ACTION_AFTER_UPDATE_TODO = 'ACTION_AFTER_UPDATE_TODO';


export interface ActionAfterUpdateTodo extends Action {
    type: string;
    adding: boolean;
    data: TodoData
}

export const createActionAfterUpdateTodo = (adding: boolean, data: TodoData): ActionAfterUpdateTodo => {
    return {
        type: ACTION_AFTER_UPDATE_TODO,
        adding,
        data
    }
}

export const createReducerAfterUpdateTodo = (store: Store | undefined, action: ActionAfterUpdateTodo): Store => {
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
        todo[index] = {...todoData};
    }

    // the new location
    const state = AppState.todo;

    return {...store!!, ...{todo, state}};
}
