import {Action} from "redux";
import Store from "../../data/store/store";
import {v4 as uuid} from 'uuid';
import MessageData from "../../data/value/message-data";

export const ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE';

export interface ActionSendMessage extends Action {
    type: string;
    error: boolean;
    message: string;
}

export const createActionSendMessage = (error: boolean, message: string): ActionSendMessage => {
    return {
        type: ACTION_SEND_MESSAGE,
        error,
        message
    }
}

export const createReducerSendMessage = (store: Store | undefined, action: ActionSendMessage): Store => {
    const messages = store!!.messages.slice();
    const id = uuid();

    messages.push(
        {
            dateTriggered: new Date(),
            error: action.error,
            id: id,
            message: action.message
        }
    );

    return {...store!!, ...{messages}};
}

export const createMessageData = (error: boolean, message: string): MessageData => {
    const id = uuid();
    const dateTriggered = new Date();

    return {dateTriggered, error, id, message};
}