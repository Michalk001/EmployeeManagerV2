
export const getStatus = (status:boolean) =>{
    console.log(status)
    if(status)
        return "Active"
    else
        return "Inactive"
}