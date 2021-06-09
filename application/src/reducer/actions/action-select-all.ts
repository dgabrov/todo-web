import {Action} from "redux";
import Store from "../../data/store/store";
import TodoData from "../../data/value/todo-data";

export const ACTION_SELECT_ALL = 'ACTION_SELECT_ALL';

export interface ActionSelectAll extends Action {
    type: string;
}

export const createActionSelectAll = (): ActionSelectAll => {
    return {
        type: ACTION_SELECT_ALL
    }
}

export const createReducerSelectAll = (store: Store | undefined, action: ActionSelectAll): Store => {
    const selected = store!!.selected;
    let newSelected: string[] = [];

    if (! (selected.length === store!!.todo.length)) {
        // some are not selected, will select all; if all selected, then will remain that none are selected
        newSelected = store!!.todo.map((todoItem: TodoData) => {
            return todoItem.todoItemId;
        })
    }

    // then proceed
    return {...store!!, ...{selected: newSelected}}
}
