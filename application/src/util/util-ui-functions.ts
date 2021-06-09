import moment from 'moment-timezone';
import {FORMAT_DATE, timeZone} from "./constants";
import {DateParser} from "./date/date-parser";
import EditTodoData from "../data/value/edit-todo-data";
import TodoData from "../data/value/todo-data";
import BulkIdsData from "../data/value/bulk-ids-data";
import {BulkUpdateData} from "../data/value/bulk-update-data";
import React from "react";
import {log} from "./logger";

export const formatDate = (date: any) : string => {
    let res: string = "";

    if (! (date === null || date === undefined)) {
        res = moment(date).tz(timeZone).format(FORMAT_DATE);
    }

    log(`formatting the date: ${date} with the result: ${res} at the timezone: ${timeZone}`);
    return res;
}

export const parseDate = (strDate: string) : Date|null => {
    return new DateParser().parseDate(strDate, true);
}

export const parseNumber = (strNumber :string) : number => {
    let res : number = 0;

    if (strNumber.trim().length > 0) {
        res = parseInt(strNumber);

        if (isNaN(res)) {
            throw new Error(`cannot parse ${strNumber} to a valid number`);
        }
    }

    return res;
}

export const convertTodoData = (input: EditTodoData) : TodoData => {
    const dt = new Date();

    const priority = parseNumber(input.priority);
    const dueDate = parseDate(input.due);

    return {
        todoItemId: input.todoItemId,
        added: dt,
        priority: priority,
        due: dueDate,
        updated: dt,
        completed: input.completed,
        comments: input.comments,
        contextCd: input.contextCd,
        projectCd: input.projectCd,
        personId: input.personId
    }
}

export const convertBulkData = (input: BulkIdsData) : BulkUpdateData => {
    return {
        todoIds: input.todoIds,
        ownerId: input.ownerId,
        context: input.context,
        project: input.project,
        due: parseDate(input.due),
        priority: parseNumber(input.priority),
        selectedOwner: input.selectedOwner,
        selectedContext: input.selectedContext,
        selectedDue: input.selectedDue,
        selectedPriority: input.selectedPriority,
        selectedProject: input.selectedProject
    }
}

export const processKeyDown = (onEnter: ((ev?: any)=> any)|null, onCancel: (() => any)|null, ctrlOnEnter: boolean): (event : any) => void => {
    return (event: React.KeyboardEvent) => {
        let processed: boolean = false;

        if (event.key === 'Enter') {
            if (onEnter !== null) {
                if (ctrlOnEnter) {
                    if (event.ctrlKey) {
                        onEnter(event);
                        processed = true;
                    }
                }
                else {
                    onEnter(event);
                    processed = true;
                }
            }
        }
        else if (event.key === 'Escape') {
            if (onCancel !== null) {
                onCancel();
                processed = true;
            }
        }

        if (processed) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

export const setFocus = (element: any) => {
    const wasFocused = document.activeElement === element;

    // this ensures that the item will only be focused and selected first time - when it was not already focused and selected
    if (!wasFocused) {
        element.focus && element.focus();
        element.select && element.select();
    }
}
