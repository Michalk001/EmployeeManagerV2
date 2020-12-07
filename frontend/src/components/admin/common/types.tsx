

export interface IProfileAction {
    value:string,
    isActive:boolean,
    id:string,
    path:string,
    onClickRemove: (id:string) => void,
    onClickRestore: (id:string) => void,
    onClickDelete: (id:string) => void

}