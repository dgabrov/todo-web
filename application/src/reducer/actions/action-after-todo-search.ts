import {Action} from "redux";
import TodoData from "../../data/value/todo-data";
import Store from "../../data/store/store";

export const ACTION_AFTER_TODO_SEARCH = 'ACTION_AFTER_TODO_SEARCH';


export interface ActionAfterTodoSearch extends Action {
    type: string;
    items: TodoData[],
    text: string
}

export const createActionAfterTodoSearch = (items: TodoData[], text: string): ActionAfterTodoSearch => {
    return {
        type: ACTION_AFTER_TODO_SEARCH,
        items,
        text
    }
}

export const createReducerAfterTodoSearch = (store: Store | undefined, action: ActionAfterTodoSearch): Store => {
    const todo = action.items;

    // get the selected from the store and ensure only the ones in the list will remain in the selected items
    const todoIds: {[key: string]: string} = {};
    todo.forEach((item) => {
        todoIds[item.todoItemId] = "";
    });

    const selected = store!!.selected.filter((id) => {
        return todoIds.hasOwnProperty(id);
    });

    const todoDetails = {...store!!.todoDetails};
    todoDetails.search = action.text;
    todoDetails.editPriorityId = null;
    todoDetails.editDueId = null;

    return {...store!!, ...{todo, selected, todoDetails}};
}
