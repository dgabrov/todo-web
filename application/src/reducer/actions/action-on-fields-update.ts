import {Action} from "redux";
import Store from "../../data/store/store";
import AddTodoData from "../../data/value/add-todo-data";
import TodoPropsBaseData from "../../data/props/todo/todo-props-base-data";

export const ACTION_ON_FIELDS_UPDATE = 'ACTION_ON_FIELDS_UPDATE';


export interface ActionOnFieldsUpdate extends Action {
    type: string;
    data: AddTodoData
}

export const createActionOnFieldsUpdate = (data: AddTodoData): ActionOnFieldsUpdate => {
    return {
        type: ACTION_ON_FIELDS_UPDATE,
        data
    }
}

export const createReducerOnFieldsUpdate = (store: Store | undefined, action: ActionOnFieldsUpdate): Store => {
    const data: AddTodoData = action.data;

    const todoDetails: TodoPropsBaseData = {
        editPriorityId: null,
        editDueId: null,
        search: data.search,
        project: data.project,
        priority: data.priority,
        personId: data.personId,
        comments: data.comments,
        context: data.context,
        due: data.due
    }

    return {...store!!, ...{todoDetails}};
}
