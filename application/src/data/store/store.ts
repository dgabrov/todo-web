import PersonData from "../value/person-data";
import MessageData from "../value/message-data";
import TodoData from "../value/todo-data";
import BulkData from "../value/bulk-data";
import EditTodoData from "../value/edit-todo-data";
import TodoPropsBaseData from "../props/todo/todo-props-base-data";
import AppState from "../value/app-state";
import {StoreItemData} from "../item/store-item-data";
import {EditItemData} from "../value/edit-item-data";
import {EditAttachmentData} from "../value/edit-attachment-data";
import UpdateUploadData from "../value/update-upload-data";

export default interface Store {
    state: AppState
    initialLogin: string;
    token: string;
    persons: PersonData[];
    messages: MessageData[];
    todo: TodoData[];
    selected: string[];
    bulk: BulkData;
    edit: EditTodoData;
    editItem: EditItemData;
    editAttachment: EditAttachmentData;
    todoDetails: TodoPropsBaseData;
    items: StoreItemData;
    showAddedUpdated: boolean;
    showProgressBar: boolean;
    uploadProgress: UpdateUploadData;
}

