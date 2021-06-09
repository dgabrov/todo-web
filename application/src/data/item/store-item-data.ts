import {CompleteItemData} from "./complete-item-data";

export interface StoreItemData {
    items: CompleteItemData[];
    selected: {[key: string] : string};
    attachmentSelected: { [key: string]: string };
    expanded : {[key: string] : string};
    search: string;
}
