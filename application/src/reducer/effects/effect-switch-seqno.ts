import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {switchSeqno} from "../../service/server";
import {CompleteItemData} from "../../data/item/complete-item-data";
import {createActionRefreshStorageItem} from "../actions/action-refresh-storage-item";

const processEffectSwitchSeqno = async (dispatch: any, getStore : any, attId: string, otherAttId: string): Promise<number> => {

    try {
        const item: CompleteItemData = await switchSeqno(attId, otherAttId);

        dispatch(createActionRefreshStorageItem(item));
    }
    catch(err){
        let errorMessage = processError(err);
        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectSwitchSeqno = (attId: string, otherAttId: string) => {
    return (dispatch: any, getStore: any) => {
        processEffectSwitchSeqno(dispatch, getStore, attId, otherAttId)
            .then(()=>{})
            .catch(()=>{});
    }
}
