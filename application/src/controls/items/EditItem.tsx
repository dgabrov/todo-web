import React, {useEffect, useState} from 'react';
import Store from "../../data/store/store";
import {connect} from "react-redux";
import {EditItemPropsData} from "../../data/props/edititem/edit-item-props-data";
import {EditItemPropsCallback} from "../../data/props/edititem/edit-item-props-callback";
import {EditItemData} from "../../data/value/edit-item-data";
import {v4} from "uuid";
import {ItemData} from "../../data/item/item-data";
import {CompleteItemData} from "../../data/item/complete-item-data";
import {EditItemProps} from "../../data/props/edititem/edit-item-props";
import {createActionSetLocation} from "../../reducer/actions/action-set-location";
import AppState from "../../data/value/app-state";
import {createEffectSaveStorageItem} from "../../reducer/effects/effect-save-storage-item";
import {processKeyDown, setFocus} from "../../util/util-ui-functions";
import {textAreaHeight} from "../../util/constants";


const EditItem = (props: EditItemProps) : any => {

    const adding = props.adding;
    const title = adding ? 'Add Item' : 'Edit Item';
    let itemData = props.itemData;

    let nameField: any;

    useEffect(()=>{
        setFocus(nameField);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const personOptions = props.persons.map((person) => {
            return <option key={person.personId} value={person.personId}>{person.name}</option>;
    });

    const itemId = itemData.itemId;
    let starterPersonId = itemData.personId;

    if (adding) {
        starterPersonId = props.persons[0].personId;
    }

    const [personId, setPersonId] = useState(starterPersonId);
    const [name, setName] = useState(itemData.name);
    const [description, setDescription] = useState(itemData.description);
    const [category, setCategory] = useState(itemData.category);
    const [flagged, setFlagged] = useState(itemData.flagged);

    const submit = () => {
        const processedData : ItemData = {
            itemId, flagged,
            personId, name, description, category,
            updated: new Date(), added: new Date()
        };

        props.submit(adding, processedData);
    };

    return (
        <div className="container-fluid">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="iduser">User</label>
                        <select name="user" id="iduser" className="form-control" value={personId}
                                onChange={(event) => {setPersonId(event.target.value)}}>
                            {personOptions}
                        </select>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idname">Name</label>
                        <input type="text" className="form-control" id="idname"
                               value={name} onChange={(event) => {setName(event.target.value)}}
                               ref={(field) => {nameField = field}}
                               onKeyDown={processKeyDown(submit, props.cancel, false)}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idcategory">Category</label>
                        <input type="text" className="form-control" id="idcategory"
                               value={category} onChange={(event) => {setCategory(event.target.value)}}
                               onKeyDown={processKeyDown(submit, props.cancel, false)}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idflag">Flagged</label>
                        <input type="checkbox" className="ml-2" id="idflag" checked={flagged}
                               onChange={(event) => {setFlagged(event.target.checked)}}
                               onKeyDown={processKeyDown(submit, props.cancel, false)}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="iddescription">Description</label>
                        <textarea className="form-control" id="iddescription" value={description}
                                  onChange={(event) => {setDescription(event.target.value)}}
                                  onKeyDown={processKeyDown(submit, props.cancel, true)}
                                  style={textAreaHeight}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={submit}>Submit</button>
                        <button type="submit" className="btn btn-default border ml-1" onClick={props.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
)
}

const storeToProps = (store: Store): EditItemPropsData => {
    const editItemData : EditItemData = store!!.editItem;
    const adding: boolean = editItemData.adding;

    let id: string;
    let itemData: ItemData;

    const dt = new Date();

    if (adding) {
        id = v4();

        itemData = {
            itemId: id,
            added: dt,
            category: "",
            description: "",
            flagged: false,
            name: "",
            personId: "",
            updated: dt
        }
    }
    else {
        id = editItemData.itemId;

        // find the item data that is required
        const item: CompleteItemData|undefined = store.items.items.find((item) => {return id === item.itemId});

        const {itemId, added, category, description, flagged, name, personId, updated} = item!!;
        itemData = {itemId, added, category, description, flagged, name, personId, updated};
    }

    return {
        adding: adding,
        itemData,
        persons: store.persons
    }
}

const dispatch = (dispatch : any) : EditItemPropsCallback => {
    return {
        cancel() {
            dispatch(createActionSetLocation(AppState.items));
        },
        submit(adding: boolean, item: ItemData) {
            dispatch(createEffectSaveStorageItem(adding, item))
        }
    }
}

export default connect(storeToProps, dispatch)(EditItem);
