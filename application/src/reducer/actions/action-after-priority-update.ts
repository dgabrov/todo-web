import {Action} from "redux";
import Store from "../../data/store/store";
import TodoData from "../../data/value/todo-data";

export const ACTION_AFTER_PRIORITY_UPDATE = 'ACTION_AFTER_PRIORITY_UPDATE';


export interface ActionAfterPriorityUpdate extends Action {
    type: string;
    todoItemId: string;
    priority: number;
}

export const createActionAfterPriorityUpdate = (todoItemId: string, priority: number): ActionAfterPriorityUpdate => {
    return {
        type: ACTION_AFTER_PRIORITY_UPDATE,
        todoItemId,
        priority
    }
}

export const createReducerAfterPriorityUpdate = (store: Store | undefined, action: ActionAfterPriorityUpdate): Store => {
    const todoItemId: string = action.todoItemId;
    const priority: number = action.priority;

    const todo = store!!.todo.map((item) => {
        let res: TodoData;

        if (item.todoItemId === todoItemId) {
            res = {...item, ...{priority}};
        }
        else {
            res = item;
        }

        return res;
    });

    const todoDetails = {...store!!.todoDetails, ...{editDueId: "", editPriorityId: ""}};

    return {...store!!, ...{todo, todoDetails}};
}
