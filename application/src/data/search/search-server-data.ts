import {IntervalDueData} from "./interval-due-data";

export interface SearchServerData {
    completed: boolean|undefined;
    context: string[];
    project: string[];
    login: string[];
    general: string[];

    dueNull: boolean;
    dueInterval: IntervalDueData[];
}
