import React, {FC, ReactNode} from "react"
import {Snackbar as MaterialSnack}  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {TypeAlert} from "./types";


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
    onClose: (choose:boolean) => void,
    hideDuration:number
    typeAlert:TypeAlert
}
export const Snackbar:FC<ISnackbar> = ({text,isOpen,onClose,hideDuration,typeAlert}) =>{

    return(
        <MaterialSnack open={isOpen} onClose={() =>onClose(false)}  autoHideDuration={hideDuration}>
            <Alert onClose={() =>onClose(false)} severity={typeAlert}>{text}</Alert>
        </MaterialSnack>
    )

}