export default interface HeaderPropsCallback {
    login(): void;

    logout(): void;

    todo(): void;

    items(): void;

    addLogin(): void;

    quoteWrap(): void;
}
