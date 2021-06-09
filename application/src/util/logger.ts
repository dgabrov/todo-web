const isLogging: boolean = false;

export const log = (message: string) : void => {
    if (isLogging) {
        console.log(message);
    }
}
