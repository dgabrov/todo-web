import React from 'react';
import {CdAttachmentProps} from "../../data/props/cdattachment/cd-attachment-props";
import {CdAttachmentPropsData} from "../../data/props/cdattachment/cd-attachment-props-data";
import Store from "../../data/store/store";
import {AttachmentData} from "../../data/item/attachment-data";
import {CdAttachmentPropsCallback} from "../../data/props/cdattachment/cd-attachment-props-callback";
import {connect} from "react-redux";
import {createActionSetLocation} from "../../reducer/actions/action-set-location";
import AppState from "../../data/value/app-state";
import {createEffectRemoveAttachments} from "../../reducer/effects/effect-remove-attachments";

const CdAttachment = (props: CdAttachmentProps) : any => {

    const items = props.attachments.map((attachment) => {
        return <li key={attachment.attachmentId}>{attachment.description} ({attachment.fileName})</li>;
    })

    return (
        <div className="container-fluid">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>Confirm Delete Attachments</h1>
                    </div>
                    <div className="col-12 form-group">
                        <div>Please confirm the deletion of the following attachments</div>
                        <div className="mt-2">
                            <ol>
                                {items}
                            </ol>
                        </div>
                    </div>
                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={props.submit}>Submit</button>
                        <button type="submit" className="btn btn-default border" onClick={props.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: Store) : CdAttachmentPropsData => {
    const attachments: AttachmentData[] = [];
    const sel = store.items.attachmentSelected;

    store.items.items.forEach((item) => {
        const att = item.attachments;

        att.forEach((attachment) => {
            const attachmentId = attachment.attachmentId;

            if (sel.hasOwnProperty(attachmentId)) {
                attachments.push(attachment);
            }
        })
    })

    return {
        attachments
    }
}

const dispatch = (dispatch: any): CdAttachmentPropsCallback => {
    return {
        cancel() {
            dispatch(createActionSetLocation(AppState.items));
        },
        submit() {
            dispatch(createEffectRemoveAttachments());
        }
    }
}

export default connect(storeToProps, dispatch)(CdAttachment);
