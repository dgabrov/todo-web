import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import {AttachmentData} from "../../data/item/attachment-data";
import UpdateUploadData from "../../data/value/update-upload-data";
import {createActionUpdateBulkProgress} from "../actions/action-update-bulk-progress";
import {createActionAfterBulkAddAttachment} from "../actions/action-after-bulk-add-attachment";
import {addBulkAttachment} from "../../service/server";

const processEffectBulkAddAttachment = async (dispatch: any, getStore: any, itemId: string, name: string, files: any[]) : Promise<boolean> => {
    try {
        // files must be filled out with at least one file
        if (!(files && files.length && files.length > 1)) {
            dispatch(createActionSendMessage(true, "At least one file is needed for bulk add files"))
        } else {
            // proceed with the request
            const attachments : AttachmentData[] = await bulkAddAttachment(itemId, name, files,
                (upload: UpdateUploadData) => {
                    dispatch(createActionUpdateBulkProgress(upload));
                }
            )

            // send action after bulk add attachment
            dispatch(createActionAfterBulkAddAttachment(itemId, attachments));
        }
    } catch (err){
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return true;
}


export const createEffectBulkAddAttachment = (itemId: string, name: string, files: any[]) => {
    return (dispatch: any, getStore: any) => {
        processEffectBulkAddAttachment(dispatch, getStore, itemId, name, files).then(()=>{}).catch(()=>{});
    }
}

const bulkAddAttachment = async (itemId: string, name: string, files: any[], callback: (upload: UpdateUploadData) => void) : Promise<AttachmentData[]> => {
    return await addBulkAttachment(itemId, name, files, callback);
}