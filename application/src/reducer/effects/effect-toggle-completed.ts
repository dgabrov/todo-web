import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {toggleCompleted} from "../../service/server";
import {CompletedData} from "../../data/server-data/completed-data";
import {createActionAfterToggleCompleted} from "../actions/action-after-toggle-completed";

const processEffectToggleCompleted = async (dispatch: any, getStore: any, todoItemId: string) : Promise<number> => {
    const res: CompletedData = await toggleCompleted(todoItemId);

    dispatch(createActionAfterToggleCompleted(res));

    return 0;
}

export const createEffectToggleCompleted = (todoItemId: string) => {
    return (dispatch: any, getStore: any) => {
        processEffectToggleCompleted(dispatch, getStore, todoItemId)
            .then(() => {})
            .catch((err) => {dispatch(createActionSendMessage(true, processError(err)))});
    }
}
