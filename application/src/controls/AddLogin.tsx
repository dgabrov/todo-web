import AddLoginProps from "../data/props/addlogin/add-login-props";
import React, {useEffect, useState} from "react";
import Store from "../data/store/store";
import AddLoginPropsCallback from "../data/props/addlogin/add-login-props-callback";
import AddLoginPropsData from "../data/props/addlogin/add-login-props-data";
import LoginData from "../data/value/login-data";
import {connect} from "react-redux";
import {createEffectLoginAdditionalPerson} from "../reducer/effects/effect-login-additional-person";
import {createEffectLogoutAdditionalPerson} from "../reducer/effects/effect-logout-additional-person";
import {processKeyDown, setFocus} from "../util/util-ui-functions";

const AddLogin = (props: AddLoginProps) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    let loginField: any;

    useEffect(() => {
        setFocus(loginField!!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = (event: React.MouseEvent<HTMLAnchorElement>, personId: string) => {
        event.stopPropagation();
        event.preventDefault();

        props.logout(personId);
    }

    const triggerLogin = (): void => {
        const loginData: LoginData = {login, password};

        props.login(loginData);

        // at least the password delete, if not the user as well
        setPassword('');
        loginField!!.focus();
        loginField!!.select();
    }

    // render the users
    let index = 0;
    const personRows = props.persons.map((person) => {
        index = index + 1;

        return (
            <tr key={person.personId}>
                <td>{index}</td>
                <td>{person.name}</td>
                <td>{person.login}</td>
                <td><a href="/" onClick={(event) => {
                    logout(event, person.personId)
                }}>logout</a></td>
            </tr>
        );

    });

    return (
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-12">
                    <h1>Change Login</h1>
                    <p>You are currently logged in as:</p>
                    <table className="table table-bordered table-sm border">
                        <thead>
                        <tr>
                            <td>Nr</td>
                            <td>Name</td>
                            <td>Login</td>
                            <td>logout</td>
                        </tr>
                        </thead>
                        <tbody>
                        {personRows}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row m-1 mt-5">
                <div className="col-sm-12 col-md-4 col-lg-4 p-3 bg-light border rounded">
                    <h2>Add Login</h2>
                    <div className="form-group">
                        <label htmlFor="loginEdit">Login</label>
                        <input type="text" className="form-control" id="loginEdit"
                               value={login}
                               ref={(element)=>{loginField = element}}
                               onKeyDown={processKeyDown(triggerLogin, null, false)}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setLogin(e.target.value);
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password</label>
                        <input type="password" className="form-control" id="pwd"
                        value={password}
                        onKeyDown={processKeyDown(triggerLogin, null, false)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}/>
                    </div>
                    <button type="submit" className="btn btn-primary border" onClick={triggerLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: Store): AddLoginPropsData => {
    return {
        persons: store.persons
    }
}

const dispatch = (dispatch: any): AddLoginPropsCallback => {
    return {
        login: (data: LoginData): void => {
            dispatch(createEffectLoginAdditionalPerson(data));
        },
        logout: (personId: string): void => {
            dispatch(createEffectLogoutAdditionalPerson(personId));
        }
    }
}

export default connect(storeToProps, dispatch)(AddLogin);
