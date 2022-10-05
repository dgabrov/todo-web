export interface BulkAddAttachmentPropsCallback {
    submit(itemId: string, name: string, files: any[]): void;

    cancel(): void;
}