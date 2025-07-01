import React, {useEffect, useState} from 'react';
import Store from "../../data/store/store";
import {connect} from "react-redux";
import {EditAttachmentPropsData} from "../../data/props/editattachment/edit-attachment-props-data";
import {EditAttachmentPropsCallback} from "../../data/props/editattachment/edit-attachment-props-callback";
import {EditAttachmentProps} from "../../data/props/editattachment/edit-attachment-props";
import {createActionSetLocation} from "../../reducer/actions/action-set-location";
import AppState from "../../data/value/app-state";
import {AttachmentData} from "../../data/item/attachment-data";
import {createEffectSaveAttachment} from "../../reducer/effects/effect-save-attachment";
import {findAttachmentById} from "../../util/store-util";
import {processKeyDown, setFocus} from "../../util/util-ui-functions";

const EditAttachment = (props : EditAttachmentProps) : any => {

    const adding = props.adding;
    const attachment = props.attachment;

    const [description, setDescription] = useState(attachment.description);
    let fileField: any;
    let descriptionField: any;

    useEffect(()=>{
        setFocus(descriptionField);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const submit = () => {
        const attach: AttachmentData = {...attachment};
        attach.description = description;

        props.submit(adding, attach, fileField.files);
    }

    const progressBar = [];
    if (props.showProgressBar) {

        // calculate the percentage for the upload status
        let progress = props.uploadProgress;
        const total = progress.total
        const loaded = progress.loaded
        let percent = 0;
        if (total !== 0) {
            percent = loaded / total * 100;
        }

        // now we format the percent with two decimals
        const formatted = percent.toFixed(2);

        progressBar.push(<div>Progress: <strong>{formatted}</strong></div>);
    }

    return (
        <div className="container-fluid" key={'12'}>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>{adding ? 'Add': 'Edit'} Attachment</h1>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idDescription">Description</label>
                        <input type="text" className="form-control"
                               id="idDescription" value={description}
                               onChange={(event) => {setDescription(event.target.value)}}
                               ref={(field) => {descriptionField = field}}
                               onKeyDown={processKeyDown(submit, props.cancel, false)}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idFile">File</label>
                        <input type="file" className="form-control"
                               id="idFile" ref={(field) => {fileField = field}}
                               onKeyDown={processKeyDown(submit, props.cancel, false)}
                        />
                    </div>

                    {progressBar}

                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={submit}>Submit</button>
                        <button type="submit" className="btn btn-default border" onClick={props.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: Store) : EditAttachmentPropsData => {
    const editAttachment = store.editAttachment;
    const adding = editAttachment.adding;
    const attachmentId = editAttachment.attachmentId;
    const itemId = editAttachment.itemId;

    const dt = new Date()
    let attachment: AttachmentData = {
            attachmentId,
            itemId: itemId,
            fileName: "",
            description: "",
            seqNo: 0,
            contentType: "",
            added: dt,
            updated: dt
        };

    if (! adding) {
        const attach = findAttachmentById(store, attachmentId);

        if (attach !== null) {
            attachment = {...attach}
        }
    }

    return {
        adding,
        attachment,
        showProgressBar: store.showProgressBar,
        uploadProgress: store.uploadProgress
    };
}

const dispatch = (dispatch : any) : EditAttachmentPropsCallback => {
    return {
        cancel() {
            dispatch(createActionSetLocation(AppState.items));
        },
        submit(adding, attachment, files) {
            dispatch(createEffectSaveAttachment(adding, attachment, files));
        }
    }
}

export default connect(storeToProps, dispatch)(EditAttachment);
