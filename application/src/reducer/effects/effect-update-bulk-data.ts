import BulkIdsData from "../../data/value/bulk-ids-data";
import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {BulkUpdateData} from "../../data/value/bulk-update-data";
import {convertBulkData} from "../../util/util-ui-functions";
import {updateBulkData} from "../../service/server";
import TodoData from "../../data/value/todo-data";
import {createActionAfterBulkUpdate} from "../actions/action-after-bulk-update";

const processEffectUpdateBulkData = async (dispatch: any, getStore: any, data: BulkIdsData) : Promise<number> => {
    try {
        const updateData: BulkUpdateData = convertBulkData(data);

        const updatedTodos: TodoData[] = await updateBulkData(updateData);

        dispatch(createActionAfterBulkUpdate(updatedTodos));
    }
    catch(err){
        let errorMessage = processError(err);
        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectUpdateBulkData = (data: BulkIdsData) => {
    return (dispatch: any, getStore: any) => {
        processEffectUpdateBulkData(dispatch, getStore, data).then(()=>{}).catch(()=>{});
    }
}
