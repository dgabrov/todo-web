import Store from "../data/store/store";
import {Action, Reducer} from "redux";
import createEmptyStore from "../data/store/create-empty-store";
import {ACTION_TEST, createReducerTest} from "./actions/action-test";
import {ACTION_SEND_MESSAGE, createReducerSendMessage} from "./actions/action-send-message";
import {ACTION_REFRESH_MESSAGES, createReducerRefreshMessages} from "./actions/acton-refresh-messages";
import {ACTION_LOGOUT, createReducerLogout} from "./actions/action-logout";
import {ACTION_SET_LOCATION, createReducerSetLocation} from "./actions/action-set-location";
import {ACTION_SELECT_ALL, createReducerSelectAll} from "./actions/action-select-all";
import {ACTION_TRIM, createReducerTrim} from "./actions/action-trim";
import {ACTION_TOGGLE_SELECT_ITEM, createReducerToggleSelectItem} from "./actions/action-toggle-select-item";
import {ACTION_CLEAR, createReducerClear} from "./actions/action-clear";
import {ACTION_BULK, createReducerBulk} from "./actions/action-bulk";
import {ACTION_REMOVE_TODO, createReducerRemoveTodo} from "./actions/action-remove-todo";
import {ACTION_ADD_TODO_ITEM, createReducerAddTodoItem} from "./actions/action-add-todo-item";
import {ACTION_EDIT_TODO_ITEM, createReducerEditItem} from "./actions/action-edit-todo-item";
import {ACTION_TRIGGER_EDIT_DUE, createReducerTriggerEditDue} from "./actions/action-trigger-edit-due";
import {ACTION_TRIGGER_EDIT_PRIORITY, createReducerTriggerEditPriority} from "./actions/action-trigger-edit-priority";
import {ACTION_AFTER_LOGIN, createReducerAfterLogin} from "./actions/action-after-login";
import {ACTION_ON_FIELDS_UPDATE, createReducerOnFieldsUpdate} from "./actions/action-on-fields-update";
import {ACTION_AFTER_TODO_SEARCH, createReducerAfterTodoSearch} from "./actions/action-after-todo-search";
import {
    ACTION_AFTER_TOGGLE_COMPLETED,
    createReducerAfterToggleCompleted
} from "./actions/action-after-toggle-completed";
import {ACTION_AFTER_REMOVE_ITEMS, createReducerAfterRemoveItems} from "./actions/action-after-remove-items";
import {ACTION_AFTER_UPDATE_TODO, createReducerAfterUpdateTodo} from "./actions/action-after-update-todo";
import {ACTION_AFTER_QUICK_ADD, createReducerAfterQuickAdd} from "./actions/action-after-quick-add";
import {
    ACTION_AFTER_ADDITIONAL_LOGIN,
    createReducerAfterAdditionalLogin
} from "./actions/action-after-additional-login";
import {
    ACTION_AFTER_LOGOUT_ADDITIONAL,
    createReducerAfterLogoutAdditional
} from "./actions/action-after-logout-additional";
import {ACTION_AFTER_BULK_UPDATE, createReducerAfterBulkUpdate} from "./actions/action-after-bulk-update";
import {ACTION_CANCEL_HOT_EDIT, createReducerActionCancelHotEdit} from "./actions/action-cancel-hot-edit";
import {ACTION_UPDATE_STORE_BULK_DATA, createReducerUpdateStoreBulkData} from "./actions/action-update-store-bulk-data";
import {ACTION_AFTER_PRIORITY_UPDATE, createReducerAfterPriorityUpdate} from "./actions/action-after-priority-update";
import {ACTION_AFTER_DUE_UPDATE, createReducerAfterDueDate} from "./actions/action-after-due-update";
import {ACTION_SEARCH_ITEM, createReducerSearchItem} from "./actions/action-search-item";
import {ACTION_AFTER_ITEM_SEARCH, createReducerAfterItemSearch} from "./actions/action-after-item-search";
import {ACTION_EXPAND_ITEM, createReducerExpandItem} from "./actions/action-expand-item";
import {
    ACTION_TOGGLE_SELECT_STORAGE_ITEM,
    createReducerToggleSelectStorageItem
} from "./actions/action-toggle-select-storage-item";
import {
    ACTION_TOGGLE_SELECT_ALL_STORAGE_ITEMS,
    createReducerToggleSelectAllStorageItems
} from "./actions/action-toggle-select-all-storage-items";
import {
    ACTION_TOGGLE_SELECT_ATTACHMENT,
    createReducerToggleSelectAttachment
} from "./actions/action-toggle-select-attachment";
import {
    ACTION_UNSELECT_ALL_ATTACHMENTS,
    createReducerUnselectAllAttachments
} from "./actions/action-unselect-all-attachments";
import {ACTION_REMOVE_STORAGE_ITEM, createReducerRemoveStorageItem} from "./actions/action-remove-storage-item";
import {
    ACTION_AFTER_DELETE_STORAGE_ITEMS,
    createReducerAfterDeleteStorageItems
} from "./actions/action-after-delete-storage-items";
import {ACTION_REMOVE_ATTACHMENT, createReducerRemoveAttachment} from "./actions/action-remove-attachment";
import {
    ACTION_AFTER_REMOVE_ATTACHMENT,
    createReducerAfterRemoveAttachment
} from "./actions/action-after-remove-attachment";
import {ACTION_EDIT_STORAGE_ITEM, createReducerEditStorageItem} from "./actions/action-edit-storage-item";
import {
    ACTION_AFTER_UPDATE_STORAGE_ITEM,
    createReducerAfterUpdateStorageItem
} from "./actions/action-after-update-storage-item";
import {ACTION_EDIT_ATTACHMENT, createReducerEditAttachment} from "./actions/action-edit-attachment";
import {
    ACTION_AFTER_UPDATE_ATTACHMENT,
    createReducerAfterUpdateAttachment
} from "./actions/action-after-update-attachment";
import {ACTION_CLEAR_ITEMS, createReducerClearItems} from "./actions/action-clear-items";
import {ACTION_REFRESH_STORAGE_ITEM, createReducerRefreshStorageItem} from "./actions/action-refresh-storage-item";
import {ACTION_EXPAND_ALL, createReducerExpandAll} from "./actions/action-expand-all";
import {ACTION_TRIM_ITEMS, createReducerTrimItems} from "./actions/action-trim-items";
import {
    ACTION_TOGGLE_SHOW_ADDED_UPDATED,
    createReducerToggleShowAddedUpdated
} from "./actions/action-toggle-show-added-updated";
import {ACTION_AFTER_MULTIPLE_ADD, createReducerAfterMultipleAdd} from "./actions/action-after-multiple-add";
import {ACTION_SHOW_HIDE_PROGRESS_BAR, createReducerShowHideProgressBar} from "./actions/action-show-hide-progress-bar";
import {ACTION_UPDATE_PROGRESS, createReducerUpdateProgress} from "./actions/action-update-progress";
import {ACTION_BULK_ADD_ATTACHMENTS, createReducerBulkAddAttachment} from "./actions/action-bulk-add-attachment";


