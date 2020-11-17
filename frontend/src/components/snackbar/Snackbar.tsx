import React, {FC, ReactNode} from "react"
import {Snackbar as MaterialSnack}  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {TypeAlert, ISnackbarMultiAlert} from "./types";


interface props {
    children:ReactNode,
    severity:TypeAlert
    onClose:() => void
}

const Alert:FC<props> = (props) =>{
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface  ISnackbar {
    text:string,
    isOpen:boolean,
    onClose: () => void,
    hideDuration:number
    typeAlert:TypeAlert
}
export const Snackbar:FC<ISnackbar> = (props) =>{
    const {text,isOpen,onClose,hideDuration,typeAlert} = props;

    return(
        <MaterialSnack open={isOpen} onClose={onClose}  autoHideDuration={hideDuration}>
            <Alert onClose={onClose} severity={typeAlert}>{text}</Alert>
        </MaterialSnack>
    )

}



export const SnackbarMultiAlert:FC<ISnackbarMultiAlert> = (props) =>{
    const {alertList,isOpen,onClose,hideDuration , typeAlert} = props
    return(
        <MaterialSnack open={isOpen} onClose={onClose}  autoHideDuration={hideDuration}>
            <Alert onClose={onClose} severity={typeAlert}>
                {alertList.map(alert => (
                    <div>
                        {alert.text}
                    </div>
               ) )}
            </Alert>
        </MaterialSnack>
    )
}