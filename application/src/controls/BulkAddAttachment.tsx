import React from "react";
import {BulkAddAttachmentProps} from "../data/props/bulkaddattachment/bulk-add-attachment-props";
import Store from "../data/store/store";
import {BulkAddAttachmentPropsData} from "../data/props/bulkaddattachment/bulk-add-attachment-props-data";
import {BulkAddAttachmentPropsCallback} from "../data/props/bulkaddattachment/bulk-add-attachment-props-callback";
import {connect} from "react-redux";
import {createActionSetLocation} from "../reducer/actions/action-set-location";
import AppState from "../data/value/app-state";
import {createEffectBulkAddAttachment} from "../reducer/effects/effect-bulk-add-attachment";


function calculateProgress(loaded: number, total: number): string {
    let res: string = "0";

    if (total !== 0) {
        const percent = loaded / total * 100;

        // format it into the result
        res = percent.toFixed(2);
    }

    return res;
}

const BulkAddAttachment = (props: BulkAddAttachmentProps) => {
    let fileField: any;
    let nameField: any;

    function submit(event: any) {
        // the submit is done with the description, not with the item name
        props.submit(props.itemId, nameField.value, fileField.files);
    }

    function cancel(event: any) {
        props.cancel();
    }

    const progress = calculateProgress(props.loaded, props.total);

    return (
        <div className="container-fluid">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>Bulk Add Attachments</h1>
                    </div>
                    <div className="col-12 form-group">
                        Item: <strong>{props.name}</strong>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="iddescripotion">Description</label>
                        <input className="form-control" type="text" id="iddescription" ref={(field) => {nameField = field}}/>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idfiles">Files</label>
                        <input className="form-control" type="file" id="idfiles" multiple={true} ref={(field) => {fileField = field}}/>
                    </div>
                    <div className="col-12 form-group">
                        Progress: <strong>{progress}%</strong>
                    </div>
                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={submit}>Submit</button>
                        <button type="submit" className="btn btn-primary border" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

const storeToProps = (store: Store): BulkAddAttachmentPropsData => {
    let bulkAddAttachmentStore = store.bulkAddAttachment;

    return {
        itemId: bulkAddAttachmentStore.itemId,
        name: bulkAddAttachmentStore.name,
        loaded: bulkAddAttachmentStore.loaded,
        total: bulkAddAttachmentStore.total
    }
}

const dispatch = (dispatch: any): BulkAddAttachmentPropsCallback => {
    return {
        cancel: () => {
            dispatch(createActionSetLocation(AppState.items));
        },
        submit: (itemId: string, name: string, files: any[]) => {
            dispatch(createEffectBulkAddAttachment(itemId, name, files));
        }
    }
}

export default connect(storeToProps, dispatch)(BulkAddAttachment);
