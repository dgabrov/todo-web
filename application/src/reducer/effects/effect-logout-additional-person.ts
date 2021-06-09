import {processError} from "../../util/store-util";
import {createActionSendMessage} from "../actions/action-send-message";
import Store from "../../data/store/store";
import {logoutAdditional} from "../../service/server";
import {createActionAfterLogoutAdditional} from "../actions/action-after-logout-additional";

const processEffectLogoutAdditionalPerson = async(dispatch: any, getStore: any, personId: string): Promise<number>  => {
    try {
        const store: Store = getStore();
        const persons = store.persons;

        if (persons.length < 2) {
            throw new Error('You cannot logout from the latest logged in user account; for that please click on logout on the header');
        }

        await logoutAdditional(personId);

        dispatch(createActionAfterLogoutAdditional(personId));
    }
    catch(err) {
        const errorMessage = processError(err);

        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectLogoutAdditionalPerson = (personId: string) => {
    return (dispatch: any, getStore: any) => {
        processEffectLogoutAdditionalPerson(dispatch, getStore, personId).then(()=>{}).catch(()=>{});
    }
}
