import React from 'react';

import {CdItemProps} from "../../data/props/cditem/cd-item-props";
import {CdItemPropsData} from "../../data/props/cditem/cd-item-props-data";
import Store from "../../data/store/store";
import {CdItemPropsCallback} from "../../data/props/cditem/cd-item-props-callback";
import {connect} from "react-redux";
import {ItemData} from "../../data/item/item-data";
import {createActionSetLocation} from "../../reducer/actions/action-set-location";
import AppState from "../../data/value/app-state";
import {createEffectRemoveItems} from "../../reducer/effects/effect-remove-items";

const CdItem = (props: CdItemProps): any => {

    const itemList = props.items.map((item) => {
        return <li key={item.itemId}>{item.name}</li>;
    });

    return (
        <div className="container-fluid">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>Confirm Delete Item</h1>
                    </div>
                    <div className="col-12 form-group">
                        <div>Please confirm the deletion of the following items</div>
                        <div className="mt-2">
                            <ol>
                                {itemList}
                            </ol>
                        </div>
                    </div>
                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={props.submit}>Submit</button>
                        <button type="submit" className="btn btn-default border ml-1" onClick={props.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: Store) : CdItemPropsData => {
    let storeItemData = store.items;
    const selected = storeItemData.selected;

    const items: ItemData[] = storeItemData.items.filter((item) => {
        return selected.hasOwnProperty(item.itemId);
    });

    return {
        items
    }
}

const dispatch = (dispatch: any) : CdItemPropsCallback => {
    return {
        cancel() {
            dispatch(createActionSetLocation(AppState.items));
        },
        submit() {
            dispatch(createEffectRemoveItems());
        }
    }
}


export default connect(storeToProps, dispatch)(CdItem);
