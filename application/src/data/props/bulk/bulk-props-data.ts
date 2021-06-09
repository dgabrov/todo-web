import TodoData from "../../value/todo-data";
import PersonData from "../../value/person-data";
import BulkData from "../../value/bulk-data";

export default interface BulkPropsData extends BulkData {
    todoItems: TodoData[];
    persons: PersonData[];
}
