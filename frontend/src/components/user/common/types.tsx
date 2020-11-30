import {IOptionLabel} from "../../common/profileRedirect/ProfileRedirect";
import {typeButton} from "../../button";
import React from "react";

export interface IProjectList {

    optionLabel?:IOptionLabel[],
    items:Item[],
    label:string,
}

export interface Item {
    label:string,
    id:string,
    path:string
}

export interface IButtonBarOptions {
    label:string,
    onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
    show:ShowType,
    type:typeButton
}

export enum ShowType{
    USER,
    ADMIN,
    ALL,
    AdminOrUser
}