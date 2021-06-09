import {ItemData} from "../../item/item-data";

export interface EditItemPropsCallback {
    submit(adding: boolean, item: ItemData): void;

    cancel() : void;
}
