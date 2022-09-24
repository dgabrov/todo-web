import {Action} from "redux";
import Store from "../../data/store/store";
import UpdateUploadData from "../../data/value/update-upload-data";

export const ACTION_UPDATE_PROGRESS = 'ACTION_UPDATE_PROGRESS';


export interface ActionUpdateProgress extends Action {
    uploadProgress: UpdateUploadData;
}

export const createActionUpdateProgress = (uploadProgress: UpdateUploadData): ActionUpdateProgress => {
    return {
        type: ACTION_UPDATE_PROGRESS,
        uploadProgress
    }
}

export const createReducerUpdateProgress = (store: Store | undefined, action: ActionUpdateProgress): Store => {
    const uploadProgress = action.uploadProgress;

    return {...store!!, uploadProgress};
}
