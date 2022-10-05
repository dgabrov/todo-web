import {AttachmentData} from "./attachment-data";
import {ItemData} from "./item-data";

export interface CompleteItemData extends ItemData {
    attachments: AttachmentData[];
}
