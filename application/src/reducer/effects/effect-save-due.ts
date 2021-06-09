import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {parseDate} from "../../util/util-ui-functions";
import {updateDue} from "../../service/server";
import {createActionAfterDueUpdate} from "../actions/action-after-due-update";

const processEffectSaveDue = async (dispatch: any, getStore: any, todoItemId: string, newDue: string): Promise<number> => {
    try {
        // parse integer the priority
        const dueDate = parseDate(newDue);

        // trigger the service call
        await updateDue(todoItemId, dueDate);

        // dispatch action to update the priority and turn off the hot editing +
        dispatch(createActionAfterDueUpdate(todoItemId, dueDate));
    }
    catch(err){
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectSaveDue = (todoItemId: string, newDue: string) => {
    return (dispatch: any, getStore: any) => {
        processEffectSaveDue(dispatch, getStore, todoItemId, newDue).then(()=>{}).catch(()=>{});
    }
}
