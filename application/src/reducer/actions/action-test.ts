import {Action} from "redux";
import Store from "../../data/store/store";
import createEmptyStore from "../../data/store/create-empty-store";

export const ACTION_TEST = "ACTION_TEST";

export interface ActionTest extends Action {
    type: string;
    message: string;
}

export const createActionTest = (message: string): ActionTest  => {
    return {
        type: ACTION_TEST,
        message
    }
}

export const createReducerTest = (store: Store | undefined, action: ActionTest): Store => {
    console.log(`writing the action test which is this one: ${JSON.stringify(action)}`);

    return store || createEmptyStore();
}