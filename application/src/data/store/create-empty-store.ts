import Store from "./store";
import AppState from "../value/app-state";
import BulkData from "../value/bulk-data";
import EditTodoData from "../value/edit-todo-data";
import TodoPropsBaseData from "../props/todo/todo-props-base-data";
import {defaultPriority} from "../../util/constants";
import {StoreItemData} from "../item/store-item-data";
import {EditItemData} from "../value/edit-item-data";
import {EditAttachmentData} from "../value/edit-attachment-data";

const createStoreItemData = () : StoreItemData => {
    return {
        expanded: {},
        selected: {},
        attachmentSelected: {},
        items: [],
        search: ''
    };
}

const createEmptyBulkData = (): BulkData => {
    return {
        ownerId: "",
        context: "",
        project: "",
        due: "",
        priority: "",
        selectedOwner: false,
        selectedContext: false,
        selectedProject: false,
        selectedDue: false,
        selectedPriority: false
    }
}

const createEmptyEditItemData = () : EditItemData => {
    return {
        adding: true,
        itemId: ""
    }
}

const createEmptyEditTodoData = () :EditTodoData => {
    return {
        adding: true,
        completed: false,
        todoItemId: "",
        personId: "",
        comments: "",
        projectCd: "",
        contextCd: "",
        priority: "",
        due: ""
    }
}

const createEmptyTodoPropsBaseData = () : TodoPropsBaseData => {
    return {
        search: "",
        personId: "",
        project: "",
        context: "",
        priority: defaultPriority,
        due: "",
        comments: "",
        editDueId: null,
        editPriorityId: null
    }
}

const createEmptyAttachmentData = () : EditAttachmentData => {
    return {
        adding: true,
        attachmentId: "",
        itemId: ""
    }
}

const createEmptyStore = () : Store => {
    return {
        state: AppState.starter,
        initialLogin: "",
        token: "",
        persons: [],
        messages: [],
        todo: [],
        selected: [],
        bulk: createEmptyBulkData(),
        edit: createEmptyEditTodoData(),
        editItem: createEmptyEditItemData(),
        editAttachment: createEmptyAttachmentData(),
        todoDetails: createEmptyTodoPropsBaseData(),
        items: createStoreItemData(),
        showAddedUpdated: false
    }
}

export default createEmptyStore;

