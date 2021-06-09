import {AttachmentData} from "../../item/attachment-data";

export interface EditAttachmentPropsCallback {
    submit(adding: boolean, attachment: AttachmentData, files: any[]): void;
    cancel() : void;
}
