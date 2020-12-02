import React, {ChangeEvent} from "react";
import {shallow} from 'enzyme';
import Input from "./Input"
import {TypeInput} from "./duck/types";


describe('Input Test',() => {

    const testData = {
        value: "Test",
        id:"idTest",
        name:"idTest",
        type:TypeInput.text,
        labelName: "LabelTest"
    }

    it("Render Value", () =>{
        const mockFn = jest.fn();
        const input = shallow(<Input {...testData} onChange={mockFn} />)
        const result = input.find(`input[id="${testData.id}"]`).first();
        expect(result.getElement().props.value).toBe(testData.value);
    })
    it("Is Type Password Input",() =>{
        const mockFn = jest.fn();
        const input = shallow(<Input {...testData} onChange={mockFn} type={TypeInput.password} />)
        const result = input.find(`input[id="${testData.id}"]`).first();
        expect(result.getElement().props.type).toBe("password");
    })
    it("Is Text Input",() =>{
        const mockFn = jest.fn();
        const input = shallow(<Input {...testData} onChange={mockFn} type={TypeInput.text} />)
        const result = input.find(`input[id="${testData.id}"]`).first();
        expect(result.getElement().props.type).toBe("text");
    })
    it("Show Password Input",() =>{
        const mockFn = jest.fn();
        const input = shallow(<Input {...testData} onChange={mockFn} type={TypeInput.password} />)
        const changeTypeInput = input.find(`.fa-eye`).first();
        changeTypeInput.simulate("click");
        const result = input.find(`input[id="${testData.id}"]`).first();
        expect(result.getElement().props.type).toBe("text");
    })
    it("Required Style",() =>{
        const mockFn = jest.fn();
        const input = shallow(<Input {...testData} onChange={mockFn} showRequired={false}  />)
        const result = input.find(`input[id="${testData.id}"]`).first();
        expect(result.find(".input--required")).toBeTruthy();
    })
    it("Unrequited Style",() =>{
        const mockFn = jest.fn();
        const input = shallow(<Input {...testData} onChange={mockFn} showRequired={false} />)
        const result = input.find(`input[id="${testData.id}"]`).first();
        expect(result.find(".input--required")).toEqual({})
    })
    it("Set Label",() =>{
        const mockFn = jest.fn();
        const wrapper = shallow(<Input {...testData} onChange={mockFn}  />)
        const label = wrapper.find("label").first()
        expect(label.text()).toBe(testData.labelName);
    })
    it("Change Data",() =>{
        let testValue = "test1234"
        const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
            testValue = e.target.value
        }
        const wrapper = shallow(<Input {...testData} value={testValue} onChange={handleChange}  />)
        const input = wrapper.find(`input[id="${testData.id}"]`).first()
        const testChange = "test Change"
        input.simulate('change',{target:{value: testChange}})
        wrapper.update()
        expect(testValue).toBe(testChange);
    })
})