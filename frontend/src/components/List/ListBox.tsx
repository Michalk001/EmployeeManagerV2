import React, {FC, ReactNode} from "react";
import "./style.scss"

interface props {
    children:ReactNode
}

export const ListBox:FC<props> =({children})=>{
    return<div className={`list`}>
        {children}
    </div>
}