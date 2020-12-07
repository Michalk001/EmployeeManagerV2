import {IsEmpty} from "./IsEmpty";

describe("isEmpty Test", () =>{
    it("check empty string", () =>{
        const string = ""
        const result = IsEmpty(string)
        expect(result).toBeTruthy()
    })
    it("check not empty string", () =>{
        const string = "notEmpty"
        const result = IsEmpty(string)
        expect(result).toBeFalsy()
    })
})
