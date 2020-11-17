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
    hideDuration:number
}

export interface IAlertList {
    text:string
}