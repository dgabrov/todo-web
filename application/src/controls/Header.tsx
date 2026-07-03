import HeaderProps from "../data/props/header/header-props";
import Store from "../data/store/store";
import HeaderPropsData from "../data/props/header/header-props-data";
import HeaderPropsCallback from "../data/props/header/header-props-callback";
import React from "react";
import {connect} from "react-redux";
import MessageData from "../data/value/message-data";
import {createActionSetLocation} from "../reducer/actions/action-set-location";
import AppState from "../data/value/app-state";
import {createEffectLogout} from "../reducer/effects/effect-logout";

const Header = (props: HeaderProps) => {

    const home = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.loggedIn) {
            props.todo();
        }
        else {
            props.login();
        }
    }

    const login = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.login();
    }

    const logout = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.logout();
    }

    const todo = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.todo();
    }

    const addLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.addLogin();
    }

    const items = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.items();
    }

    const quoteWrap = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.quoteWrap();
    }

    const totp = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.totp();
    }

    const pwd = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();

        props.pwd();
    }

    // depending whether it is logged in or not, display the adequate values
    let loggedInPersons = 'Not logged in';
    let component =
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" onClick={login} href="/">Login</a>
            </li>
        </ul>;

    let messageComponents = props.messages.map((message: MessageData) => {
        const classValue = message.error ? "alert alert-danger" : "alert alert-success";

        return (
            <div key={message.id} className={classValue}>{message.message}</div>
        );

    });

    if (props.loggedIn) {

        loggedInPersons = props.persons.map((person) => {return person.login; }).join(', ');

        component = <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" onClick={logout} href="/">Logout</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={todo} href="/">To-Do</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={items} href="/">Items</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={addLogin} href="/">Add Login</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={quoteWrap} href="/">Quote Wrap</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={totp} href="/">Totp</a>
            </li>

            <li className="nav-item">
                <a className="nav-link" onClick={pwd} href="/">Pass</a>
            </li>
        </ul>
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a className="navbar-brand" onClick={home} href="/">To-Do</a>
                {component}
                <li className="navbar-text justify-content-end">{loggedInPersons}</li>
            </nav>
            {messageComponents}
        </div>
    );
}

const storeToProps = (store: Store) : HeaderPropsData => {
    const persons = store.persons;
    const loggedIn: boolean = persons.length > 0;
    const messages = store.messages;

    return {
        loggedIn,
        persons,
        messages
    };
}

const dispatch = (dispatch: any) : HeaderPropsCallback => {
    return {
        login: () => {
            dispatch(createActionSetLocation(AppState.login));
        },
        logout: () => {
            dispatch(createEffectLogout());
        },
        todo: () => {
            dispatch(createActionSetLocation(AppState.todo));
        },
        addLogin: () => {
            dispatch(createActionSetLocation(AppState.addLogin));
        },
        items() {
            dispatch(createActionSetLocation(AppState.items));
        },
        quoteWrap() {
            dispatch(createActionSetLocation(AppState.quoteWrap));
        }, totp() {
            dispatch(createActionSetLocation(AppState.totp));
        }, pwd() {
            dispatch(createActionSetLocation(AppState.pwd));
        }
    }
}

export default connect(storeToProps, dispatch)(Header);
