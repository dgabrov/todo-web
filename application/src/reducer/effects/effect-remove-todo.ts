import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {removeItems} from "../../service/server";
import {createActionAfterRemoveItems} from "../actions/action-after-remove-items";

const processEffectRemoveTodo = async (dispatch: any, getStore: any, ids: string[]) : Promise<number> => {
    await removeItems(ids);

    // items were removed
    dispatch(createActionAfterRemoveItems(ids));

    return 0;
}

export const createEffectRemoveTodo = (ids: string[]) => {
    return (dispatch: any, getStore: any) => {
        processEffectRemoveTodo(dispatch, getStore, ids)
            .then(() => {
                // no implementation
            })
            .catch((err) => {
                dispatch(createActionSendMessage(true, processError(err)))
            });
    }
}
