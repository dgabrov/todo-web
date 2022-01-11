import AddTodoData from "../../value/add-todo-data";

export default interface TodoPropsCallback {
    remove(): void;

    bulk(): void;

    add(): void;

    triggerSearch(): void;

    searchClick(newSearchString: string): void;

    current(): void;

    future(): void;

    trim(): void;

    clear(): void;

    selectAll(state: boolean): void;

    toggleSelectItem(id: string): void;

    editItem(id: string): void;

    onFieldsUpdate(data: AddTodoData): void;

    toggleCompleted(todoId: string): void;

    triggerEditPriority(todoId: string): void;

    triggerEditDue(todoId: string): void;

    onQuickAdd() : void;

    onEditPriorityCancel() : void;

    saveItemPriority(todoItemID: string, value : string): void;

    onEditDueCancel() : void;

    saveDuePriority(todoItemId: string, value: string) : void;

    onToggleShowAddedUpdated(): void;
}

