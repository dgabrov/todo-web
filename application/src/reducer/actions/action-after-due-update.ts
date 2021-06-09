import {Action} from "redux";
import Store from "../../data/store/store";
import TodoData from "../../data/value/todo-data";

export const ACTION_AFTER_DUE_UPDATE = 'ACTION_AFTER_DUE_UPDATE';


export interface ActionAfterDueUpdate extends Action {
    type: string;
    todoItemId: string;
    due: Date|null;
}

export const createActionAfterDueUpdate = (todoItemId: string, due: Date|null): ActionAfterDueUpdate => {
    return {
        type: ACTION_AFTER_DUE_UPDATE,
        todoItemId,
        due
    }
}

export const createReducerAfterDueDate = (store: Store | undefined, action: ActionAfterDueUpdate): Store => {
    const todoItemId: string = action.todoItemId;
    const due: Date|null = action.due;

    const todo = store!!.todo.map((item) => {
        let res: TodoData;

        if (item.todoItemId === todoItemId) {
            res = {...item, ...{due}};
        }
        else {
            res = item;
        }

        return res;
    });

    const todoDetails = {...store!!.todoDetails, ...{editDueId: "", editPriorityId: ""}};

    return {...store!!, ...{todo, todoDetails}};
}
