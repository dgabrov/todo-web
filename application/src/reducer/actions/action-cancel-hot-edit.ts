import {Action} from "redux";
import Store from "../../data/store/store";
import {HOT_FIELD_DUE, HOT_FIELD_PRIORITY} from "../../util/constants";

export const ACTION_CANCEL_HOT_EDIT = 'ACTION_CANCEL_HOT_EDIT';


export interface ActionCancelHotEdit extends Action {
    type: string;
    fieldName: string;
}

export const createActionCancelHotEdit = (fieldName: string): ActionCancelHotEdit => {
    return {
        type: ACTION_CANCEL_HOT_EDIT,
        fieldName
    }
}

export const createReducerActionCancelHotEdit = (store: Store | undefined, action: ActionCancelHotEdit): Store => {
    const fieldName = action.fieldName;
    const todoDetails = {...store!!.todoDetails};

    if (fieldName === HOT_FIELD_PRIORITY) {
        todoDetails.editPriorityId = '';
    }
    else if (fieldName === HOT_FIELD_DUE) {
        todoDetails.editDueId = '';
    }

    return {...store!!, ...{todoDetails}};
}
