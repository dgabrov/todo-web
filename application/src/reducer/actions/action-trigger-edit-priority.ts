import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_TRIGGER_EDIT_PRIORITY = 'ACTION_TRIGGER_EDIT_PRIORITY';


export interface ActionTriggerEditPriority extends Action {
    type: string;
    todoItemId: string;
}

export const createActionTriggerEditPriority = (todoItemId: string): ActionTriggerEditPriority => {
    return {
        type: ACTION_TRIGGER_EDIT_PRIORITY,
        todoItemId
    }
}

export const createReducerTriggerEditPriority = (store: Store | undefined, action: ActionTriggerEditPriority): Store => {
    const todoDetails = {...store!!.todoDetails};

    // very important - only one of the edit priority id or edit due id can be null
    todoDetails.editPriorityId = action.todoItemId;
    todoDetails.editDueId = null;

    return {...store!!, ...{todoDetails}};
}
