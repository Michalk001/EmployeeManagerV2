import React, {FC} from "react"

import "./style.scss"
import {Link} from "react-router-dom";

export const  ProfileRedirect:FC<{value:string, path:string,isAdmin:boolean}> = ({value,path}) =>{

    return (
        <Link className={`profile-redirect`} to={path} >
            {value}
        </Link>
    )

}