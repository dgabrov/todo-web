import {Action} from "redux";
import Store from "../../data/store/store";
import {EditAttachmentData} from "../../data/value/edit-attachment-data";
import AppState from "../../data/value/app-state";

export const ACTION_EDIT_ATTACHMENT = 'ACTION_EDIT_ATTACHMENT';


export interface ActionEditAttachment extends Action {
    type: string;
    adding: boolean;
    attachmentId: string;
    itemId: string;
}

export const createActionEditAttachment = (adding: boolean, attachmentId: string, itemId: string): ActionEditAttachment => {
    return {
        type: ACTION_EDIT_ATTACHMENT,
        adding,
        itemId,
        attachmentId
    }
}

export const createReducerEditAttachment = (store: Store | undefined, action: ActionEditAttachment): Store => {
    const {adding, itemId, attachmentId} = action;

    const editAttachment : EditAttachmentData = {
        itemId, attachmentId, adding
    }

    return {...store!!, ...{editAttachment, state: AppState.editAttachment}};
}