const reducerMap: { [key: string]: any } = {};

reducerMap[ACTION_TEST] = createReducerTest;
reducerMap[ACTION_SEND_MESSAGE] = createReducerSendMessage;
reducerMap[ACTION_REFRESH_MESSAGES] = createReducerRefreshMessages;
reducerMap[ACTION_LOGOUT] = createReducerLogout;
reducerMap[ACTION_SET_LOCATION] = createReducerSetLocation;
reducerMap[ACTION_SELECT_ALL] = createReducerSelectAll;
reducerMap[ACTION_TRIM] = createReducerTrim;
reducerMap[ACTION_TOGGLE_SELECT_ITEM] = createReducerToggleSelectItem;
reducerMap[ACTION_CLEAR] = createReducerClear;
reducerMap[ACTION_BULK] = createReducerBulk;
reducerMap[ACTION_REMOVE_TODO] = createReducerRemoveTodo;
reducerMap[ACTION_ADD_TODO_ITEM] = createReducerAddTodoItem;
reducerMap[ACTION_EDIT_TODO_ITEM] = createReducerEditItem;
reducerMap[ACTION_TRIGGER_EDIT_DUE] = createReducerTriggerEditDue;
reducerMap[ACTION_TRIGGER_EDIT_PRIORITY] = createReducerTriggerEditPriority;
reducerMap[ACTION_AFTER_LOGIN] = createReducerAfterLogin;
reducerMap[ACTION_ON_FIELDS_UPDATE] = createReducerOnFieldsUpdate;
reducerMap[ACTION_AFTER_TODO_SEARCH] = createReducerAfterTodoSearch;
reducerMap[ACTION_AFTER_TOGGLE_COMPLETED] = createReducerAfterToggleCompleted;
reducerMap[ACTION_AFTER_REMOVE_ITEMS] = createReducerAfterRemoveItems;
reducerMap[ACTION_AFTER_UPDATE_TODO] = createReducerAfterUpdateTodo;
reducerMap[ACTION_AFTER_QUICK_ADD] = createReducerAfterQuickAdd;
reducerMap[ACTION_AFTER_ADDITIONAL_LOGIN] = createReducerAfterAdditionalLogin;
reducerMap[ACTION_AFTER_LOGOUT_ADDITIONAL] = createReducerAfterLogoutAdditional;
reducerMap[ACTION_AFTER_BULK_UPDATE] = createReducerAfterBulkUpdate;
reducerMap[ACTION_CANCEL_HOT_EDIT] = createReducerActionCancelHotEdit;
reducerMap[ACTION_UPDATE_STORE_BULK_DATA] = createReducerUpdateStoreBulkData;
reducerMap[ACTION_AFTER_PRIORITY_UPDATE] = createReducerAfterPriorityUpdate;
reducerMap[ACTION_AFTER_DUE_UPDATE] = createReducerAfterDueDate;
reducerMap[ACTION_SEARCH_ITEM] = createReducerSearchItem;
reducerMap[ACTION_AFTER_ITEM_SEARCH] = createReducerAfterItemSearch;
reducerMap[ACTION_EXPAND_ITEM] = createReducerExpandItem;
reducerMap[ACTION_TOGGLE_SELECT_STORAGE_ITEM] = createReducerToggleSelectStorageItem;
reducerMap[ACTION_TOGGLE_SELECT_ALL_STORAGE_ITEMS] = createReducerToggleSelectAllStorageItems;
reducerMap[ACTION_TOGGLE_SELECT_ATTACHMENT] = createReducerToggleSelectAttachment;
reducerMap[ACTION_UNSELECT_ALL_ATTACHMENTS] = createReducerUnselectAllAttachments;
reducerMap[ACTION_REMOVE_STORAGE_ITEM] = createReducerRemoveStorageItem;
reducerMap[ACTION_AFTER_DELETE_STORAGE_ITEMS] = createReducerAfterDeleteStorageItems;
reducerMap[ACTION_REMOVE_ATTACHMENT] = createReducerRemoveAttachment;
reducerMap[ACTION_AFTER_REMOVE_ATTACHMENT] = createReducerAfterRemoveAttachment;
reducerMap[ACTION_EDIT_STORAGE_ITEM] = createReducerEditStorageItem;
reducerMap[ACTION_AFTER_UPDATE_STORAGE_ITEM] = createReducerAfterUpdateStorageItem;
reducerMap[ACTION_EDIT_ATTACHMENT] = createReducerEditAttachment;
reducerMap[ACTION_AFTER_UPDATE_ATTACHMENT] = createReducerAfterUpdateAttachment;
reducerMap[ACTION_CLEAR_ITEMS] = createReducerClearItems;
reducerMap[ACTION_REFRESH_STORAGE_ITEM] = createReducerRefreshStorageItem;
reducerMap[ACTION_EXPAND_ALL] = createReducerExpandAll;
reducerMap[ACTION_TRIM_ITEMS] = createReducerTrimItems;
reducerMap[ACTION_TOGGLE_SHOW_ADDED_UPDATED] = createReducerToggleShowAddedUpdated;
reducerMap[ACTION_AFTER_MULTIPLE_ADD] = createReducerAfterMultipleAdd;
reducerMap[ACTION_SHOW_HIDE_PROGRESS_BAR] = createReducerShowHideProgressBar;
reducerMap[ACTION_UPDATE_PROGRESS] = createReducerUpdateProgress;
reducerMap[ACTION_BULK_ADD_ATTACHMENTS] = createReducerBulkAddAttachment;



const emptyReducer = (store: Store | undefined, action: Action): Store => {
    console.log(`cannot find reducer for the action with the type: ${action.type}`);

    return store || createEmptyStore();
}

const centralReducer: Reducer<Store, Action> = (store: Store | undefined, action: Action): Store => {
    let res = emptyReducer;

    if (reducerMap.hasOwnProperty(action.type)) {
        res = reducerMap[action.type];
    }

    return res(store, action);
}

export default centralReducer;
