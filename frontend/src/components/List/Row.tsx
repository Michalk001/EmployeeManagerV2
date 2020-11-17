import React, {FC, ReactNode} from "react"
import {Link} from "react-router-dom";

enum typeRow {
    listRow="",
    titleRow="list__row--title",
}

const Row:FC<{ children: ReactNode,typeClass:typeRow  }> = ({children,typeClass}) =>{

    return <div className={`list__row ${typeClass}`}>
        {children}
    </div>
}

export const ListRow:FC<{children:ReactNode}> = ({children}) =>{
        return <Row typeClass={typeRow.listRow} >
            {children}
        </Row>
}

export const TitleRow:FC<{children:ReactNode}> = ({children}) =>{
    return <Row typeClass={typeRow.titleRow} >
        {children}
    </Row>
}

export const LinkRow:FC<{children:ReactNode,path:string}> = ({children,path}) =>{
    return <Link  to={path}  className={`list__row list__row--link`} >
        {children}
    </Link>
}