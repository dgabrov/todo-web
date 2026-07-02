export interface Secret {
    id: string;
    username: string;
    password: string;
}

export interface SecretData {
    id: string;
    title: string;
    secrets: Secret[];
}

export interface PasswordData {
    passwords: SecretData[];
}

export interface PasswordBundle {
    personId: string
    password: string
    payload: PasswordData
}

export interface PasswordInputData {
    personId: string
    password: string
}
