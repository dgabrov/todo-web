import {Action} from "redux";
import BulkData from "../../data/value/bulk-data";
import Store from "../../data/store/store";

export const ACTION_UPDATE_STORE_BULK_DATA = 'ACTION_UPDATE_STORE_BULK_DATA';


export interface ActionUpdateStoreBulkData extends Action {
    type: string;
    bulkData: BulkData
}

export const createActionUpdateStoreBulkData = (bulkData: BulkData): ActionUpdateStoreBulkData => {
    return {
        type: ACTION_UPDATE_STORE_BULK_DATA,
        bulkData
    }
}

export const createReducerUpdateStoreBulkData = (store: Store | undefined, action: ActionUpdateStoreBulkData): Store => {
    const bulk = action.bulkData;

    return {...store!!, ...{bulk}};
}
