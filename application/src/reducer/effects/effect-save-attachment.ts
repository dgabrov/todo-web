import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import {AttachmentData} from "../../data/item/attachment-data";
import {updateAttachment} from "../../service/server";
import {createActionAfterUpdateAttachment} from "../actions/action-after-update-attachment";

const processEffectSaveAttachment = async (dispatch: any, getStore : any,
                                           adding: boolean, attachment: AttachmentData,
                                           files: any[]): Promise<boolean> => {
    try {
        // check files are ok
        if (adding && files.length < 1) {
            dispatch(createActionSendMessage(true, "Please provide a file when adding an attachment"));
        }
        else {
            // if files ok, call the service
            let file : any|null = null;
            if (files.length > 0) {
                file = files[0];
            }

            const attachResult: AttachmentData = await updateAttachment(adding, attachment, file);

            // if call is ok, then proceed to update all the stuff and then go back
            dispatch(createActionAfterUpdateAttachment(attachResult, adding));
        }
    }
    catch(err) {
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return true;
}

export const createEffectSaveAttachment = (adding: boolean, attachment: AttachmentData, files: any[]) => {
    return (dispatch: any, getStore: any) => {
        processEffectSaveAttachment(dispatch, getStore, adding, attachment, files).then(()=>{}).catch(()=>{});
    }
}
