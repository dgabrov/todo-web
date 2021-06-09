import {ItemData} from "../../item/item-data";
import PersonData from "../../value/person-data";

export interface EditItemPropsData {
    itemData: ItemData;
    adding: boolean;
    persons: PersonData[];
}
