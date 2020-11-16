import React, {FC, ReactNode} from "react";

import "./style.scss"

interface props {
    children:ReactNode
}

export const BoxWide:FC<props> = ({children}) =>{
    return(
        <div className={`box box--wide`}>
            {children}
        </div>
    )
}

