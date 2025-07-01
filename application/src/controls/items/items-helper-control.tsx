import React from "react";
import {CompleteItemData} from "../../data/item/complete-item-data";
import PersonData from "../../data/value/person-data";
import {ItemsProps} from "../../data/props/items/items-props";
import {v4} from "uuid";
import {formatDate} from "../../util/util-ui-functions";
import {AttachmentData} from "../../data/item/attachment-data";
import {getLoadedUrl} from "../../data/config/config-accessor";

export const createEmptyResponseItems = () => {
    return (
        <tr key={'uniqueval'}>
            <td className="text-nowrap" colSpan={4}>&nbsp;</td>
            <td className="text-nowrap" colSpan={3}>No items...</td>
        </tr>
    );
}

export const createItemRow = (item: CompleteItemData, index: number, props: ItemsProps, persons: {[key: string] : PersonData}) => {
    const storeItemData = props.storeItemData;

    const selected = storeItemData.selected;
    const attSelected = storeItemData.attachmentSelected;
    const expanded = storeItemData.expanded;

    const triggerEditItem = (event: any) : void => {
        event.preventDefault();
        event.stopPropagation();

        props.editItem(item.itemId);
    }

    const toggleExpand = (event: any) : void => {
        event.preventDefault();
        event.stopPropagation();

        props.toggleExpand(item.itemId);
    }

    const toggleSelectStorageItem = (event: any) : void => {
        props.toggleSelectStorageItem(item.itemId);
    }

    const addAttachment = (event : any) : void => {
        event.preventDefault();
        event.stopPropagation();

        let newAttachmentId = v4();
        props.addAttachment(newAttachmentId, item.itemId);
    }

    const switchSequences = (up: boolean) => {
        // look for the first item that is selected
        const atts = item.attachments;
        const nr = atts.length;

        let firstSelected : AttachmentData|undefined;
        let index: number = -1;

        for (let i = 0; i < nr; i++) {
            const currentAttachment = atts[i];
            const attId = currentAttachment.attachmentId;

            if (attSelected.hasOwnProperty(attId)) {
                index = i;
                firstSelected = currentAttachment;

                break;
            }
        }

        if (firstSelected) {
            const nextIndex = up ? index - 1 : index + 1;

            if (nextIndex >= 0 && nextIndex < nr) {
                const otherAttachmentId = atts[nextIndex].attachmentId;

                props.positionSeqNoAttachment(firstSelected.attachmentId, otherAttachmentId);
            }
        }
    }

    const upAttachment = (event : any) : void => {
        event.preventDefault();
        event.stopPropagation();

        switchSequences(true);
    }

    const downAttachment = (event : any) : void => {
        event.preventDefault();
        event.stopPropagation();

        switchSequences(false);
    }

    const unselectAttachments = (event : any) : void => {
        event.preventDefault();
        event.stopPropagation();

        props.unselectAttachments(item.itemId);
    }

    const bulkAdd = (itemId: string, name: string) => {
        return (event: any) : void => {
            event.preventDefault();
            event.stopPropagation();

            // TODO put the props some stuff there
            props.bulkAdd(itemId, name);
        }
    }



    let login: string = 'not found';
    const personId = item.personId;

    if (persons.hasOwnProperty(personId)) {
        login = persons[personId].login;
    }

    const flaggedClass = item.flagged ?
        "text-nowrap font-weight-bold text-center text-success"
        : "text-nowrap font-weight-bold text-center text-danger";

    let expandedField = <div />

    let attachmentString = "none";
    let attachmentList = <div/>

    if (item.attachments.length > 0) {
        attachmentString = "";

        const apiUrl = getLoadedUrl();

        const attachFields: any = [];
        item.attachments.forEach((att) => {

            const attEdit = (event: any) => {
                event.preventDefault();
                event.stopPropagation();

                props.editAttachment(att.attachmentId, item.itemId);
            }

            const triggerSelectAttachment = (event : any) => {
                props.triggerSelectAttachment(att.attachmentId);
            }

            const attachmentUrl = `${apiUrl}/processDownload?id=${att.attachmentId}`

            attachFields.push(
                <li key={att.attachmentId}>
                    <input type="checkbox" checked={attSelected.hasOwnProperty(att.attachmentId)} onChange={triggerSelectAttachment} />
                    <a className="ml-1 mr-1" href="/" onClick={attEdit}>edit</a>
                    {att.description}
                    <a className="ml-1" href={attachmentUrl}>{att.fileName}</a>
                    <span className={"dateAttachmentText"}> added:{formatDate(att.added)} updated:{formatDate(att.updated)}</span>
                </li>
            );
        });

        attachmentList = <div><ol>{attachFields}</ol></div>;
    }

    if (expanded.hasOwnProperty(item.itemId)) {
        const descriptionArray = item.description.split(/\r?\n/).map((text, index) => {
            return <div key={index}>{text}&nbsp;</div>
        });


        expandedField = (
            <div>
                <div>{descriptionArray}</div>
                <div className="mt-1">
                    Attachments: {attachmentString}
                </div>
                {attachmentList}
                <div>
                    <a href="/" onClick={addAttachment}>add</a>
                    <a href="/" onClick={upAttachment} className="ml-1">up</a>
                    <a href="/" onClick={downAttachment} className="ml-1">down</a>
                    <a href="/" onClick={unselectAttachments} className="ml-1">unselect</a>
                    <a href="/" onClick={bulkAdd(item.itemId, item.name)} className="ml-1">bulk</a>
                </div>
            </div>

        );
    }

    return(
        <tr key={item.itemId}>
            <td className="text-nowrap text-center">{index + 1}</td>
            <td className="text-nowrap"><input type="checkbox" checked={selected.hasOwnProperty(item.itemId)} onChange={toggleSelectStorageItem}/></td>
            <td className="text-nowrap">{login}</td>
            <td className="text-nowrap"><a href="/" onClick={triggerEditItem}>Edit</a></td>
            <td>
                <div><a href="/" onClick={toggleExpand}>Expand</a> {item.name}</div>
                {expandedField}
            </td>
            <td className="text-nowrap">{item.category}</td>
            <td className={flaggedClass}>{item.flagged ? 'Yes' : 'No'}</td>
        </tr>
    );
}
