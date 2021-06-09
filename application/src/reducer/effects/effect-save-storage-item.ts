import {ItemData} from "../../data/item/item-data";
import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import {updateStorageItem} from "../../service/server";
import {createActionAfterUpdateStorageItem} from "../actions/action-after-update-storage-item";

const processEffectSaveStorageItem = async (dispatch: any, getStore : any, adding: boolean, item: ItemData): Promise<boolean> => {
    try {
        // save the item data and get the saved one
        const updatedItem: ItemData = await updateStorageItem(adding, item);

        // dispatch after save action
        dispatch(createActionAfterUpdateStorageItem(adding, updatedItem));
    }
    catch(err) {
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return true;
}

export const createEffectSaveStorageItem = (adding: boolean, item: ItemData) => {
    return (dispatch: any, getStore: any) => {
        processEffectSaveStorageItem(dispatch, getStore, adding, item).then(()=>{}).catch(()=>{});
    }
}
