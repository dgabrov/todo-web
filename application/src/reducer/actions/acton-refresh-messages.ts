import {Action} from "redux";
import Store from "../../data/store/store";
import {ActionSendMessage} from "./action-send-message";
import MessageData from "../../data/value/message-data";
import {messageTTLMs} from "../../util/constants";

export const ACTION_REFRESH_MESSAGES = 'ACTION_REFRESH_MESSAGES';

export interface ActionRefreshMessages extends Action {
    type: string;
}

export const createActionRefreshMessages = (): ActionRefreshMessages => {
    return {
        type: ACTION_REFRESH_MESSAGES
    }
}

export const createReducerRefreshMessages = (store: Store|undefined, action: ActionSendMessage): Store => {
    const currentTime = new Date().getTime();

    const messages = store!!.messages.filter((message: MessageData) => {
        const messageTime = message.dateTriggered.getTime();

        // will filter the messages that were created under the messageTTLMs as configured
        return (currentTime - messageTime) <= messageTTLMs;
    });

    return {...store!!, ...{messages}};
}
