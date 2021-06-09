import TodoData from "../../value/todo-data";
import PersonData from "../../value/person-data";
import TodoPropsBaseData from "./todo-props-base-data";

export default interface TodoPropsData extends TodoPropsBaseData {
    todoItems: TodoData[];
    persons: PersonData[];
    selected: string[];
    showAddedUpdated: boolean;
}
