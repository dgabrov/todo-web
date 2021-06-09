import TodoData from "../../data/value/todo-data";
import {search} from "../../service/server";
import {createActionAfterTodoSearch} from "../actions/action-after-todo-search";
import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {SearchServerData} from "../../data/search/search-server-data";
import {parseSearchData} from "../../util/search/parse-search-data";

const processEffectSearch = async (dispatch: any, getStore: any, text?: string): Promise<number> => {
    let storeSearch = getStore().todoDetails.search;

    const src = text ? text : storeSearch;
    const parsedSearchData: SearchServerData = parseSearchData(src);

    const items: TodoData[] = await search(parsedSearchData);

    dispatch(createActionAfterTodoSearch(items, src!!));

    return 0;
}

export const createEffectSearch = (search?: string) => {
    return (dispatch: any, getStore: any) => {

        processEffectSearch(dispatch, getStore, search)
            .then(() => {})
            .catch((err) => {dispatch(createActionSendMessage(true, processError(err)));});

    }
}
