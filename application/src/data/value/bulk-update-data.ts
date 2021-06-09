export interface BulkUpdateData {
    todoIds: string[];

    selectedOwner: boolean;
    selectedContext: boolean;
    selectedProject: boolean;
    selectedDue: boolean;

    selectedPriority: boolean;
    ownerId: string;
    context: string;
    project: string;

    due: Date|null;
    priority: number;
}