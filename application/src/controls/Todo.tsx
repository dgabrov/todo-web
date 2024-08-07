import TodoProps from "../data/props/todo/todo-props";
import React, {useEffect} from 'react';
import Store from "../data/store/store";
import TodoPropsData from "../data/props/todo/todo-props-data";
import TodoPropsCallback from "../data/props/todo/todo-props-callback";
import {connect} from "react-redux";
import {NONE, HOT_FIELD_DUE, HOT_FIELD_PRIORITY, textAreaHeightSmall} from "../util/constants";
import PersonData from "../data/value/person-data";
import {formatDate, processKeyDown, setFocus} from "../util/util-ui-functions";
import AddTodoData from "../data/value/add-todo-data";
import {createActionSelectAll} from "../reducer/actions/action-select-all";
import {createActionTrim} from "../reducer/actions/action-trim";
import {createActionToggleSelectItem} from "../reducer/actions/action-toggle-select-item";
import {createActionClear} from "../reducer/actions/action-clear";
import {createActionBulk} from "../reducer/actions/action-bulk";
import {createActionRemoveTodo} from "../reducer/actions/action-remove-todo";
import {createActionAddTodoItem} from "../reducer/actions/action-add-todo-item";
import {createActionEditItem} from "../reducer/actions/action-edit-todo-item";
import {createEffectToggleCompleted} from "../reducer/effects/effect-toggle-completed";
import {createEffectSearch} from "../reducer/effects/effect-search";
import {createActionTriggerEditDue} from "../reducer/actions/action-trigger-edit-due";
import {createActionTriggerEditPriority} from "../reducer/actions/action-trigger-edit-priority";
import {createEffectQuickAddData} from "../reducer/effects/effect-quick-add-data";
import {createActionOnFieldsUpdate} from "../reducer/actions/action-on-fields-update";
import {createActionCancelHotEdit} from "../reducer/actions/action-cancel-hot-edit";
import {createEffectSavePriority} from "../reducer/effects/effect-save-priority";
import {createEffectSaveDue} from "../reducer/effects/effect-save-due";
import {createActionToggleShowAddedUpdated} from "../reducer/actions/action-toggle-show-added-updated";


const getNoItemsRows = (cols: number) => {
    return [<tr key={'no-items-key'}>
        <td colSpan={4}>&nbsp;</td>
        <td colSpan={cols}>No items...</td>
    </tr>];
}

const contextProjectClick = (isContext: boolean, key: string, search: string, searchCallback: (srString: string) => void ) => {
    return (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        // tokenize search string
        let sr = search || '';
        sr = sr.trim();
        const prefix = isContext ? 'ctx:' : 'proj:';
        const words = sr.split(' ')
            // trim the items
            .map((item) => {
                return item.trim();
            })
            // find tokens that start with ctx or proj and remove them
            .filter((item) => {
                return !item.startsWith(prefix);
            });

        // basically adding at the end the required info; we will be able to filter one ctx and one proj \
        // at one time using those links at the top of the page;
        words.push(prefix + key);

        // put together the new search string
        const newSearchString = words.join(' ');
        searchCallback(newSearchString); // this trigger a side effect and proceeds
    }
}

const getKeyList = (isContext: boolean, items: TodoProps) => {
    const arr = items?.todoItems;

    let res: any[] = [];
    const currentSet: { [key: string]: string; } = {};
    let hasEmpty = false;

    if (arr?.length > 0) { // the array is being filled out
        arr?.forEach((item) => {
            let key = isContext ? item.contextCd : item.projectCd;
            key = key || '';
            key = key.trim();

            if (key === '') {
                hasEmpty = true;
            } else {
                currentSet[key] = '';
            }
        });

        // get the keys
        const keys = Object.keys(currentSet).sort();
        if (hasEmpty) {
            keys.splice(0, 0, NONE);
        }

        res = keys.map((key) => {
            return <a href="/" key={key} type='submit' className="ml-1"
                      onClick={contextProjectClick(isContext, key, items.search, items.searchClick)}>
                {key}
            </a>;
        });
    }

    return res;
}

