import {Action} from "redux";
import Store from "../../data/store/store";
import EditTodoData from "../../data/value/edit-todo-data";
import {v1} from 'uuid';
import {defaultPriority} from "../../util/constants";
import AppState from "../../data/value/app-state";

export const ACTION_ADD_TODO_ITEM = 'ACTION_ADD_TODO_ITEM';


export interface ActionAddTodoItem extends Action {
    type: string;
}

export const createActionAddTodoItem = (): ActionAddTodoItem => {
    return {
        type: ACTION_ADD_TODO_ITEM
    }
}

export const createReducerAddTodoItem = (store: Store | undefined, action: ActionAddTodoItem): Store => {
    const edit: EditTodoData = {
        adding: true,
        personId: store!!.todoDetails.personId,
        projectCd: '',
        contextCd: '',
        comments: '',
        todoItemId: v1(),
        completed: false,
        priority: defaultPriority,
        due: ''
    }
    const state = AppState.editTodo;

    return {...store!!, ...{edit, state}};
}
