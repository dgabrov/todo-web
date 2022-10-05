import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import {AttachmentData} from "../../data/item/attachment-data";
import UpdateUploadData from "../../data/value/update-upload-data";
import {createActionUpdateBulkProgress} from "../actions/action-update-bulk-progress";
import {createActionAfterBulkAddAttachment} from "../actions/action-after-bulk-add-attachment";

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

const proceedDelay = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    })
}

const bulkAddAttachment = async (itemId: string, name: string, files: any[], callback: (upload: UpdateUploadData) => void) : Promise<AttachmentData[]> => {
    callback({total: 10000, loaded: 10000});

    // wait for a second here and there
    await proceedDelay();
    return [
        {attachmentId: '1', itemId, added: new Date(), contentType: 'application/text', description:'description1', fileName:'alfa1.dat', seqNo:10, updated: new Date()},
        {attachmentId: '2', itemId, added: new Date(), contentType: 'application/text', description:'description2', fileName:'alfa2.dat', seqNo:10, updated: new Date()},
        {attachmentId: '3', itemId, added: new Date(), contentType: 'application/text', description:'description3', fileName:'alfa3.dat', seqNo:10, updated: new Date()},
        {attachmentId: '4', itemId, added: new Date(), contentType: 'application/text', description:'description4', fileName:'alfa4.dat', seqNo:10, updated: new Date()},
        {attachmentId: '5', itemId, added: new Date(), contentType: 'application/text', description:'description5', fileName:'alfa5.dat', seqNo:10, updated: new Date()},
    ];
}