import {BulkProps} from "../data/props/bulk/bulk-props";
import React, {useEffect} from 'react';
import Store from "../data/store/store";
import BulkPropsData from "../data/props/bulk/bulk-props-data";
import BulkPropsCallback from "../data/props/bulk/bulk-props-callback";
import BulkIdsData from "../data/value/bulk-ids-data";
import {connect} from "react-redux";
import PersonData from "../data/value/person-data";
import {createActionSetLocation} from "../reducer/actions/action-set-location";
import AppState from "../data/value/app-state";
import {getSelectedTodo} from "../util/store-util";
import {createEffectUpdateBulkData} from "../reducer/effects/effect-update-bulk-data";
import {processKeyDown, setFocus} from "../util/util-ui-functions";
import BulkData from "../data/value/bulk-data";
import {createActionUpdateStoreBulkData} from "../reducer/actions/action-update-store-bulk-data";

const getLogin = (map: {[key: string] : PersonData}, id: string) : string => {
    let res = '';

    if (map.hasOwnProperty(id) && map[id]['login']) {
        res = map[id].login;
    }

    return res;
}

const Bulk = (props: BulkProps) => {
    let fieldSelect: any;
    let chkSelectedOwner: any;
    let chkSelectedContext: any;
    let chkSelectedDue: any;
    let chkSelectedPriority: any;
    let chkSelectedProject: any;
    let fieldContext: any;
    let fieldDue: any;
    let fieldPriority: any;
    let fieldProject: any;

    useEffect(() => {
        setFocus(fieldSelect!!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = () => {
        const todoIds = props.todoItems.map((it) => {return it.todoItemId;});
        const assembledData: BulkIdsData = {
            selectedContext: props.selectedContext,
            project: props.project,
            priority: props.priority,
            ownerId: props.ownerId,
            due: props.due,
            context: props.context,
            selectedDue: props.selectedDue,
            selectedOwner: props.selectedOwner,
            selectedPriority: props.selectedPriority,
            selectedProject: props.selectedProject,
            todoIds
        };

        props.submit(assembledData);
    }

    const onUpdateData = (): void => {
        const bulkData : BulkData = {
            selectedProject: chkSelectedProject.checked,
            selectedPriority: chkSelectedPriority.checked,
            selectedOwner: chkSelectedOwner.checked,
            selectedDue: chkSelectedDue.checked,
            selectedContext: chkSelectedContext.checked,
            priority: fieldPriority.value,
            ownerId: fieldSelect.value,
            due: fieldDue.value,
            context: fieldContext.value,
            project: fieldProject.value
        }

        props.onUpdateBulkData(bulkData);
    }

    let i = 0;

    // build the personMap
    const personMap: { [key: string]: PersonData; } = {};
    props.persons.forEach((person) => {
        personMap[person.personId] = person;
    });

    const completedClasses = "text-nowrap font-weight-bold text-center";

    const idrows = props.todoItems.map((item) => {
        i ++;

        const complClasses = `${completedClasses} ${item.completed === true ? 'text-success' : 'text-danger'}`;
        const complLabel = item.completed === true ? 'Yes' : 'No';

        return (
            <tr key={item.todoItemId}>
                <td className="text-nowrap">{i}</td>
                <td className="text-nowrap">{getLogin(personMap, item.personId)}</td>
                <td className={complClasses}>{complLabel}</td>
                <td className="text-nowrap">{item.projectCd}</td>
                <td className="text-nowrap">{item.contextCd}</td>
                <td>{item.comments}</td>
            </tr>
        );
    });

    const personOptions = props.persons.map((person) => {
        return (
            <option key={person.personId} value={person.personId}>{person.name} ({person.login})</option>
        );
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>Confirm Bulk Change</h1>
                    <p>Please select the bulk change parameters and confirm below</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-sm table-bordered">
                        <thead>
                        <tr>
                            <td className="text-nowrap">Nr</td>
                            <td className="text-nowrap">Login</td>
                            <td className="text-nowrap">Completed</td>
                            <td className="text-nowrap">Project</td>
                            <td className="text-nowrap">Context</td>
                            <td className="w-100">Comments</td>
                        </tr>
                        </thead>
                        <tbody>
                        {idrows}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-12 col-md-6 col-lg-4">
                    <table className="table table-sm table-bordered">
                        <tbody>
                        <tr>
                            <td className="align-middle"><input type="checkbox" checked={props.selectedOwner}
                                            onKeyDown={processKeyDown(submit, props.cancel, false)}
                                            ref={(field)=>{chkSelectedOwner = field}}
                                            onChange={onUpdateData}/></td>

                            <td className="align-middle">Owner:</td>
                            <td className="w-100">
                                <select className="form-control" value={props.ownerId}
                                        ref={(element) => {fieldSelect = element}}
                                        onKeyDown={processKeyDown(submit, props.cancel, false)}
                                        onChange={onUpdateData}>
                                    {personOptions}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="align-middle"><input type="checkbox"
                                    checked={props.selectedContext}
                                    ref={(element) => {chkSelectedContext = element}}
                                    onKeyDown={processKeyDown(submit, props.cancel, false)}
                                    onChange={onUpdateData}/>
                            </td>
                            <td className="align-middle">Context:</td>
                            <td><input type="text" className="form-control"
                                       value={props.context}
                                       ref={(element) => {fieldContext = element}}
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       onChange={onUpdateData}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-middle">
                                <input type="checkbox"
                                       checked={props.selectedProject}
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       ref={(element) => {chkSelectedProject = element}}
                                       onChange={onUpdateData}
                                />
                            </td>
                            <td className="align-middle">Project:</td>
                            <td>
                                <input type="text" className="form-control"
                                       value={props.project}
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       ref={(element) => {fieldProject = element}}
                                       onChange={onUpdateData}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-middle">
                                <input type="checkbox"
                                       checked = {props.selectedDue}
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       ref={(element) => {chkSelectedDue = element}}
                                       onChange={onUpdateData}
                                />
                            </td>
                            <td className="align-middle">Due:</td>
                            <td>
                                <input type="text" className="form-control"
                                       value={props.due}
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       ref={(element) => {fieldDue = element}}
                                       onChange={onUpdateData}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-middle">
                                <input type="checkbox"
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       checked={props.selectedPriority}
                                       ref={(element) => {chkSelectedPriority = element}}
                                       onChange={onUpdateData}
                                />
                            </td>
                            <td className="align-middle">Priority:</td>
                            <td>
                                <input type="text" className="form-control"
                                       value={props.priority}
                                       onKeyDown={processKeyDown(submit, props.cancel, false)}
                                       ref={(element) => {fieldPriority = element}}
                                       onChange={onUpdateData}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <button className="btn btn-primary border" onClick={submit}>Submit</button>
                                <button className="btn btn-default border" onClick={props.cancel}>Cancel</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

);
}

const storeToProps = (store: Store) : BulkPropsData => {
    let storeBulk = store.bulk;

    // filter the items with the ones that are selected
    const todoItems = getSelectedTodo(store);

    return {
        persons: store.persons,
        todoItems: todoItems,
        context: storeBulk.context,
        due: storeBulk.due,
        ownerId: storeBulk.ownerId,
        priority: storeBulk.priority,
        project: storeBulk.project,
        selectedContext: storeBulk.selectedContext,
        selectedDue: storeBulk.selectedDue,
        selectedOwner: storeBulk.selectedOwner,
        selectedPriority: storeBulk.selectedPriority,
        selectedProject: storeBulk.selectedProject
    }
}

const dispatch = (dispatch: any) : BulkPropsCallback => {
    return {
        cancel: () => {
            dispatch(createActionSetLocation(AppState.todo));
        },
        submit: (data: BulkIdsData) => {
            dispatch(createEffectUpdateBulkData(data));
        },
        onUpdateBulkData: (data: BulkData) => {
            dispatch(createActionUpdateStoreBulkData(data));
        }
    }
}

export default connect(storeToProps, dispatch)(Bulk);
