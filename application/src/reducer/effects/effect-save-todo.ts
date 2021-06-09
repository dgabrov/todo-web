import EditTodoData from "../../data/value/edit-todo-data";
import TodoData from "../../data/value/todo-data";
import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {convertTodoData} from "../../util/util-ui-functions";
import {getTodo, updateTodo} from "../../service/server";
import {createActionAfterUpdateTodo} from "../actions/action-after-update-todo";

const processEffectSaveTodo = async(dispatch: any, getStore:any, data: EditTodoData) : Promise<number> => {
    const todoData: TodoData = convertTodoData(data);

    await updateTodo(data.adding, todoData);

    const updatedTodoData = await getTodo(todoData.todoItemId);

    dispatch(createActionAfterUpdateTodo(data.adding, updatedTodoData!!));

    return 0;
}

export const createEffectSaveTodo = (data: EditTodoData) => {
    return (dispatch: any, getStore: any) => {
        processEffectSaveTodo(dispatch, getStore, data)
            .then(()=>{})
            .catch((err)=>{dispatch(createActionSendMessage(true, processError(err)))});
    }
}
