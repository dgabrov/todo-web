import React, {useState} from "react";
import {QuoteProps} from "../data/props/quote-props";
import {QuotePropsCallback} from "../data/props/quote-props-callback";
import {connect} from "react-redux";
import {textAreaHeight} from "../util/constants";
import {createActionSendMessage} from "../reducer/actions/action-send-message";
import {splitMessage} from "../util/splitter";

const QuoteWrap = (props: QuoteProps) => {

    const [addQuote, setAddQuote] = useState(true);
    const [columns, setColumns] = useState('50');
    const [addBlankLine, setAddBlankLine] = useState(true);
    const [message, setMessage] = useState('');
    const [quote, setQuote] = useState('>');

    function proc() {
        try {
            const maxLength = parseInt(columns);

            if (isNaN(maxLength)) {
                throw Error(`Sorry, cannot parse ${columns} to a valid number`)
            }

            if (maxLength < 20) {
                throw Error(`Sorry, the column value should be at least 20, and currently it is ${maxLength}`)
            }

            const items : string[] = splitMessage(message, maxLength, quote, addQuote, addBlankLine);

            setMessage(items.join("\n"));
        }
        catch (err){
            const message: string = err instanceof Error ? err.message : '';
            props.triggerError(message);

        }
    }

    return (
        <div className="container-fluid">
            <div className="col-12">
                <div className="row">
                    <div className="col-12 form-group">
                        <h1>Quote Message</h1>
                    </div>
                </div>
                <div className="row d-flex flex-row align-items-end">
                    <div className="col-3 form-group">
                        <label htmlFor="idColumns">Columns</label>
                        <input type="text" className="form-control" id="idColumns" value={columns} onChange={(ev) => {setColumns(ev.target.value)}}/>
                    </div>
                    <div className="col-3 form-group">
                        <label htmlFor="idQuote">Quote</label>
                        <input type="text" className="form-control" id="idQuote" value={quote} onChange={(ev) => {setQuote(ev.target.value)}}/>
                    </div>
                    <div className="col-3 form-group d-flex flex-row align-items-center flex-nowrap">
                        <input type="checkbox" id="idAddQuote" checked={addQuote} onChange={(ev) => {setAddQuote(ev.target.checked)}}/>
                        <label htmlFor="idAddQuote" className="ml-2 mb-0">Add Quote</label>
                    </div>
                    <div className="col-3 form-group d-flex flex-row align-items-center flex-nowrap">
                        <input type="checkbox" id="idAddBlankLine" checked={addBlankLine} onChange={(ev) => {setAddBlankLine(ev.target.checked)}}/>
                        <label htmlFor="idAddBlankLine" className="ml-2 mb-0">Add Blank Line</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 form-group">
                        <label htmlFor="idMessage">Message</label>
                        <textarea className="form-control" id="idMessage" style={textAreaHeight} value={message} onChange={(ev) => {setMessage(ev.target.value)}} />
                    </div>
                    <div className="col-12 form-group">
                        <button type="submit" className="btn btn-primary border" onClick={proc}>Process</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const dispatcher = (dispatch: any): QuotePropsCallback => {
    return {
        triggerError : (err: string) => {
            dispatch(createActionSendMessage(true, err));
        }
    }
}

export default connect(null, dispatcher)(QuoteWrap);
