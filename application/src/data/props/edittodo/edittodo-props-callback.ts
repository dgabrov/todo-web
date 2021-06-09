import EditTodoData from "../../value/edit-todo-data";

export default interface EditTodoPropsCallback {
    submit(data: EditTodoData): void;

    cancel(): void;
}