import {TokenPersonData} from "../data/server-data/token-person-data";
import LoginData from "../data/value/login-data";
import PersonData from "../data/value/person-data";
import TodoData from "../data/value/todo-data";
import {CompletedData} from "../data/server-data/completed-data";
import {BulkUpdateData} from "../data/value/bulk-update-data";
import {getConfig, getToken} from "../data/config/config-accessor";
import {ConfigData} from "../data/config/config-data";
import {SearchServerData} from "../data/search/search-server-data";
import {CompleteItemData} from "../data/item/complete-item-data";
import {SearchData} from "../data/search/search-data";
import {ItemData} from "../data/item/item-data";
import {AttachmentData} from "../data/item/attachment-data";
import {MultipleTodoData} from "../data/value/multiple-todo-data";
import axios from "axios";
import UpdateUploadData from "../data/value/update-upload-data";
import {PasswordBundle, PasswordData, PasswordInputData} from "../data/value/pwd-data";

const proceedFetch = async (url: string, body: string|undefined, isPost: boolean, addToken: boolean, method?: 'get'|'post'|'put'): Promise<any> => {
    const config: ConfigData = await getConfig();

    const response = await fetch(config.apiUrl + url, buildConfig(isPost, addToken, body, method));
    const data = await response.json();

    if (response.status >= 400) {
        throw data;
    }

    return data;
}

const buildConfig = (post: boolean, addToken: boolean, body: string|undefined, method?: 'get'|'post'|'put') : RequestInit => {
    const headers: HeadersInit = new Headers();
    headers.append('content-type', 'application/json');
    if (addToken) {
        console.log(`added token ${getToken()}`)
        headers.append('authorization', `bearer ${getToken()}`);
    }

    const res: RequestInit = {
        headers,
        method: method ?? (post ? 'post' : 'get')
    }

    if (body !== undefined) {
        res.body = body;

    }

    return res;
}

/*
    const config: ConfigData = getConfig();

    const response = await fetch(config.apiUrl + url, buildConfig(isPost, addToken, body));
    const data = await response.json();

    if (response.status >= 400) {
        throw data;
    }

    return data;

 */
export const updateAttachment = async (adding: boolean, attachment: AttachmentData, file: any|null, callback: (upload: UpdateUploadData)=> void|undefined): Promise<AttachmentData> => {
    const config: ConfigData = await getConfig();

    const data = new FormData();
    if (file !== null) {
        data.append('file', file);
    }
    data.append('data', JSON.stringify({adding, attachment}));
    const url = config.apiUrl + '/updateAttachment';

    const response = await axios.post(url, data,
        {
            headers: {
                Authorization: `bearer ${getToken()}`
            },
            onUploadProgress: (event) => {
            if (event && event.total && event.loaded && typeof event.total === 'number' && typeof event.loaded === 'number' && callback) {
                let total = event.total as number;
                let loaded = event.loaded as number;

                // prepare the upload data
                let data : UpdateUploadData = {
                    total, loaded
                }

                // invoke the callback for the data
                callback(data);
            }
        }});
    const dt = await response.data;

    if (response.status >= 400) {
        throw dt;
    }

    return dt;
};

export const updateStorageItem = async (adding: boolean, item: ItemData) : Promise<ItemData> => {
    return await proceedFetch('/updateItem', JSON.stringify({adding, item}), true, true);
}

export const deleteAttachments = async(ids: string[]) : Promise<boolean> => {
    return await proceedFetch('/removeAttachment', JSON.stringify({ids}), true, true);
}

export const deleteStorageItems = async(ids: string[]) : Promise<boolean> => {
    return await proceedFetch('/removeItem', JSON.stringify({ids}), true, true);
}

export const searchItems = async(search: string) : Promise<CompleteItemData[]> => {
    const searchData: SearchData = {search};
    return await proceedFetch('/searchItem', JSON.stringify(searchData), true, true);
}

export const getFlaggedItems = async() : Promise<CompleteItemData[]> => {
    return await proceedFetch('/flaggedItems', undefined, false, true);
}

export const addLogin = async (loginData: LoginData) : Promise<PersonData> => {
    return await proceedFetch('/addLogin', JSON.stringify(loginData), true, true);
}

