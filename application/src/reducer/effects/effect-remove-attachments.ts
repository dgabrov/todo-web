import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import Store from "../../data/store/store";
import {deleteAttachments} from "../../service/server";
import {createActionAfterRemoveAttachment} from "../actions/action-after-remove-attachment";

const processEffectRemoveAttachments = async (dispatch: any, getStore: any): Promise<boolean> => {
    try {
        // get the store, the selected attachments
        const store: Store = getStore();

        // get the selected attachment ids as an array of strings
        const ids = Object.keys(store.items.attachmentSelected);

        // delete attachments
        await deleteAttachments(ids);

        // send after removal action to remove the deleted attachments
        dispatch(createActionAfterRemoveAttachment());
    }
    catch(err){
        const error = processError(err);

        dispatch(createActionSendMessage(true, error));
    }

    return true;
}

export const createEffectRemoveAttachments = () => {
    return (dispatch: any, getStore: any) => {
        processEffectRemoveAttachments(dispatch, getStore)
            .then(() => {})
            .catch(() => {});
    }
}
