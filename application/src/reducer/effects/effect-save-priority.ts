import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {parseNumber} from "../../util/util-ui-functions";
import {updatePriority} from "../../service/server";
import {createActionAfterPriorityUpdate} from "../actions/action-after-priority-update";

const processEffectSavePriority = async (dispatch: any, getStore: any, todoItemId: string, newPriority: string): Promise<number> => {
    try {
        // parse integer the priority
        const priority = parseNumber(newPriority);

        // trigger the service call
        await updatePriority(todoItemId, priority);

        // dispatch action to update the priority and turn off the hot editing +
        dispatch(createActionAfterPriorityUpdate(todoItemId, priority));
    }
    catch(err){
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectSavePriority = (todoItemId: string, newPriority: string) => {
    return (dispatch: any, getStore: any) => {
        processEffectSavePriority(dispatch, getStore, todoItemId, newPriority).then(()=>{}).catch(()=>{});
    }
}