export const logoutAdditional = async (personId: string) : Promise<number> => {
    const data = {personId};
    const body = JSON.stringify(data);

    return await proceedFetch('/removeLogin', body, true, true);
}

export const login = async (loginData: LoginData) : Promise<TokenPersonData> => {
    return await proceedFetch('/login', JSON.stringify(loginData), true, false);
}

export const search = async (search: SearchServerData) : Promise<TodoData[]> => {
    const body: string = JSON.stringify(search);

    return await proceedFetch('/search', body, true, true);
}

export const updatePriority = async (todoItemId: string, priority: number) : Promise<boolean> =>  {
    const data = {todoItemId, priority};
    const body = JSON.stringify(data);

    return await proceedFetch('/updatePriority', body, true, true);
}

export const toggleCompleted = async (todoItemId: string) : Promise<CompletedData> => {
    const body = JSON.stringify({todoItemId});

    return await proceedFetch('/toggleCompleted', body, true, true);
}

export const removeItems = async (ids: string[]) : Promise<boolean> => {
    const body = JSON.stringify({ids});

    return await proceedFetch('/removeTodo', body, true, true);
}

export const logout = async () : Promise<boolean> => {
    const body = JSON.stringify({});

    return await proceedFetch('/logout', body, true, true);
}

export const updateTodo = async (adding: boolean, todo: TodoData) : Promise<number> => {
    const body = JSON.stringify({adding, todo});

    return await proceedFetch('/updateTodo', body, true, true);
}

export const switchSeqno = async (attId: string, otherAttId: string) : Promise<CompleteItemData> => {
    const body = JSON.stringify([attId, otherAttId]);

    return await proceedFetch('/switchSeqno', body, true, true);
}

export const getTodo = async(todoItemId: string) : Promise<TodoData|null> => {
    const body = JSON.stringify({todoItemId});

    const data = await proceedFetch('/retrieveTodo', body, true, true);
    return data.todo;
}

export const multipleAddTodo = async (data: MultipleTodoData) : Promise<TodoData[]> => {
    const body = JSON.stringify(data);
    const array = await proceedFetch('/multipleTodo', body, true, true);

    return array as TodoData[];
}

export const updateBulkData = async (data: BulkUpdateData) : Promise<TodoData[]> => {
    const body = JSON.stringify(data);

    return await proceedFetch('/bulkUpdate', body, true, true);
}

export const updateDue = async (todoItemId: string, due: Date|null): Promise<boolean> => {
    const body = JSON.stringify({todoItemId, due});

    return await proceedFetch('/updateDue', body, true, true);
}

export const addBulkAttachment = async (itemId: string, name: string, files: any[], callback: (upload: UpdateUploadData) => void) : Promise<AttachmentData[]> => {
    const config: ConfigData = await getConfig();

    if(! (files && files.length && files.length > 0)){
        throw new Error("Please provide at least one file to upload in bulk");
    }

    const formData = new FormData();

    // attach the files to the formdata
    const nr = files.length;
    for (let i = 0; i < nr; i++) {
        formData.append('file', files[i]);
    }

    // one payload with the item information
    formData.append('data', JSON.stringify({itemId, name}));

    const url = config.apiUrl + '/addBulkAttachment';

    let authHeader = 'bearer ' + getToken();

    const response = await axios.post(url, formData,
        {
            onUploadProgress: (event) => {
                if (event && event.total && event.loaded && typeof event.total === 'number' && typeof event.loaded === 'number' && callback) {
                    let total = event.total as number;
                    let loaded = event.loaded as number;

                    // prepare the upload data
                    let data : UpdateUploadData = {
                        total, loaded
                    }

                    // invoke the callback for the data
                    callback(data);
                }
            }, headers : {authorization: authHeader}});

    const dt = await response.data;

    if (response.status >= 400) {
        throw dt;
    }

    return dt;
}

export const getPasswordData = async (personId: string, password: string): Promise<PasswordData> => {
    const inputData: PasswordInputData = {personId, password};

    return await proceedFetch('/password', JSON.stringify(inputData), true, true);
}

export const setPasswordData = async (personId: string, password: string, payload: PasswordData): Promise<void> => {
    const bundle: PasswordBundle = {personId, password, payload};

    await proceedFetch('/password', JSON.stringify(bundle), true, true, 'put');
}
