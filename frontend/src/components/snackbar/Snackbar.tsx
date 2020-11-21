import React, {FC, ReactNode} from "react"
import {Snackbar as MaterialSnack}  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {TypeAlert, ISnackbarMultiAlert, ISnackbar} from "./types";
import styles from "./style.module.scss"

interface props {
    children:ReactNode,
    severity:TypeAlert
    onClose:() => void
}




const Alert:FC<props> = (props) =>{
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const Snackbar:FC<ISnackbar> = (props) =>{
    const {text,isOpen,onClose,hideDuration,typeAlert} = props;

    return(
        <MaterialSnack open={isOpen} onClose={onClose}  autoHideDuration={hideDuration}>
            <Alert onClose={onClose} severity={typeAlert}>
                <div className={`${styles[`snackbar__alert`]}`}>
                    {text}
                </div>
            </Alert>
        </MaterialSnack>
    )

}



export const SnackbarMultiAlert:FC<ISnackbarMultiAlert> = (props) =>{
    const {alertList,isOpen,onClose,hideDuration , typeAlert} = props
    return(
        <MaterialSnack open={isOpen} autoHideDuration={hideDuration}  >
            <Alert onClose={onClose} severity={typeAlert}>
                {alertList.map(alert => (
                    <div key={alert.text} className={`${styles[`snackbar__alert`]}`}>
                        {alert.text}
                    </div>
               ) )}
            </Alert>
        </MaterialSnack>
    )
}