import {typeButton} from "../../button";
import React from "react";

export interface IConfirmAlert {
    content:string,
    isOpen:boolean,
    buttons :{
        label:string,
        typeButton: typeButton,
        onClick: (e:  React.MouseEvent<HTMLButtonElement>) => void,
        id:string
    }[]
}