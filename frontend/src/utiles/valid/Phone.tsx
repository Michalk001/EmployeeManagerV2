

export const Phone = (number:string) => {
    const reg = /^\d+$/;
    if ((number.length <= 9 && reg.test(number)) || number === "") {
        return  true
    }
    return false
}