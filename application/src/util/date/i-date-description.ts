export interface IDateDescription {
    getFormats: () => string[];

    getTomorrow: () => string[];
    getYesterday: () => string[];
    getToday: () => string[];

    getDay: () => string[];
    getWeek: () => string[];
    getMonth: () => string[];
    getYear: () => string[];

    getNext: () => string[];
    getPrevious: () => string[];

    getErrorMessage: () => string;

    /**
     * nr is one based number that shows week day 0 is Sunday
     */
    getWeekDay: (nr: number) => string[];
}
