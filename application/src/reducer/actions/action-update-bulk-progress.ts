import {Action} from "redux";
import UpdateUploadData from "../../data/value/update-upload-data";
import Store from "../../data/store/store";
import {BulkAttachData} from "../../data/value/bulk-attach-data";

export const ACTION_UPDATE_BULK_PROGRESS = 'ACTION_UPDATE_BULK_PROGRESS';


export interface ActionUpdateBulkProgress extends Action {
    type: string;
    uploadProgress: UpdateUploadData;
}

export const createActionUpdateBulkProgress = (uploadProgress: UpdateUploadData): ActionUpdateBulkProgress => {
    return {
        type: ACTION_UPDATE_BULK_PROGRESS,
        uploadProgress
    }
}

export const createReducerUpdateBulkProgress = (store: Store | undefined, action: ActionUpdateBulkProgress): Store => {
    const uploadProgress = action.uploadProgress;

    const bulkAddAttachment = store!!.bulkAddAttachment;
    const total = uploadProgress.total;
    const loaded = uploadProgress.loaded;

    const blk: BulkAttachData = {...bulkAddAttachment, total, loaded}

    return {...store!!, ...{bulkAddAttachment: blk}};
}
