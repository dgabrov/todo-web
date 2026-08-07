import React, {Dispatch, useState} from "react";
import {PwdProps} from "../data/props/pwd/pwd-props";
import Store from "../data/store/store";
import {connect} from "react-redux";
import PersonData from "../data/value/person-data";
import {PasswordData, SecretData} from "../data/value/pwd-data";
import {getPasswordData, setPasswordData} from "../service/server";
import {v4} from "uuid";
import {PwdPropsData} from "../data/props/pwd/pwd-props-data";
import {PwdPropsCallback} from "../data/props/pwd/pwd-props-callback";
import {createActionSendMessage} from "../reducer/actions/action-send-message";

const Pwd = (props: PwdProps) => {

    const [personId, setPersonId] = useState<string>(props.persons[0].personId);
    const [password, setPassword] = useState<string>("");
    const [data, setData] = useState<PasswordData>({passwords: []})
    const [edit, setEdit] = useState<string>('');
    const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
    const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

    const getPersonName = () => {
        let res = ''

        props.persons.forEach(person => {
            if (person.personId === personId) {
                res = person.name
            }
        })

        return res
    }

    const load = () => {
        getPasswordData(personId, password).then((res) => {
            setData(res)
        }).catch((err) => {
            props.error(err.message)
        })
    }

    const clear = () => {
        setPassword('')
        setData({passwords: []})
    }

    const save = async () => {
        await setPasswordData(personId, password, data).catch((err) => {
            props.error(err.message)
        })
    }

    const add = () => {
        const newData = {...data}
        const newId = v4()
        newData.passwords.push({
            id: newId, secrets: [], title: 'edit me'
        })

        setData(newData)
        setEdit(newId)
    }

    const personChange = (event: any) => {
        const selected = event.target.value;

        setPersonId(selected);
        setData({passwords: []})
    }

    const passwordChange = (event: any) => {
        const password = event.target.value

        setPassword(password);
    }

    const options = props.persons.map((person: PersonData) => {
        return (<option key={person.personId} value={person.personId}>{person.name} ({person.login})</option>)
    })

    const editClick = (id: string) => {
        return (event: any) => {
            event.preventDefault()

            if(id === edit){
                setEdit('')
            } else {
                setEdit(id)
            }
        }
    }

    const getTitle = (id: string): string => {
        let title = ''

        data.passwords.forEach((pw) => {
            if (pw.id === id) {
                title = pw.title
            }
        })

        return title
    }

    const setEditTitle = (id: string) => {
        return (event: any) => {
            const title = event.target.value;

            // go through data and see if you find the title and then update it and update the entire data
            const newData = {...data};
            newData.passwords = newData.passwords.map((pass: SecretData) => {
                if (pass.id === id) {
                    pass.title = title;
                }

                return pass;
            })

            setData(newData);
        }
    }

    const getSecretValue = (id: string, isUser: boolean): string => {
        let res = ''

        data.passwords.forEach((pw) => {
            pw.secrets.forEach((secret) => {
                if (secret.id === id) {
                    res = isUser ? secret.username : secret.password;
                }
            })
        })

        return res
    }

    const getCommentValue = (id: string): string => {
        let res = ''

        data.passwords.forEach((pw) => {
            pw.secrets.forEach((secret) => {
                if (secret.id === id) {
                    res = secret.comment;
                }
            })
        })

        return res
    }

    const setItemValue = (id: string, isUser: boolean) => {
        return (event: any)=> {
            const val = event.target.value

            const newData = {...data};
            newData.passwords.forEach((pw) => {
                pw.secrets.forEach((secret) => {
                    if (secret.id === id) {
                        if (isUser) {
                            secret.username = val
                        } else {
                            secret.password = val
                        }
                    }
                })
            })

            // and now set the new data to the value
            setData(newData);
        }
    }

    const setCommentValue = (id: string) => {
        return (event: any) => {
            const val = event.target.value

            const newData = {...data};
            newData.passwords.forEach((pw) => {
                pw.secrets.forEach((secret) => {
                    if (secret.id === id) {
                        secret.comment = val
                    }
                })
            })

            setData(newData);
        }
    }

    const deletePassword = (id: string) => {
        return (event: any) => {
            event.preventDefault()

            // get the items and remove this one
            const newData = {...data};
            newData.passwords.forEach((pw) => {
                pw.secrets = pw.secrets.filter(secret => secret.id !== id)
            })

            setData(newData)
        }
    }

    const deleteGroup = (id: string) => {
        return (event: any) => {
            event.preventDefault()

            const newData = {...data};
            newData.passwords = newData.passwords.filter((pw) => {
                return pw.id !== id
            })

            setData(newData)
            setEdit('')
        }
    }

    const addItemForGroup = (id: string) => {
        return (event: any) => {
            event.preventDefault()

            const newData = {...data};
            newData.passwords.forEach((pw) => {
                if(pw.id === id) {
                    pw.secrets.push({
                        id: v4(), username: '', password: '', comment: ''
                    })
                }
            })

            setData(newData)
        }
    }

    const toggleSecretVisibility = (id: string) => {
        const newVisible = new Set(visibleSecrets);
        if (newVisible.has(id)) {
            newVisible.delete(id);
        } else {
            newVisible.add(id);
        }
        setVisibleSecrets(newVisible);
    }

    const handleToggleSecretVisibility = (id: string) => {
        return (event: any) => {
            event.preventDefault();
            toggleSecretVisibility(id);
        }
    }

    const isSecretVisible = (id: string) => {
        return visibleSecrets.has(id);
    }

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIds(prev => new Set(prev).add(id));
            setTimeout(() => {
                setCopiedIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            }, 150);
        }).catch(() => {
            console.log('clipboard api does not work on this browser');
        });
    }

    const handleCopyToClipboard = (text: string, id: string) => {
        return (event: any) => {
            event.preventDefault();
            copyToClipboard(text, id);
        }
    }

    function renderPasswordRow(secret: SecretData) {
        const editing = edit === secret.id

        let rows: any = <div className="text-muted">no secrets</div>
        if (secret.secrets?.length > 0) {
            rows = secret.secrets.map((item) => {
                let comment: any = ''
                let username : any = item.username
                let password : any = item.password
                let usernameActions: any = ''
                let passwordActions: any = ''
                let deleteLink: any = ''

                const usernameCopyId = `${item.id}-username`;
                const passwordCopyId = `${item.id}-password`;
                const isUsernameCopied = copiedIds.has(usernameCopyId);
                const isPasswordCopied = copiedIds.has(passwordCopyId);

                if (editing){
                    comment = <input type="text" className="form-control form-control-sm" value={getCommentValue(item.id)} onChange={setCommentValue(item.id)} placeholder="Comment"/>
                    username = <input type="text" className="form-control form-control-sm" value={getSecretValue(item.id, true)} onChange={setItemValue(item.id, true)} placeholder="Username"/>
                    const passwordInputType = isSecretVisible(item.id) ? 'text' : 'password'
                    password = <input type={passwordInputType} className="form-control form-control-sm" value={getSecretValue(item.id, false)} onChange={setItemValue(item.id, false)} placeholder="Password"/>
                    usernameActions = <a href="#/" onClick={handleCopyToClipboard(getSecretValue(item.id, true), usernameCopyId)} className={`link-primary ml-1 ${isUsernameCopied ? 'text-success' : ''}`} style={{transition: 'color 150ms'}}>{isUsernameCopied ? 'Copied!' : 'Copy'}</a>
                    passwordActions = <>
                        <a href="#/" onClick={handleToggleSecretVisibility(item.id)} className="btn btn-sm btn-outline-secondary ml-2">{isSecretVisible(item.id) ? 'Hide' : 'Show'}</a>
                        <a href="#/" onClick={handleCopyToClipboard(getSecretValue(item.id, false), passwordCopyId)} className={`link-primary ml-2 ${isPasswordCopied ? 'text-success' : ''}`} style={{transition: 'color 150ms'}}>{isPasswordCopied ? 'Copied!' : 'Copy'}</a>
                    </>
                    deleteLink = <a href="#/" onClick={deletePassword(item.id)} className="btn btn-sm btn-danger ml-2">Delete</a>
                } else {
                    password = isSecretVisible(item.id) ? item.password : '***'
                    usernameActions = <a href="#/" onClick={handleCopyToClipboard(item.username, usernameCopyId)} className={`link-primary ml-1 ${isUsernameCopied ? 'text-success' : ''}`} style={{transition: 'color 150ms'}}>{isUsernameCopied ? 'Copied!' : 'Copy'}</a>
                    passwordActions = <>
                        <a href="#/" onClick={handleToggleSecretVisibility(item.id)} className="link-primary ml-2">{isSecretVisible(item.id) ? 'Hide' : 'Show'}</a>
                        <a href="#/" onClick={handleCopyToClipboard(item.password, passwordCopyId)} className={`link-primary ml-2 ${isPasswordCopied ? 'text-success' : ''}`} style={{transition: 'color 150ms'}}>{isPasswordCopied ? 'Copied!' : 'Copy'}</a>
                    </>
                }

                const passwordDisplay = editing ? (
                    <div className="d-flex align-items-center">
                        {password}
                        {passwordActions}
                    </div>
                ) : (
                    <div>{password}{passwordActions}</div>
                );

                const usernameDisplay = editing ? (
                    <div className="d-flex align-items-center">
                        {username}
                        {usernameActions}
                    </div>
                ) : (
                    <div>{username}{usernameActions}</div>
                );

                const commentDisplay = editing ? (
                    <div style={{marginRight: '8px'}}>
                        {comment}
                    </div>
                ) : (
                    <div>
                        {item.comment}
                    </div>
                );

                return (<div key={item.id} className="mb-2">
                    <div className="d-flex align-items-center">
                        {commentDisplay}
                        <span className="mx-2">-</span>
                        {usernameDisplay}
                        <span className="mx-2">-</span>
                        {passwordDisplay}
                        {deleteLink && <div className="ml-2">{deleteLink}</div>}
                    </div>
                </div>)
            })
        }

        let title: any = secret.title
        let addLink: any = ''
        let deleteGroupLink: any = ''
        let editButton: any = <a href="#/" onClick={editClick(secret.id)} className="btn btn-sm btn-info">Edit</a>

        if(editing) {
            addLink = <a href="#/" onClick={addItemForGroup(secret.id)} className="btn btn-sm btn-success ml-2">Add</a>
            deleteGroupLink = <a href="#/" onClick={deleteGroup(secret.id)} className="btn btn-sm btn-danger ml-2">Delete Group</a>
            title = <input type="text" className="form-control" value={getTitle(secret.id)} onChange={setEditTitle(secret.id)} placeholder="Group name" />
            editButton = <a href="#/" onClick={editClick(secret.id)} className="btn btn-sm btn-secondary ml-2">Done</a>
        }

        return (
            <div className="row mb-4" key={secret.id}>
                <div className="col-12">
                    <div className="d-flex align-items-center mb-2">
                        {editing ? <div className="form-group mb-0">{title}</div> : <h5 className="mb-0">{title}</h5>}
                        <div className="ml-2">{editButton}</div>
                        {addLink && <div className="ml-2">{addLink}</div>}
                        {deleteGroupLink && <div className="ml-2">{deleteGroupLink}</div>}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {rows}
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        );
    }

    const renderPasswordRows = (passwords: SecretData[]) => {
        return passwords.map((secret: SecretData) => {
            return renderPasswordRow(secret)
        })
    }

    const renderPasswordData = () => {
        if (data.passwords?.length > 0) {
            const rows = renderPasswordRows(data.passwords)

            return (<div className="col-12">{rows}</div>)
        } else {
            return (<div className="col-12">No items</div>)
        }
    }

    const secretRows = renderPasswordData()

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>Password Manager</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>{getPersonName()}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <div className="form-group">
                        <label htmlFor="personSelect">Person</label>
                        <div className="d-flex align-items-center">
                            <select id="personSelect" className="form-control" onChange={personChange} value={personId}>
                                {options}
                            </select>
                            <button className="btn btn-primary btn-sm ml-2" type="button" onClick={load}>Load</button>
                            <button className="btn btn-secondary btn-sm ml-2" type="button" onClick={clear}>Clear</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input id="passwordInput" className="form-control" style={{maxWidth: '250px'}} type="password" onChange={passwordChange} value={password}
                               placeholder="Enter password"/>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h2>Secrets</h2>
                </div>
            </div>
            <div className="row">
                {secretRows}
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <button className="btn btn-primary" type="button" onClick={save}>Save</button>
                    <button className="btn btn-success ml-2" type="button" onClick={add}>Add New Group</button>
                </div>
            </div>
        </div>);
}

const storeToProps = (store: Store): PwdPropsData => {
    return {
        persons: store.persons
    }
}

const dispatch = (dispatch: Dispatch<any>): PwdPropsCallback => {
    return {
        error: (err : string) => {
            dispatch(createActionSendMessage(true, err))
        }
    }
}

const component = connect(storeToProps, dispatch)(Pwd);

export default component;
