import {Action} from "redux";
import Store from "../../data/store/store";
import TodoData from "../../data/value/todo-data";
import MessageData from "../../data/value/message-data";
import {createMessageData} from "./action-send-message";
import EditTodoData from "../../data/value/edit-todo-data";
import {formatDate} from "../../util/util-ui-functions";
import AppState from "../../data/value/app-state";

export const ACTION_EDIT_TODO_ITEM = 'ACTION_EDIT_TODO_ITEM';


export interface ActionEditTodoItem extends Action {
    type: string;
    todoItemId: string;
}

export const createActionEditItem = (todoItemId: string): ActionEditTodoItem => {
    return {
        type: ACTION_EDIT_TODO_ITEM,
        todoItemId
    }
}

export const createReducerEditItem = (store: Store | undefined, action: ActionEditTodoItem): Store => {
    let newStore : Store;
    const todoItemId = action.todoItemId;

    // search for the todoItem with the given item Id
    const length = store!!.todo.length;
    let foundItem: TodoData|null = null;

    for (let i = 0; i < length; i++) {
        if (store!!.todo[i].todoItemId === todoItemId) {
            foundItem = store!!.todo[i];
            break;
        }
    }

    if (foundItem !== null) {
        const edit: EditTodoData = {
            adding: false,
            todoItemId: todoItemId,
            personId: foundItem.personId,
            due: formatDate(foundItem.due),
            priority: `${foundItem.priority}`,
            completed: foundItem.completed,
            comments: foundItem.comments,
            contextCd: foundItem.contextCd,
            projectCd: foundItem.projectCd
        }

        const state: AppState = AppState.editTodo;

        newStore = {...store!!, ...{edit, state}};
    }
    else {
        const message: MessageData = createMessageData(true, `for some reason cannot find the todo item with id: ${todoItemId}`);
        const messages = store!!.messages.slice();
        messages.push(message);

        newStore = {...store!!, ...{messages}};
    }

    return newStore;

}
