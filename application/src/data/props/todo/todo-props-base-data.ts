export default interface TodoPropsBaseData {
    search: string;
    personId: string;
    project: string;
    context: string;
    priority: string;
    due: string;
    comments: string;
    editDueId: string|null;
    editPriorityId: string|null;
}