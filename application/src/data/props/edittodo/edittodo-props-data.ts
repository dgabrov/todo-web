import PersonData from "../../value/person-data";
import EditTodoData from "../../value/edit-todo-data";

export default interface EditTodoPropsData extends EditTodoData {
    persons: PersonData[];
}
