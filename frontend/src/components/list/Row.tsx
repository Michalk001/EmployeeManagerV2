import React, {FC, ReactNode} from "react"
import {Link} from "react-router-dom";
import styles from "./style.module.scss"

const Row:FC<{ children: ReactNode,typeClass?:string  }> = ({children,typeClass=""}) =>{

    return <div className={`${styles[`list__row`]} ${typeClass}`}>
        {children}
    </div>
}

export const ListRow:FC<{children:ReactNode}> = ({children}) =>{
        return <Row>
            {children}
        </Row>
}

export const TitleRow:FC<{children:ReactNode}> = ({children}) =>{
    return <Row typeClass={`${styles[`list__row--title`]}`} >
        {children}
    </Row>
}

export const LinkRow:FC<{children:ReactNode,path:string}> = ({children,path}) =>{
    return <Link  to={path}  className={`${styles[`list__row`]} ${styles[`list__row--link`]}`} >
        {children}
    </Link>
}