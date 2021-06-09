import LoginProps from "../data/props/login/login-props";
import React, {useEffect, useState} from "react";
import Store from "../data/store/store";
import LoginPropsData from "../data/props/login/login-props-data";
import LoginPropsCallback from "../data/props/login/login-props-callback";
import {connect} from "react-redux";
import LoginData from "../data/value/login-data";
import {createEffectLogin} from "../reducer/effects/effect-login";
import {processKeyDown, setFocus} from "../util/util-ui-functions";

const Login = (props: LoginProps) => {

    const [login, setLogin] = useState(props.initialLogin);
    const [password, setPassword] = useState('');

    let loginField : HTMLInputElement|null;

    useEffect(() => {
        setFocus(loginField!!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = (event: React.FormEvent) => {
        // this is triggered part of a form submit, so first we need to ensure the event will not bubble or do the default
        event.preventDefault();
        event.stopPropagation();

        props.submit({login, password});
    }

    const changeLogin = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = ev.target.value;
        setLogin(val);
    }

    const changePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = ev.target.value;
        setPassword(val);
    }

    return (
        <main role="main">
            <div className="jumbotron">
                <div className="container-fluid">
                    <h1 className="display-3">To-Do</h1>
                    <p>To-Do list manager</p>
                </div>
            </div>

            <div className="container-fluid">
                <form onSubmit={submit}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-12 col-md-4 col-lg-4 border rounded p-3">
                            <div className="form-group">
                                <label htmlFor="loginEdit">Login</label>
                                <input type="text" className="form-control" id="loginEdit"
                                       onKeyDown={processKeyDown(submit, null, false)}
                                       value={login} onChange={changeLogin} ref={(field) => {loginField = field}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Password</label>
                                <input type="password" className="form-control" id="pwd"
                                       onKeyDown={processKeyDown(submit, null, false)}
                                       value={password} onChange={changePassword}/>
                            </div>
                            <button type="submit" className="btn btn-primary border">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

const storeToProps = (store: Store) : LoginPropsData => {
    return {
        initialLogin: store.initialLogin
    };
}

const dispatch = (dispatch: any) : LoginPropsCallback => {
    return {
        submit: (loginData: LoginData): void =>  {
            dispatch(createEffectLogin(loginData));
        }
    }
}

export default connect(storeToProps, dispatch)(Login);
