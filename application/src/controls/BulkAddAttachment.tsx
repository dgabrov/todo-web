import React from "react";
import {BulkAddAttachmentProps} from "../data/props/bulkaddattachment/bulk-add-attachment-props";
import Store from "../data/store/store";
import {BulkAddAttachmentPropsData} from "../data/props/bulkaddattachment/bulk-add-attachment-props-data";
import {BulkAddAttachmentPropsCallback} from "../data/props/bulkaddattachment/bulk-add-attachment-props-callback";
import {connect} from "react-redux";
import {createActionSetLocation} from "../reducer/actions/action-set-location";
import AppState from "../data/value/app-state";


const BulkAddAttachment = (props: BulkAddAttachmentProps) => {
    function submit(event: any) {
        props.submit();
    }

    function cancel(event: any) {
        props.cancel();
    }

    return (
        <div className="container-fluid">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <h1>Bulk Add Attachments</h1>
                    </div>
                <div className="row">
                    <div>Item: <strong>{props.name}</strong></div>
                </div>
                <div className="row">
                    <div><input type="file" multiple={true}/></div>
                </div>
                <div className="row">
                        <span>Progress: </span>
                        <span><strong>100%</strong></span>
                </div>
                <div className="row">
                        <button type="submit" className="btn btn-primary border" onClick={submit}>Submit</button>
                        <button type="submit" className="btn btn-primary border" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>

    );
}

const storeToProps = (store: Store): BulkAddAttachmentPropsData => {
    let bulkAddAttachmentStore = store.bulkAddAttachment;

    return {
        itemId: bulkAddAttachmentStore.itemId,
        name: bulkAddAttachmentStore.name
    }
}

const dispatch = (dispatch: any): BulkAddAttachmentPropsCallback => {
    return {
        cancel: () => {
            dispatch(createActionSetLocation(AppState.items));
        },
        submit: () => {
            console.log('submit goes here originales')
        }
    }
}

export default connect(storeToProps, dispatch)(BulkAddAttachment);
