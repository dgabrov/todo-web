import moment from 'moment-timezone';

import {EnglishDateDescription} from "./english-date-description";
import {IDateDescription} from "./i-date-description";
import {timeZone} from "../constants";
import {log} from "../logger";

export class DateParser {
    private description: IDateDescription;

    public constructor(des: IDateDescription = new EnglishDateDescription()) {
        this.description = des;
    }

    private parseFormats = (strDate: string) : Date|null => {
        let res = null;

        try {
            const formats = this.description.getFormats();

            let parsedMoment = moment.tz(strDate, formats, timeZone);

            if (parsedMoment.isValid()) {
                res = parsedMoment.toDate();
            }
        }
        catch (e) {
            // no implementation
        }

        return res;
    }

    private isToday = (strDt: string) : boolean => {
        return this.description.getToday().includes(strDt);
    }

    private isYesterday = (strDt: string) : boolean => {
        return this.description.getYesterday().includes(strDt);
    }

    private isTomorrow = (strDt: string) : boolean => {
        return this.description.getTomorrow().includes(strDt);
    }

    private parseImmediate = (strDate: string) : Date|null => {
        let res = null;

        let strDt : string = strDate.trim().toLowerCase();

        if(this.isToday(strDt)){
            res = new Date();
        }
        else if(this.isTomorrow(strDt)){
            res = moment().add(1, 'days').toDate();
        }
        else if(this.isYesterday(strDt)){
            res = moment().add(-1, 'days').toDate();
        }

        return res;
    }

    private isDay = (str: string) : boolean => {
        return this.description.getDay().includes(str);
    }

    private isWeek = (str: string) : boolean => {
        return this.description.getWeek().includes(str);
    }

    private isMonth = (str: string) : boolean => {
        return this.description.getMonth().includes(str);
    }

    private isYear = (str: string) : boolean => {
        return this.description.getYear().includes(str);
    }

    private processSplit = (str: string) : string[] => {
        return str
            .split(" ")
            .filter((item) => {return item.trim().length > 0});
    }

    private parsePlus = (strDate: string): Date|null => {
        let res = null;

        // two words, first starts with + and it is a number and the second is valid day, week, month, year;
        let split: string[] = this.processSplit(strDate);

        if (split.length === 2) {
            let first: string = split[0];
            let second: string = split[1];

            const converted = Number(first);

            if (! isNaN(converted)) {
                let change: number = converted;

                second = second.trim().toLowerCase();

                if (this.isDay(second)) {
                    res = moment().add(change, 'days').toDate();
                }
                else if (this.isWeek(second)) {
                    res = moment().add(change, 'weeks').toDate();
                }
                else if (this.isMonth(second)) {
                    res = moment().add(change, 'months').toDate();
                }
                else if (this.isYear(second)) {
                    res = moment().add(change, 'years').toDate();
                }
            }
        }

        return res;
    }

    private parseNext = (strDate: string): Date|null => {
        let res = null;

        let parts: string[] = this.processSplit(strDate);
        if (parts.length > 1) {
            const first: string = parts[0].trim();

            let adding: number = 0;

            if (this.description.getNext().includes(first)) {
                adding = 1;
            }
            else if (this.description.getPrevious().includes(first)) {
                adding = -1;
            }

            if (adding !== 0) {
                // next should be either day or week etc
                const second: string = parts[1].trim();

                if (this.isDay(second)) {
                    res = moment().add(adding, "days").toDate();
                }
                else if (this.isWeek(second)) {
                    res = moment().add(adding, "weeks").toDate();
                }
                else if (this.isMonth(second)) {
                    res = moment().add(adding, "months").toDate();
                }
                else if (this.isYear(second)) {
                    res = moment().add(adding, "years").toDate();
                }
            }
        }

        return res;
    }

    private parseWeekDay = (strDate: string) : Date|null => {
        let res = null;

        // first establish the day of the week depending on the entry
        let dayOfWeek = -1;
        const prep = strDate.trim().toLowerCase();

        for (let i = 0; i < 7; i++) {
            const names: string[] = this.description.getWeekDay(i);

            if (names.includes(prep)) {
                dayOfWeek = i;

                break;
            }
        }

        // if the day of week (zero based is correct), then determine the closest date (which is not current date)
        // which is like that

        if (dayOfWeek >= 0) {
            let startDate = new Date();

            for (let i = 0; i < 7; i++) {
                startDate = moment(startDate).add(1, 'days').toDate();

                let day = startDate.getDay();

                if (day === dayOfWeek) {
                    res = startDate;

                    break;
                }
            }
        }

        return res;
    }

    private truncateDate = (date: Date|null) : Date|null => {
        let res = null;

        if (date) {
            res = new Date(date.toDateString());
        }

        return res;
    }

    public parseDate = (strDate : string|null, truncate: boolean = true) : Date|null => {
        let res = null;

        if (strDate != null) {
            let trimmed = strDate.trim();

            if (trimmed.length > 0) {
                res = this.parseFormats(trimmed);

                if(res == null){
                    res = this.parseImmediate(trimmed);
                }

                if(res == null){
                    res = this.parsePlus(trimmed);
                }

                if(res == null){
                    res = this.parseNext(trimmed);
                }

                if(res == null){
                    res = this.parseWeekDay(trimmed);
                }

                if(res == null){
                    this.throwError(trimmed);
                }

                if(truncate){
                    res = this.truncateDate(res);
                }
            }
        }

        log(`parsing date: ${strDate} with truncate: ${truncate} and the result is this one: ${res}`);

        return res;
    }

    private throwError = (text:string): never => {
        throw new Error(this.description.getErrorMessage() + text);
    }

}