const getCtxList = (items: TodoProps) => {
    return getKeyList(true, items);
}

const getProjectList = (items: TodoProps) => {
    return getKeyList(false, items);
}

const Todo = (props: TodoProps) => {

    const showAddedUpdated = props.showAddedUpdated;

    let addedUpdatedHeader: JSX.Element[] = [];
    if (showAddedUpdated) {
        addedUpdatedHeader = [
            <td key={'added'} className="text-nowrap">Added</td>,
            <td key={'updated'} className="text-nowrap">Updated</td>
        ]
    }

    let searchField: HTMLInputElement | null = null;
    let commentsField: HTMLTextAreaElement | null = null;
    let contextField: HTMLInputElement | null = null;
    let dueField: HTMLInputElement | null = null;
    let personsCombo: HTMLSelectElement | null = null;
    let priorityField: HTMLInputElement | null = null;
    let projectField: HTMLInputElement | null = null;
    let multilineCheckbox: HTMLInputElement | null = null;

    const onEditPriorityCancel = () => {
        props.onEditPriorityCancel()
    }
    const onEditPriorityEnter = (todoItemId: string) => {
        return (event?: any): void => {
            props.saveItemPriority(todoItemId, event.target.value);
        }
    }

    const onEditDueCancel = () => {
        props.onEditDueCancel()
    };
    const onEditDueEnter = (todoItemId: string) => {
        return (event?: any): void => {
            props.saveDuePriority(todoItemId, event.target.value);
        }
    }

    const selectedObject: { [key: string]: string } = {};
    props.selected.forEach((id) => {
        selectedObject[id] = id
    });

    const personsObject: { [key: string]: PersonData } = {};
    props.persons.forEach((person) => {
        personsObject[person.personId] = person;
    });

    const onFieldsUpdate = (): void => {
        props.onFieldsUpdate(
            {
                comments: commentsField!!.value,
                context: contextField!!.value,
                due: dueField!!.value,
                personId: personsCombo!!.value,
                priority: priorityField!!.value,
                project: projectField!!.value,
                search: searchField!!.value,
                multiline: multilineCheckbox!!.checked
            });
    }

    const getLogin = (id: string) => {
        let res = "";

        if (personsObject.hasOwnProperty(id)) {
            res = personsObject[id].login;
        }

        return res;
    }

    const editItem = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.stopPropagation();
        event.preventDefault();

        props.editItem(id);
    }

    const personOptions = props.persons.map((person) => {
        return (<option key={person.personId} value={person.personId}>{person.name} ({person.login})</option>);
    });

    let index: number = 0;

    const cols = showAddedUpdated ? 8 : 6;

    let itemRows = getNoItemsRows(cols);

    if (props.todoItems.length > 0) {
        itemRows = props.todoItems.map((item) => {
            index++;

            const completedText = item.completed ? "Yes" : "No";
            const completedClass = item.completed ?
                "text-nowrap highlighted font-weight-bold text-center text-success"
                : "text-nowrap highlighted font-weight-bold text-center text-danger";

            let priorityContent = <span>{item.priority}</span>;
            let dueContent = <span>{formatDate(item.due)}</span>

            if (item.todoItemId === props.editPriorityId) {
                priorityContent = <input type="text" defaultValue={item.priority}
                                         onBlur={onEditPriorityCancel}
                                         className={'editField'}
                                         onKeyDown={processKeyDown(onEditPriorityEnter(item.todoItemId), onEditPriorityCancel, false)}
                                         size={1}
                                         ref={
                                             (field) => {
                                                 if (field) {
                                                     field.focus();
                                                     field.select();
                                                 }
                                             }
                                         }
                />;

            }

            if (item.todoItemId === props.editDueId) {
                dueContent = <input type="text" defaultValue={formatDate(item.due)}
                                    onBlur={onEditDueCancel}
                                    onKeyDown={processKeyDown(onEditDueEnter(item.todoItemId), onEditDueCancel, false)}
                                    className={'editField'}
                                    size={9}
                                    ref={
                                        (field) => {
                                            if (field) {
                                                field.focus();
                                                field.select();
                                            }
                                        }
                                    }
                />;
            }

            const commentsArray = item.comments.split(/\r?\n/).map((text, index) => {
                return <div key={index}>{text}&nbsp;</div>
            });

            let addUpdateRow: JSX.Element[] = [];
            if (showAddedUpdated) {
                addUpdateRow = [
                    <td key={item.todoItemId + '.added'} className="text-nowrap">{formatDate(item.added)}</td>,
                    <td key={item.todoItemId + '.updated'} className="text-nowrap">{formatDate(item.updated)}</td>
                ];
            }

            return (
                <tr className="canHover" key={item.todoItemId}>
                    <td className="text-nowrap">{index}</td>
                    <td className="text-nowrap">
                        <input type="checkbox" checked={selectedObject.hasOwnProperty(item.todoItemId)}
                               onChange={(event) => {
                                   props.toggleSelectItem(item.todoItemId)
                               }}
                        />
                    </td>
                    <td className="text-nowrap">
                        <a href="/" onClick={(event) => {
                            editItem(event, item.todoItemId)
                        }}>Edit</a>
                    </td>
                    <td className="text-nowrap">{getLogin(item.personId)}</td>
                    <td className="text-nowrap">{item.projectCd}</td>
                    <td className="text-nowrap">{item.contextCd}</td>
                    <td>{commentsArray}</td>
                    <td className={completedClass} onClick={() => {
                        props.toggleCompleted(item.todoItemId);
                    }}>{completedText}</td>
                    <td className="text-nowrap text-center highlighted" onClick={() => {
                        props.triggerEditPriority(item.todoItemId);
                    }}>{priorityContent}</td>
                    <td className="text-nowrap due-value highlighted" onClick={() => {
                        props.triggerEditDue(item.todoItemId);
                    }}>
                        <div>{dueContent}</div>
                    </td>
                    {addUpdateRow}
                </tr>
            );
        });
    }

    const getItemCountByStatus = (completed: boolean): number => {
        return props.todoItems.filter((item) => {
            return item.completed === completed
        }).length;
    }

    const getPending = (): number => {
        return getItemCountByStatus(false);
    }

    const getCompleted = (): number => {
        return getItemCountByStatus(true);
    }

    const selectAll = (all: boolean): void => {
        props.selectAll(all);
    }

    const toggleShowAddedUpdated = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        event.preventDefault();

        props.onToggleShowAddedUpdated()
    }

    const isSelectedAll = (): boolean => {
        let res: boolean = false;

        if (props.todoItems.length > 0) {
            const allIds = props.todoItems.map((item) => {
                return item.todoItemId;
            });

            const allItemsObject: { [key: string]: string } = {};
            allIds.forEach((id) => {
                allItemsObject[id] = ""
            });

            // now, all are selected if selected and allIds are equivalent
            res = (props.selected.length === allIds.length) &&
                (props.selected.filter((id) => {
                    return allItemsObject.hasOwnProperty(id);
                }).length === allIds.length);
        }

        return res;
    }

    useEffect(() => {
        setFocus(searchField!!);

        // initialize the value of the quick add fields
        onFieldsUpdate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-left align-items-end flex-wrap">
                    <h1>To-Do</h1>
                </div>
                <div className="col-12 d-flex justify-content-left align-items-end flex-wrap">
                    <label htmlFor="search" className="m-0 mt-2">Search</label>
                </div>
                <div className="col-12 d-flex justify-content-left align-items-center flex-wrap">
                    <div className="form-group m-0">
                        <input type="text" className="form-control" id="search"
                               value={props.search}
                               onChange={onFieldsUpdate}
                               onKeyDown={processKeyDown(props.triggerSearch, null, false)}
                               ref={(element) => {
                                   searchField = element
                               }}
                        />
                    </div>
                    <button type="submit" className="ml-3 btn border btn-primary btn-sm"
                            onClick={props.triggerSearch}>Search
                    </button>

                    <button type="submit" className="btn border btn-sm ml-3" onClick={props.current}>Current</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={props.future}>Future</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={props.trim}>Trim</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={props.clear}>Clear</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={() => {
                        alert('this is not implemented yet')
                    }}>Help
                    </button>

                    <div className="font-weight-bold text-danger ml-2 mr-2 text-nowrap">Pending: {getPending()}</div>
                    <div className="font-weight-bold text-success text-nowrap">Completed: {getCompleted()}</div>
                </div>
                <div className="col-12">
                    ctx: {getCtxList(props)}
                </div>
                <div className="col-12">
                    proj: {getProjectList(props)}
                </div>
                <div className="col-12">
                    <table className="table table-sm table-bordered mt-3">
                        <thead>
                        <tr>
                            <td className="text-nowrap">Nr</td>
                            <td className="text-nowrap">
                                <input type="checkbox" checked={isSelectedAll()}
                                       onChange={(event) => {
                                           selectAll(event.target.checked)
                                       }}/>
                            </td>
                            <td className="text-nowrap">Edit</td>
                            <td className="text-nowrap">Login</td>
                            <td className="text-nowrap">Project</td>
                            <td className="text-nowrap">Context</td>
                            <td className="w-100">Comments</td>
                            <td className="text-nowrap">Ready?</td>
                            <td className="text-nowrap">Priority</td>
                            <td className="text-nowrap due-value">
                                <div>Due</div>
                            </td>
                            {addedUpdatedHeader}
                        </tr>
                        </thead>
                        <tbody>
                        {itemRows}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-12 mb-3">
                    <button type="submit" className="btn border btn-sm" onClick={props.remove}>Remove</button>
                    <button type="submit" className="btn border btn-sm" onClick={props.bulk}>Bulk Changes</button>
                    <button type="submit" className="btn border btn-sm ml-1" onClick={props.add}>Add</button>
                </div>
            </div>
            <div className="row p-1 m-1 mt-4">
                <h4>Quick Add</h4>
            </div>
            <div className="row p-1 border rounded bg-light m-1">
                <div className="col-lg-2 col-12 form-group">
                    <label htmlFor="iduser">User</label>
                    <select name="user" id="iduser" className="form-control"
                            onKeyDown={processKeyDown(props.onQuickAdd, null, false)}
                            value={props.personId}
                            onChange={onFieldsUpdate}
                            ref={(field) => {
                                personsCombo = field;
                            }}
                    >
                        {personOptions}
                    </select>
                </div>
                <div className="col-lg-2 col-12 form-group">
                    <label htmlFor="idproject">Project</label>
                    <input type="text" className="form-control" id="idproject"
                           onKeyDown={processKeyDown(props.onQuickAdd, null, false)}
                           value={props.project}
                           onChange={onFieldsUpdate}
                           ref={(field) => {
                               projectField = field;
                           }}
                    />
                </div>
                <div className="col-lg-2 col-12 form-group">
                    <label htmlFor="idcontext">Context</label>
                    <input type="text" className="form-control" id="idcontext"
                           value={props.context}
                           onKeyDown={processKeyDown(props.onQuickAdd, null, false)}
                           onChange={onFieldsUpdate}
                           ref={(field) => {
                               contextField = field;
                           }}
                    />
                </div>
                <div className="col-lg-2 col-12 form-group">
                    <label htmlFor="idpriority">Priority</label>
                    <input type="text" className="form-control" id="idpriority"
                           value={props.priority}
                           onKeyDown={processKeyDown(props.onQuickAdd, null, false)}
                           onChange={onFieldsUpdate}
                           ref={(field) => {
                               priorityField = field;
                           }}
                    />
                </div>
                <div className="col-lg-2 col-12 form-group">
                    <label htmlFor="iddue">Due</label>
                    <input type="text" className="form-control" id="iddue"
                           value={props.due}
                           onKeyDown={processKeyDown(props.onQuickAdd, null, false)}
                           onChange={onFieldsUpdate}
                           ref={(field) => {
                               dueField = field;
                           }}
                    />
                </div>
                <div className="col-lg-12 col-12 form-group">
                    <label htmlFor="idcomments">Comments</label>
                    <textarea className="form-control" id="idcomments"
                              style={textAreaHeightSmall}
                              value={props.comments}
                              onKeyDown={processKeyDown(props.onQuickAdd, null, true)}
                              onChange={onFieldsUpdate}
                              ref={(field) => {
                                  commentsField = field;
                              }}
                    />
                </div>
                <div className="col-lg-12 col-12 form-group">
                    <label htmlFor="idmultiline">Multi lines</label>
                    <input type="checkbox" className={'ml-3'} id="idmultiline"  checked={props.multiline} onChange={onFieldsUpdate} ref={(field) => {
                        multilineCheckbox = field;
                    }}/>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-lg-6 col-12 p-1 mb-4">
                    <button type="submit" className="btn btn-primary border" onClick={props.onQuickAdd}>Add</button>
                </div>
                <div className="col-lg-6 col-12 p-1 mt-4">
                    <a href="/" onClick={toggleShowAddedUpdated}>Toggle Dates</a>
                </div>
            </div>
        </div>

    );
}

