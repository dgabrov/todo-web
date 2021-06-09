import {Action} from "redux";
import PersonData from "../../data/value/person-data";
import Store from "../../data/store/store";

export const ACTION_AFTER_ADDITIONAL_LOGIN = 'ACTION_AFTER_ADDITIONAL_LOGIN';


export interface ActionAfterAdditionalLogin extends Action {
    type: string;
    person: PersonData
}

export const createActionAfterAdditionalLogin = (person: PersonData): ActionAfterAdditionalLogin => {
    return {
        type: ACTION_AFTER_ADDITIONAL_LOGIN,
        person
    }
}

export const createReducerAfterAdditionalLogin = (store: Store | undefined, action: ActionAfterAdditionalLogin): Store => {
    const persons = store!!.persons.slice();
    const newPerson = action.person;

    persons.push(newPerson);

    return {...store!!, ...{persons}};
}
