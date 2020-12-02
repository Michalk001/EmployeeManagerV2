import React, {ChangeEvent} from "react";
import {shallow,mount} from 'enzyme';
import InputTextarea from "./InputTextarea";
import {TypeInput} from "./duck/types";

describe("Inpunt Textarea",() =>{
    const testData = {
        id: "testID",
        labelName:"TestLabel"
    }
    it("Render Label",()=>{
        const mockFn = jest.fn();
        const wrapper = shallow(<InputTextarea {...testData} value={"Test"} onChange={mockFn} name={"testName"}/>)
        const result = wrapper.find('label').first();
        expect(result.text()).toBe(testData.labelName);
    })
    it('Change value',()=>{
        const valueTest = {
            value: "test",
            toChange: "afterChangeValue"
        }
        const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
            valueTest.value = e.target.value
        }
        const wrapper = mount(<InputTextarea {...testData} value={valueTest.value} onChange={handleChange} name={"testName"}/>)
        const input = wrapper.find(`textarea[id="${testData.id}"]`)
        input.simulate("change",{target:{value:valueTest.toChange}})
        expect(valueTest.value).toBe(valueTest.toChange);
    })
})