import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import Store from "../../data/store/store";
import TodoPropsBaseData from "../../data/props/todo/todo-props-base-data";
import EditTodoData from "../../data/value/edit-todo-data";
import {v4} from 'uuid';
import {convertTodoData, parseDate, parseNumber} from "../../util/util-ui-functions";
import TodoData from "../../data/value/todo-data";
import {getTodo, multipleAddTodo, updateTodo} from "../../service/server";
import {createActionAfterQuickAdd} from "../actions/action-after-quick-add";
import {MultipleTodoData} from "../../data/value/multiple-todo-data";
import {createActionAfterMultipleAdd} from "../actions/action-after-multiple-add";

const processEffectQuickAddData = async (dispatch: any, getStore: any) : Promise<number> => {
    try {
        const store = getStore() as Store;
        const details : TodoPropsBaseData = store.todoDetails;

        const editTodo: EditTodoData = {
            personId: details.personId,
            projectCd: details.project,
            contextCd: details.context,
            comments: details.comments,
            completed: false,
            todoItemId: v4(),
            priority: details.priority,
            adding: true,
            due: details.due
        }

        if (details.multiline === true) {
            // get the comments, split it by new line, filter out the rows that are not empty
            const comments: string[] = editTodo.comments
                .split('\n')
                .map((item) => {return item.trim()})
                .filter((row) => {return row.length > 0;});

            // assemble the value object
            const data: MultipleTodoData = {
                personId: editTodo.personId,
                comments: comments,
                due: parseDate(editTodo.due),
                priority: parseNumber(editTodo.priority),
                contextCd: editTodo.contextCd,
                projectCd: editTodo.projectCd
            }

            // send the request
            const todoItems = await multipleAddTodo(data);

            // in case all good, send an action
            dispatch(createActionAfterMultipleAdd(todoItems));

        } else {
            const todoData: TodoData = convertTodoData(editTodo);

            await updateTodo(true, todoData);
            const updatedTodoData = await getTodo(todoData.todoItemId);

            dispatch(createActionAfterQuickAdd(updatedTodoData!!));
        }
    }
    catch(err){
        const triggerableError = processError(err);

        dispatch(createActionSendMessage(true, triggerableError));
    }

    return 0;
}

export const createEffectQuickAddData = () => {
    return (dispatch: any, getStore: any) => {
        processEffectQuickAddData(dispatch, getStore)
            .then(()=>{})
            .catch(()=>{});
    }
}
