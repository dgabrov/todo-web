import BulkIdsData from "../../value/bulk-ids-data";
import BulkData from "../../value/bulk-data";

export default interface BulkPropsCallback {
    submit(data: BulkIdsData) : void;

    cancel() : void;

    onUpdateBulkData(data: BulkData): void;
}