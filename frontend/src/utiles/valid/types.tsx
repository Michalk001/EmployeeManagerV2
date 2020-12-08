export enum PasswordErrorType{
    LEAST_LENGTH="leastLeast",
    DIFFERENT_USERNAME="differentUsername",
    LEAST_ONE_UPPERCASE= "leastOneUppercase",
    LEAST_ONE_LOWERCASE= "leastOneLowercase",
    LEAST_ONE_NUMBER= "leastOneNumber",
    NOT_SAME_PASSWORD= "notSamePassword",
}

export enum EmailValidType{
    INVALID_EMAIL="invalidEmail"
}

export interface IInvalidUserForm {
    firstName:boolean,
    lastName:boolean,
    email?:boolean,
    username?:boolean
    password?:boolean
    repeatPassword?:boolean
}

export enum typeValidUserForm  {
    NEW_USER,
    EDIT_USER
}