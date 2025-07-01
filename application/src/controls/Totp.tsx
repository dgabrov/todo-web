import React, {useState} from "react";
import * as OTPAuth from "otpauth";
import {TOTP_DEFAULT_CHARACTERS, TOTP_DEFAULT_DURATION} from "../util/constants";

const changeSupport = (processor: (vl: any) => void) => {
    return (ev: any) => {
        processor(ev?.target?.value);
    }
}

const Totp = () => {

    const [hash, setHash] = useState('')
    const [chars, setChars] = useState(TOTP_DEFAULT_CHARACTERS)
    const [duration, setDuration] = useState(TOTP_DEFAULT_DURATION)
    const [value, setValue] = useState('')
    const [err, setErr] = useState('')

    const process = () => {
        try {
            let strChars = chars.trim()
            if (strChars.length === 0) {
                strChars = TOTP_DEFAULT_CHARACTERS
            }
            const nrChars = parseInt(strChars);

            let strDuration = duration.trim();
            if (strDuration.length === 0) {
                strDuration = TOTP_DEFAULT_DURATION
            }

            const nrDuration = parseInt(strDuration)

            let totp = new OTPAuth.TOTP({
                digits: nrChars,
                period: nrDuration,
                secret: hash,
            });

            const token = totp.generate()

            setValue(token)
        } catch (err){
            setErr('' + err)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row m-1">
                <div className="col-12  col-md-6 col-lg-4 form-group error-red">
                    <div>{err}</div>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-12  col-md-6 col-lg-4 form-group">
                    <label htmlFor="idhash">Hash</label>
                    <input className="form-control" type="text" id="idhash" value={hash}
                           onChange={changeSupport(setHash)}/>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-12  col-md-6 col-lg-4 form-group">
                    <label htmlFor="idchars">Characters (6)</label>
                    <input className="form-control" type="text" id="idchars" value={chars}
                           onChange={changeSupport(setChars)}/>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-12  col-md-6 col-lg-4 form-group">
                    <label htmlFor="idduration">Duration</label>
                    <input className="form-control" type="text" id="idduration" value={duration}
                           onChange={changeSupport(setDuration)}/>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-12  col-md-6 col-lg-4 form-group">
                    <div>Totp: <strong>{value}</strong></div>
                </div>
            </div>
            <div className="row m-1">
                <div className="col-12  col-md-6 col-lg-4 form-group">
                    <button className="btn btn-info border" onClick={process}>Process...</button>
                </div>
            </div>
        </div>

    )
}

export default Totp