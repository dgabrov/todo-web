import {StoreItemData} from "../../item/store-item-data";
import PersonData from "../../value/person-data";

export interface ItemsPropsData {
    storeItemData: StoreItemData;
    persons: {[key: string] : PersonData}
}
