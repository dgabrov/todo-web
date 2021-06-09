import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import Store from "../../data/store/store";
import {deleteStorageItems} from "../../service/server";
import {createActionAfterDeleteStorageItems} from "../actions/action-after-delete-storage-items";

const processEffectRemoveItems = async (dispatch: any, getStore : any) : Promise<number> => {
    try {
        // get the selected ids
        const store: Store = getStore();

        const ids = Object.keys(store.items.selected);

        // call the server
        await deleteStorageItems(ids);

        // in case of success, dispatch the aftermath action that will adjust the items and remove the
        // selected status for the removed items if any
        dispatch(createActionAfterDeleteStorageItems(ids));
    }
    catch(err) {
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectRemoveItems = ()  => {
    return (dispatch: any, getStore: any) => {
        processEffectRemoveItems(dispatch, getStore)
            .then(() => {})
            .catch(() => {});
    }
}
