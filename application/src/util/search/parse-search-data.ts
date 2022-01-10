import {DateParser} from "../date/date-parser";
import {SearchServerData} from "../../data/search/search-server-data";
import {IntervalDueData} from "../../data/search/interval-due-data";

const PREFIX_IS = "is:";
const IS_COMPLETED = "c";
const IS_PENDING = "p";

const PREFIX_DUE = "due:";
const PREFIX_PROJECT = "proj:";
const PREFIX_CONTEXT = "ctx:";
const PREFIX_LOGIN = 'login:';

const EMPTY_DUE_DATE = "none";

const processGeneral = (word: string, res: SearchServerData) => {
    res.general.push(word);
}

const processLogin = (word: string, res: SearchServerData) => {
    const str = word.substring(PREFIX_LOGIN.length);
    const arr: string[] = str.split(',');

    res.login.push(...arr);
}

const processProject = (word: string, res: SearchServerData) => {
    const str = word.substring(PREFIX_PROJECT.length);
    const arr: string[] = str.split(',');

    res.project.push(...arr);
}

const processContext = (word: string, res: SearchServerData) => {
    // first remove the prefix, then split by the comma and add to the context
    const str = word.substring(PREFIX_CONTEXT.length);
    const arr: string[] = str.split(',');

    // extend the array
    res.context.push(...arr);
}


const processDue = (word: string, res: SearchServerData) => {
    const str = word.substring(PREFIX_DUE.length);
    const arr : string[] = str.split(',');

    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let current = arr[i].trim();

        if (current === EMPTY_DUE_DATE) {
            res.dueNull = true;
        }
        else {
            if (current.indexOf("-") < 0) {
                current = current + "-";
            }

            const arr2 = current.split("-");

            let parser = new DateParser();

            let parsedStart : Date|null = parser.parseDate(arr2[0]);
            let parsedEnd : Date|null = null;

            if (arr2.length > 1) {
                parsedEnd = parser.parseDate(arr2[1]);
            }

            const interval : IntervalDueData = {
                startDate: parsedStart,
                endDate: parsedEnd
            }

            res.dueInterval.push(interval);
        }
    }
}


const processIs = (word: string, res: SearchServerData) => {
    const rest = word.substring(PREFIX_IS.length);
    if (rest === IS_PENDING) {
        res.completed = false;
    }
    else if(rest === IS_COMPLETED){
        res.completed = true;
    }
    else {
        // probably an error, but we add it to the general values
        res.general.push(word);
    }
}

export const parseSearchData = (input: string) : SearchServerData => {
    const res: SearchServerData = {
        context: [],
        dueInterval: [],
        dueNull: false,
        login: [],
        general: [],
        project: [],
        completed: undefined
    }

    // split by words
    const words: string[] = input.trim().split(' ');

    // for each word, see if it is completed, due, general, proj or ctx
    const nr: number = words.length;
    for (let i = 0; i < nr; i++) {
        const word = words[i];

        if (word.startsWith(PREFIX_IS)) {
            processIs(word, res);
        }
        else if(word.startsWith(PREFIX_LOGIN)){
            processLogin(word, res);
        }
        else if (word.startsWith(PREFIX_DUE)) {
            processDue(word, res);
        }
        else if (word.startsWith(PREFIX_CONTEXT)) {
            processContext(word, res);
        }
        else if (word.startsWith(PREFIX_PROJECT)) {
            processProject(word, res);
        }
        else {
            processGeneral(word, res);
        }
    }

    return res;
}

