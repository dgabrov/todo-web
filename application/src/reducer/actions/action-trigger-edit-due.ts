import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_TRIGGER_EDIT_DUE = 'ACTION_TRIGGER_EDIT_DUE';


export interface ActionTriggerEditDue extends Action {
    type: string;
    todoItemId: string;
}

export const createActionTriggerEditDue = (todoItemId: string): ActionTriggerEditDue => {
    return {
        type: ACTION_TRIGGER_EDIT_DUE,
        todoItemId
    }
}

export const createReducerTriggerEditDue = (store: Store | undefined, action: ActionTriggerEditDue): Store => {
    const todoDetails = {...store!!.todoDetails};
    todoDetails.editPriorityId = null;
    todoDetails.editDueId = action.todoItemId;

    return {...store!!, ...{todoDetails}};
}
