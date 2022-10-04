import React, {useEffect} from 'react';
import {ItemsProps} from "../../data/props/items/items-props";
import Store from "../../data/store/store";
import {ItemsPropsData} from "../../data/props/items/items-props-data";
import {ItemsPropsCallback} from "../../data/props/items/items-props-callback";
import {connect} from "react-redux";
import {createActionSearchItem} from "../../reducer/actions/action-search-item";
import {createEffectSearchItems} from "../../reducer/effects/effect-search-items";
import {createEmptyResponseItems, createItemRow} from "./items-helper-control";
import {getPersonsObject} from "../../util/store-util";
import {createActionExpandItem} from "../../reducer/actions/action-expand-item";
import {createActionToggleSelectStorageItem} from "../../reducer/actions/action-toggle-select-storage-item";
import {createActionToggleSelectAllStorageItems} from "../../reducer/actions/action-toggle-select-all-storage-items";
import {createActionToggleSelectAttachment} from "../../reducer/actions/action-toggle-select-attachment";
import {createActionUnselectAllAttachments} from "../../reducer/actions/action-unselect-all-attachments";
import {createActionRemoveStorageItem} from "../../reducer/actions/action-remove-storage-item";
import {createActionRemoveAttachment} from "../../reducer/actions/action-remove-attachment";
import {createActionEditStorageItem} from "../../reducer/actions/action-edit-storage-item";
import {v4} from "uuid";
import {createActionEditAttachment} from "../../reducer/actions/action-edit-attachment";
import {processKeyDown, setFocus} from "../../util/util-ui-functions";
import {createActionClearItems} from "../../reducer/actions/action-clear-items";
import {createEffectFlaggedItems} from "../../reducer/effects/effect-flagged-items";
import {createEffectSwitchSeqno} from "../../reducer/effects/effect-switch-seqno";
import {createActionExpandAll} from "../../reducer/actions/action-expand-all";
import {createActionTrimItems} from "../../reducer/actions/action-trim-items";
import {createActionBulkAddAttachment} from "../../reducer/actions/action-bulk-add-attachment";

const Items = (props: ItemsProps) => {

    const storeItemData = props.storeItemData;
    const persons = props.persons;
    const items = storeItemData.items;
    const selected = storeItemData.selected;

    let searchField: any;

    const search = storeItemData.search;

    useEffect(() => {
        setFocus(searchField!!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSearchChange = (event: any) : void => {
        const strSearch = event.target.value;

        props.onSearchChange(strSearch);
    }

    const isAllSelected = (): boolean => {
        let res: boolean = false;

        if (items.length > 0) {
            if (Object.keys(selected).length !== items.length) {
                res = false;
            }
            else {
                res = items
                    .map((item) => item.itemId)
                    .filter((itemId) => selected.hasOwnProperty(itemId)).length === items.length;
            }
        }

        return res;
    }

    const rows: any = [];

    if (items.length === 0) {
        rows.push(createEmptyResponseItems());
    }
    else {
        items.forEach((item, index)=> {
            let itemRow = createItemRow(item, index, props, persons);
            rows.push(itemRow)
        });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-left align-items-end flex-wrap">
                    <h1>Items</h1>
                </div>
                <div className="col-12 d-flex justify-content-left align-items-end flex-wrap">
                    <label htmlFor="search" className="m-0 mt-2">Search</label>
                </div>
                <div className="col-12 d-flex justify-content-left align-items-center flex-wrap">
                    <div className="form-group m-0">
                        <input type="text" value={search} className="form-control"
                               id="search" onChange={onSearchChange}
                               onKeyDown={processKeyDown(props.searchItems, null, false)}
                               ref={(v) => {searchField = v}} />
                    </div>
                    <button type="submit" className="ml-3 btn border btn-primary btn-sm" onClick={props.searchItems}>Search</button>
                    <button type="submit" className="btn border btn-sm ml-3" onClick={props.expandAll}>Expand / Collapse</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={props.trim}>Trim</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={props.clear}>Clear</button>
                    <button type="submit" className="btn border btn-sm ml-3" onClick={props.getFlaggedItems}>Flag</button>
                </div>
                <div className="col-12">
                    <table className="table table-sm table-bordered mt-3">
                        <thead>
                        <tr>
                            <td className="text-nowrap">Nr</td>
                            <td className="text-nowrap"><input type="checkbox" checked={isAllSelected()} onChange={props.toggleSelectAllItems}/></td>
                            <td className="text-nowrap">Login</td>
                            <td className="text-nowrap">Edit</td>
                            <td className="w-100">Name</td>
                            <td className="text-nowrap">Category</td>
                            <td className="text-nowrap">Flag</td>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-12 mb-3">
                    <button type="button" className="btn border btn-sm" onClick={props.removeItem}>Remove</button>
                    <button type="button" className="btn border btn-sm" onClick={props.addItem}>Add</button>
                    <button type="button" className="btn border btn-sm ml-2" onClick={props.removeAttachment}>Remove Attach</button>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: Store): ItemsPropsData => {
    return {
        storeItemData: store.items,
        persons: getPersonsObject(store.persons)
    }
}

const dispatch = (dispatch: any): ItemsPropsCallback => {
    return {
        searchItems: () => {
            dispatch(createEffectSearchItems());
        },
        toggleExpand: (itemId: string) => {
            dispatch(createActionExpandItem(itemId));
        },
        expandAll() {
            dispatch(createActionExpandAll());
        },
        trim() {
            dispatch(createActionTrimItems());
        },
        toggleSelectAllItems() {
            dispatch(createActionToggleSelectAllStorageItems());
        },
        addItem: () => {
            dispatch(createActionEditStorageItem(v4(), true))
        },
        editItem: (itemId: string) => {
            dispatch(createActionEditStorageItem(itemId, false));
        },
        removeItem: () => {
            dispatch(createActionRemoveStorageItem());
        },
        editAttachment: (attachmentId: string, itemId: string) => {
            dispatch(createActionEditAttachment(false, attachmentId, itemId));
        },
        removeAttachment: () => {
            dispatch(createActionRemoveAttachment());
        },
        addAttachment: (attachmentId: string, itemId: string) => {
            dispatch(createActionEditAttachment(true, attachmentId, itemId));
        },
        unselectAttachments: (itemId: string) => {
            dispatch(createActionUnselectAllAttachments(itemId));
        },
        getFlaggedItems: () => {
            dispatch(createEffectFlaggedItems());
        },
        onSearchChange(search: string) {
            dispatch(createActionSearchItem(search));
        },
        toggleSelectStorageItem(itemId: string) {
            dispatch(createActionToggleSelectStorageItem(itemId));
        },
        triggerSelectAttachment(attachmentId: string) {
            dispatch(createActionToggleSelectAttachment(attachmentId));
        },
        clear() {
            dispatch(createActionClearItems());
        },
        positionSeqNoAttachment(attId: string, otherAttId: string) {
            dispatch(createEffectSwitchSeqno(attId, otherAttId));
        },
        bulkAdd(itemId: string, name: string) {
            dispatch(createActionBulkAddAttachment(itemId, name));
        }
    }
}

export default connect(storeToProps, dispatch)(Items);
