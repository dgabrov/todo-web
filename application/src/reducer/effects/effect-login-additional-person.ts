import LoginData from "../../data/value/login-data";
import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import Store from "../../data/store/store";
import {addLogin} from "../../service/server";
import PersonData from "../../data/value/person-data";
import {createActionAfterAdditionalLogin} from "../actions/action-after-additional-login";

const processEffectLoginAdditionalPerson = async (dispatch: any, getStore : any, data: LoginData): Promise<number> => {

    try {
        // see if it is not within already logged in persons
        const store: Store = getStore();
        const loginName = data.login;

        const filtered = store.persons.filter((person) => person.login === loginName);
        if (filtered.length > 0) {
            throw new Error(`Sorry, but you are already logged in as ${loginName}`);
        }

        // if all right, add a new person to the list of persons logged in and proceed
        const person: PersonData = await addLogin(data);

        // send action for additional login
        dispatch(createActionAfterAdditionalLogin(person));
    }
    catch(err){
        let errorMessage = processError(err);
        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectLoginAdditionalPerson = (data: LoginData) => {
    return (dispatch: any, getStore: any) => {
        processEffectLoginAdditionalPerson(dispatch, getStore, data)
            .then(()=>{})
            .catch(()=>{});
    }
}
