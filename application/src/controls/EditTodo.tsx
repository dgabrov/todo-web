import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import EditTodoPropsCallback from "../data/props/edittodo/edittodo-props-callback";
import EditTodoProps from "../data/props/edittodo/edittodo-props";
import EditTodoPropsData from "../data/props/edittodo/edittodo-props-data";
import PersonData from "../data/value/person-data";
import EditTodoData from "../data/value/edit-todo-data";
import {textAreaHeight} from "../util/constants";
import Store from "../data/store/store";
import {createActionSetLocation} from "../reducer/actions/action-set-location";
import AppState from "../data/value/app-state";
import {createEffectSaveTodo} from "../reducer/effects/effect-save-todo";
import {processKeyDown, setFocus} from "../util/util-ui-functions";

const EditTodo = (props: EditTodoProps) => {
    const todoItemId = props.todoItemId;
    const adding = props.adding;
    const textAdding = props.adding ? 'Add' : 'Edit';
    const options = props.persons.map((user: PersonData) => {
        return (
            <option key={user.personId} value={user.personId}>{user.name} ({user.login})</option>
        );
    });

    const [personId, setPersonId] = useState(props.personId);
    const [projectCd, setProject] = useState(props.projectCd);
    const [contextCd, setContext] = useState(props.contextCd);
    const [priority, setPriority] = useState(props.priority);
    const [due, setDue] = useState(props.due);
    const [comments, setComments] = useState(props.comments);
    const [completed, setCompleted] = useState(props.completed);

    let ownerField : HTMLSelectElement|null;

    useEffect(()=>{
        setFocus(ownerField!!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cancel = () => {
        props.cancel();
    }
    const submit = () => {
        props.submit({todoItemId, adding, comments, completed, contextCd, projectCd, due, personId, priority});
    }

    return (
        <div className="container-fluid">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>{textAdding} To-Do</h1>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="iduser">User</label>
                        <select name="user" id="iduser" className="form-control" value={personId}
                                onKeyDown={processKeyDown(submit, cancel, false)}
                                onChange={(event) => {
                            setPersonId(event.target.value);}}
                            ref={(field) => {ownerField = field}}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idproject">Project</label>
                        <input type="text" className="form-control" id="idproject"
                               onKeyDown={processKeyDown(submit, cancel, false)}
                               value={projectCd}
                               onChange={(event) => {setProject(event.target.value)}} />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idcontext">Context</label>
                        <input type="text" className="form-control" id="idcontext"
                               onKeyDown={processKeyDown(submit, cancel, false)}
                               value={contextCd}
                               onChange={(event) => {setContext(event.target.value)}}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idpriority">Priority</label>
                        <input type="text" className="form-control" id="idpriority"
                               onKeyDown={processKeyDown(submit, cancel, false)}
                               value={priority}
                               onChange={(event) => {setPriority(event.target.value)}}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idcompleted">Completed</label>
                        <input type="checkbox" id="idcompleted" className="ml-2"
                               onKeyDown={processKeyDown(submit, cancel, false)}
                               checked={completed}
                               onChange={(event) => {setCompleted(event.target.checked)}}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="iddue">Due</label>
                            <input type="text" className="form-control" id="iddue" value={due}
                                   onKeyDown={processKeyDown(submit, cancel, false)}
                                   onChange={(event) => setDue(event.target.value)}/>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="idcomments">Comments</label>
                        <textarea style={textAreaHeight}
                                  className="form-control" id="idcomments"
                                  onKeyDown={processKeyDown(submit, cancel, true)}
                                  onChange={(event) => {setComments(event.target.value)}}
                                  value={comments}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={submit}>Submit</button>
                        <button type="submit" className="btn btn-default border ml-2" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: Store): EditTodoPropsData => {
    const edit = store.edit;

    return {
        adding: edit.adding,
        todoItemId: edit.todoItemId,
        comments: edit.comments,
        contextCd: edit.contextCd,
        projectCd: edit.projectCd,
        due: edit.due,
        priority: edit.priority,
        personId: edit.personId,
        completed: store.edit.completed,
        persons: store.persons
    };
}

const dispatch = (dispatch: any) : EditTodoPropsCallback => {
    return {
        cancel: () => {
            dispatch(createActionSetLocation(AppState.todo));
        },
        submit: (data: EditTodoData) => {
            dispatch(createEffectSaveTodo(data));
        }
    };
}

export default connect(storeToProps, dispatch)(EditTodo);

