import LoginData from "../../value/login-data";

export default interface LoginPropsCallback {
    submit (loginData: LoginData) : void;
}
