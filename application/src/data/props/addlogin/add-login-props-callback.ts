import LoginData from "../../value/login-data";

export default interface AddLoginPropsCallback {
    login(data: LoginData): void;

    logout(personId: string) : void;
}