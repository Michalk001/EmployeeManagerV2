export enum TypeAlert{
    error="error",
    warning="warning",
    info="info",
    success="success"

}

export interface ISnackbarMultiAlert {
    alertList:IAlertList[],
    typeAlert:TypeAlert,
    isOpen:boolean,
    onClose: () => void,
    hideDuration:number|null
}
export interface ISnackbar {
    text:string,
    isOpen:boolean,
    onClose: () => void,
    hideDuration:number|null
    typeAlert:TypeAlert
}

export interface IAlertList {
    text:string
}