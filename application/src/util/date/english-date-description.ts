import {IDateDescription} from "./i-date-description";

export class EnglishDateDescription implements IDateDescription {
    private readonly weekdayBundle : {[index:number] : string[]};

    public constructor() {
        this.weekdayBundle = {
            0 : ['sun', 'sunday'],
            1 : ['mon', 'monday'],
            2 : ['tue', 'tuesday'],
            3 : ['wed', 'wednesday'],
            4 : ['thu', 'thursday'],
            5 : ['fri', 'friday'],
            6 : ['sat', 'saturday']
        };
    }

    getDay(): string[] {
        return ['day', 'days'];
    }

    getErrorMessage(): string {
        return 'Cannot parse date: ';
    }

    getFormats(): string[] {
        return ['MMMDD,YYYY', 'MMMDD, YYYY', 'MMMDD', 'MMM DD', 'MMM DD YYYY h:mm:ss'];
    }

    getMonth(): string[] {
        return ['month', 'months'];
    }

    getNext(): string[] {
        return ['next'];
    }

    getPrevious(): string[] {
        return ['prev', 'previous'];
    }

    getToday(): string[] {
        return ['tod', 'today'];
    }

    getTomorrow(): string[] {
        return ['tom', 'tomorrow'];
    }

    getWeek(): string[] {
        return ['week', 'weeks'];
    }

    getWeekDay(nr: number): string[] {
        if (! this.weekdayBundle.hasOwnProperty(nr)) {
            throw new Error(`There is no weekday associated with the key: ${nr}; number 0 - 6 required`);
        }

        return this.weekdayBundle[nr];
    }

    getYear(): string[] {
        return ['year', 'years'];
    }

    getYesterday(): string[] {
        return ['yes', 'yesterday'];
    }

}
