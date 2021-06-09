import PersonData from "../../value/person-data";
import MessageData from "../../value/message-data";

export default interface HeaderPropsData {
    loggedIn: boolean;
    persons: PersonData[];
    messages: MessageData[];
}
