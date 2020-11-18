import React, {FC} from "react";


export const ListMessage:FC<{value:string}> = ({value}) =>{
        return(
            <div className={`list__message`}>{value}</div>
        )
}

