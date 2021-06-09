import CdtodoProps from "../data/props/cdtodo/cdtodo-props";
import React, {useEffect} from "react";
import Store from "../data/store/store";
import CdTodoPropsData from "../data/props/cdtodo/cd-todo-props-data";
import CdtodoPropsCallback from "../data/props/cdtodo/cdtodo-props-callback";
import {connect} from "react-redux";
import TodoDataDisplayConfirm from "../data/value/todo-data-display-confirm";
import PersonData from "../data/value/person-data";
import {createActionSetLocation} from "../reducer/actions/action-set-location";
import AppState from "../data/value/app-state";
import {createEffectRemoveTodo} from "../reducer/effects/effect-remove-todo";
import {getKeyObject} from "../util/store-util";
import {processKeyDown, setFocus} from "../util/util-ui-functions";

const CdTodo = (props: CdtodoProps) => {

    const triggerSubmit = () => {
        const ids = props.list.map((item) => {
            return item.todoItemId
        });

        props.submit(ids);
    }

    // get the list
    const list = props.list;
    let cancelButton: any;

    useEffect(() => {
        setFocus(cancelButton!!);
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rows: any[] = [];
    let index = 0;

    list.forEach((item: TodoDataDisplayConfirm) => {
        index++;

        const row = (
            <tr key={item.todoItemId}>
                <td className="text-nowrap">{index}</td>
                <td className="text-nowrap">{item.projectCd}</td>
                <td className="text-nowrap">{item.contextCd}</td>
                <td>{item.comments}</td>
                <td className="text-nowrap">{item.login}</td>
            </tr>
        );

        rows.push(row);
    });

    return (
        <div className="container-fluid" onKeyDown={processKeyDown(triggerSubmit, props.cancel, false)}>
            <div className="row mt-2">
                <div className="col-12">
                    <h1>Confirm Delete</h1>
                    <p>Please confirm the deletion of the following items</p>
                    <table className="table table-bordered table-sm border">
                        <thead>
                        <tr>
                            <td className="text-nowrap">Nr</td>
                            <td className="text-nowrap">Project</td>
                            <td className="text-nowrap">Context</td>
                            <td>Text</td>
                            <td className="text-nowrap">Owner</td>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <button type="submit" className="btn border btn-danger" onClick={triggerSubmit} ref={(field) => {cancelButton = field}}>Delete</button>
                    <button type="submit" className="btn border btn-success" onClick={props.cancel}>Cancel</button>
                </div>
            </div>
        </div>

    );
}

const storeToProps = (store: Store): CdTodoPropsData => {

    const persons: { [key: string]: PersonData; } = {};
    store.persons.forEach((person: PersonData) => {
        persons[person.personId] = person;
    });

    const selectedObject = getKeyObject(store.selected);

    const list: TodoDataDisplayConfirm[] = store.todo
        .map((todo): TodoDataDisplayConfirm => {

            let login = "default";
            if (persons.hasOwnProperty(todo.personId) && persons[todo.personId].login) {
                login = persons[todo.personId].login;
            }

            return {
                todoItemId: todo.todoItemId,
                personId: todo.personId,
                projectCd: todo.projectCd,
                contextCd: todo.contextCd,
                comments: todo.comments,
                login: login
            };
        })
        .filter((item) => {
            return selectedObject.hasOwnProperty(item.todoItemId);
        });

    return {list}
}

const dispatch = (dispatch: any): CdtodoPropsCallback => {
    return {
        cancel: () => {
            dispatch(createActionSetLocation(AppState.todo));
        },
        submit: (ids: string[]) => {
            dispatch(createEffectRemoveTodo(ids));
        }
    }
}

export default connect(storeToProps, dispatch)(CdTodo);
