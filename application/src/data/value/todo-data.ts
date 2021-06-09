export default interface TodoData {
    todoItemId: string;
    personId: string;
    comments: string;
    projectCd: string;
    contextCd: string;
    priority: number;
    due: Date|null;
    added: Date;
    updated: Date;
    completed: boolean;
}
