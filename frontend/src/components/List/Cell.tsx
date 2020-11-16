import React, {FC} from "react";

import "./style.scss"

interface props {
    typeClass:string
}

enum typeCell {
    wide="list__cell--wide",
    normal="list__cell--normal",
    small="list__cell--small"
}

const Cell:FC<{typeClass:typeCell,value:string|number}> = ({typeClass,value}) =>{
    return <div className={`list__cell ${typeClass}`}>{value}</div>
}

export const CellWide:FC<{value:string|number}> = ({value}) =>{
    return <Cell typeClass={typeCell.wide} value={value} />
}

export const CellNormal:FC<{value:string|number}> = ({value}) =>{
    return <Cell typeClass={typeCell.normal} value={value} />
}

export const CellSmall:FC<{value:string|number}> = ({value}) =>{
    return <Cell typeClass={typeCell.small} value={value} />
}