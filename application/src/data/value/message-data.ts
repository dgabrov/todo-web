export default interface MessageData {
    id: string; // some uuid would do
    error: boolean;
    message: string;
    dateTriggered: Date;
}
