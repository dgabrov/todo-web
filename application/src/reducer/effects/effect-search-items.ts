import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import Store from "../../data/store/store";
import {searchItems} from "../../service/server";
import {CompleteItemData} from "../../data/item/complete-item-data";
import {createActionAfterItemSearch} from "../actions/action-after-item-search";

const processEffectSearchItems = async (dispatch: any, getStore : any) : Promise<number> => {
    try {
        // get the search string
        const store: Store = getStore();
        const search = store.items.search;

        const searchResult : CompleteItemData[] = await searchItems(search);

        dispatch(createActionAfterItemSearch(searchResult));
    }
    catch(err) {
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectSearchItems = ()  => {
    return (dispatch: any, getStore: any) => {
        processEffectSearchItems(dispatch, getStore)
            .then(() => {})
            .catch(() => {});
    }
}
