export interface ItemsPropsCallback {
    searchItems() : void;
    toggleExpand(itemId: string) : void;

    expandAll() : void;
    trim() : void;

    toggleSelectAllItems(): void;
    toggleSelectStorageItem(itemId: string): void;

    addItem() : void;
    editItem(itemId: string) : void;
    removeItem() : void;

    editAttachment(attachmentId: string, itemId: string) : void;
    removeAttachment() : void;
    addAttachment(attachmentId: string, itemId: string) : void;
    unselectAttachments(itemId: string) : void;
    triggerSelectAttachment(attachmentId: string) : void;

    getFlaggedItems() : void;
    onSearchChange(search: string) : void;

    clear() : void;

    positionSeqNoAttachment(attId: string, otherAttId: string) : void;

}
