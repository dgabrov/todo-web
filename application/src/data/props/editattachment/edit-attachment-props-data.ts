import {AttachmentData} from "../../item/attachment-data";
import UpdateUploadData from "../../value/update-upload-data";

export interface EditAttachmentPropsData {
    adding: boolean;
    attachment: AttachmentData;
    showProgressBar: boolean;
    uploadProgress: UpdateUploadData;
}