const storeToProps = (store: Store): TodoPropsData => {
    const details = store.todoDetails;

    return {
        comments: details.comments,
        context: details.context,
        due: details.due,
        personId: details.personId,
        priority: details.priority,
        project: details.project,
        search: details.search,
        persons: store.persons,
        selected: store.selected,
        todoItems: store.todo,
        editDueId: details.editDueId,
        editPriorityId: details.editPriorityId,
        showAddedUpdated: store.showAddedUpdated,
        multiline: details.multiline
    }
}

const dispatch = (dispatch: any): TodoPropsCallback => {
    return {
        add: () => {
            dispatch(createActionAddTodoItem());
        },
        bulk: () => {
            dispatch(createActionBulk());
        },
        clear: () => {
            dispatch(createActionClear());
        },
        current: () => {
            dispatch(createEffectSearch('is:p due:none,-tomorrow'));
        },
        future: () => {
            dispatch(createEffectSearch('is:p due:none,tomorrow-'));
        },
        remove: () => {
            dispatch(createActionRemoveTodo());
        },
        searchClick: (newSearchString: string) => {
            dispatch(createEffectSearch(newSearchString));
        },
        triggerSearch: () => {
            dispatch(createEffectSearch());
        },
        trim: () => {
            dispatch(createActionTrim());
        },
        selectAll: () => {
            dispatch(createActionSelectAll());
        },
        toggleSelectItem: (id: string) => {
            dispatch(createActionToggleSelectItem(id));
        },
        editItem: (id: string) => {
            dispatch(createActionEditItem(id));
        },
        onFieldsUpdate: (data: AddTodoData) => {
            dispatch(createActionOnFieldsUpdate(data));
        },
        toggleCompleted: (todoId: string) => {
            dispatch(createEffectToggleCompleted(todoId));
        },
        triggerEditDue: (todoId: string) => {
            dispatch(createActionTriggerEditDue(todoId));
        },
        triggerEditPriority: (todoId: string) => {
            dispatch(createActionTriggerEditPriority(todoId));
        },
        onQuickAdd: () => {
            dispatch(createEffectQuickAddData());
        },
        onEditPriorityCancel: () => {
            dispatch(createActionCancelHotEdit(HOT_FIELD_PRIORITY));
        },
        saveItemPriority(todoItemId: string, newPriority: string) {
            dispatch(createEffectSavePriority(todoItemId, newPriority));
        }
        ,
        onEditDueCancel() {
            dispatch(createActionCancelHotEdit(HOT_FIELD_DUE));
        },
        saveDuePriority(todoItemId: string, newDueDateStr: string) {
            dispatch(createEffectSaveDue(todoItemId, newDueDateStr));
        },
        onToggleShowAddedUpdated() {
            dispatch(createActionToggleShowAddedUpdated());
        }
    }
}

export default connect(storeToProps, dispatch)(Todo);
