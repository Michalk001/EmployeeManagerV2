import {Phone} from "./Phone";

describe("Phone Valid Test", () =>{

    it("correct number",() =>{
        const number = "532165273"
        const res = Phone(number)
        expect(res).toBeTruthy()
    })
    it("incorrect number with char",() =>{
        const number = "532165a73"
        const res = Phone(number)
        expect(res).toBeFalsy()
    })
    it("number to long",() =>{
        const number = "5321657311"
        const res = Phone(number)
        expect(res).toBeFalsy()
    })

})