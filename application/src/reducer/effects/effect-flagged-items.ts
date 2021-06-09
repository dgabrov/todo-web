import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import {getFlaggedItems} from "../../service/server";
import {createActionAfterItemSearch} from "../actions/action-after-item-search";

const processEffectFlaggedItems = async (dispatch: any, getStore : any): Promise<number> => {

    try {
        const flaggedItems = await getFlaggedItems();

        dispatch(createActionAfterItemSearch(flaggedItems));
    }
    catch(err){
        let errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectFlaggedItems = () => {
    return (dispatch: any, getStore: any) => {
        processEffectFlaggedItems(dispatch, getStore)
            .then(()=>{})
            .catch(()=>{});
    }
}
