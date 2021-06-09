import {Action} from "redux";
import Store from "../../data/store/store";

export const ACTION_TOGGLE_SELECT_ATTACHMENT = 'ACTION_TOGGLE_SELECT_ATTACHMENT';


export interface ActionToggleSelectAttachment extends Action {
    type: string;
    attachmentId: string;
}

export const createActionToggleSelectAttachment = (attachmentId: string): ActionToggleSelectAttachment => {
    return {
        type: ACTION_TOGGLE_SELECT_ATTACHMENT,
        attachmentId
    }
}

export const createReducerToggleSelectAttachment = (store: Store | undefined, action: ActionToggleSelectAttachment): Store => {
    const attachmentId = action.attachmentId;
    const attachmentSelected = {...store!!.items.attachmentSelected};

    if (attachmentSelected.hasOwnProperty(attachmentId)) {
        delete (attachmentSelected[attachmentId]);
    }
    else {
        attachmentSelected[attachmentId] = "";
    }

    const items = {...store!!.items, ...{attachmentSelected}};
    return {...store!!, ...{items}};
}
