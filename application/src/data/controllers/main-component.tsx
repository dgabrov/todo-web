import AppState from "../value/app-state";
import React from "react";
import CdTodo from "../../controls/CdTodo";
import AddLogin from "../../controls/AddLogin";
import Login from "../../controls/Login";
import Todo from "../../controls/Todo";
import EditTodo from "../../controls/EditTodo";
import Bulk from "../../controls/Bulk";
import Starter from "../../controls/Starter";
import Items from "../../controls/items/Items";
import CdItem from "../../controls/items/CdItem";
import CdAttachment from "../../controls/items/CdAttachment";
import EditItem from "../../controls/items/EditItem";
import EditAttachment from "../../controls/items/EditAttachment";
import QuoteWrap from "../../controls/QuoteWrap";

const componentMap: {[key: string] : any} = {}

componentMap[AppState.cdTodo] = <CdTodo />;
componentMap[AppState.addLogin] = <AddLogin />;
componentMap[AppState.login] = <Login />;
componentMap[AppState.bulk] = <Bulk />;
componentMap[AppState.editTodo] = <EditTodo />;
componentMap[AppState.todo] = <Todo />;
componentMap[AppState.starter] = <Starter />;
componentMap[AppState.items] = <Items />;
componentMap[AppState.cdItem] = <CdItem />;
componentMap[AppState.cdAttachment] = <CdAttachment />;
componentMap[AppState.editItem] = <EditItem />;
componentMap[AppState.editAttachment] = <EditAttachment />;
componentMap[AppState.quoteWrap] = <QuoteWrap />;


export const mainComponent = (state: AppState) : any => {
    return componentMap[state];
}

