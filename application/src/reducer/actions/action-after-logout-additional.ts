import {Action} from "redux";
import Store from "../../data/store/store";
import {getKeyObject} from "../../util/store-util";

export const ACTION_AFTER_LOGOUT_ADDITIONAL = 'ACTION_AFTER_LOGOUT_ADDITIONAL';


export interface ActionAfterLogoutAdditional extends Action {
    type: string;
    personId: string;
}

export const createActionAfterLogoutAdditional = (personId: string): ActionAfterLogoutAdditional => {
    return {
        type: ACTION_AFTER_LOGOUT_ADDITIONAL,
        personId
    }
}

export const createReducerAfterLogoutAdditional = (store: Store | undefined, action: ActionAfterLogoutAdditional): Store => {
    const personId: string = action.personId;

    // remove it from collection
    const persons = store!!.persons.slice().filter((person) => {
        return personId !== person.personId
    });

    // remove it from the todolist
    const todo = store!!.todo.slice()
        .filter((item) => {
            return item.personId !== personId
        });

    // if there are selected items removed from todolist then remove them from the selection
    const todoObj = getKeyObject(todo.map((todo) => {return todo.todoItemId}));
    const selected = store!!.selected.filter((id) => {return todoObj.hasOwnProperty(id)});

    // remove it from the item list
    const storeItemData = store!!.items;
    const newItems = storeItemData.items.filter((item) => {
        const itemPersonId = item.personId;
        return itemPersonId !== personId; // the item person id is different from the one that has logged out
    });

    // too much work, will deselect all the items
    const newStoreItemData = {...storeItemData, ...{items: newItems, selected: {}, attachmentSelected: {}, expanded: {}}}

    // also if there are items selected in the item list, take care of them


    return {...store!!, ...{todo, selected, persons, items: newStoreItemData}};
}
