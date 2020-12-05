

export const Phone = (number:string) => {
    const reg = /^\d+$/;
    return number.length <= 9 && reg.test(number);

}