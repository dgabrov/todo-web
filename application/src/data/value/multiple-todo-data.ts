export interface MultipleTodoData {
    personId: string;
    comments: string[];
    projectCd: string;
    contextCd: string;
    priority: number;
    due: Date|null;
}
