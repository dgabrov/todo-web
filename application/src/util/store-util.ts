import Store from "../data/store/store";
import TodoData from "../data/value/todo-data";
import PersonData from "../data/value/person-data";
import {AttachmentData} from "../data/item/attachment-data";
import {CompleteItemData} from "../data/item/complete-item-data";

export const getPersonsObject = (persons: PersonData[]) : {[key: string] : PersonData} => {
    const res: { [key: string]: PersonData; } = {};

    persons.forEach((person) => {
        res[person.personId] = person;
    });

    return res;
}

export const getKeyObject = (selected: string[]) : {[key: string] : string} => {
    const res: { [key: string]: string; } = {};

    selected.forEach((item) => {
        res[item] = ""
    });

    return res;
}

export const getSelectedTodo = (store: Store) : TodoData[] => {
    const selectedObject = getKeyObject(store.selected);

    return store.todo.filter((todoItem: TodoData) => {
        const todoItemId = todoItem.todoItemId;

        return selectedObject.hasOwnProperty(todoItemId);
    });
}

export const processError = (err: any) : string => {
    let res: string = 'unkonwn error';

    if (err) {
        if (err.message) {
            res = err.message;
        }
        else {
            res = JSON.stringify(err);
        }
    }

    return res;
}

export const findAttachmentById = (store: Store, attachmentId: string) : AttachmentData|null => {
    let res: AttachmentData|null = null;

    store.items.items.forEach((item) => {
        item.attachments.forEach((attachment) => {
            if (attachment.attachmentId === attachmentId) {
                res = attachment;
            }
        })
    })

    return res;
}

export const findItemById = (store: Store, itemId: string) : CompleteItemData|null => {
    let res: CompleteItemData|null = null;

    const items = store.items.items.filter((item) => {
        return item.itemId === itemId;
    });

    if (items.length > 0) {
        res = items[0];
    }

    return res;
}
