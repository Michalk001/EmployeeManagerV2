import React, {ChangeEvent} from "react";
import {mount, shallow} from 'enzyme';
import InputSelect, {optionType} from "./InputSelect";


describe("Test Input Select", ()=>{

    const optionTest:optionType[] = [
        {value:"testValue1",label:"testLabel1"}
    ]

    it("Render", ()=>{
        const mockFn = jest.fn();
        const id = `SelectTest`;
        const wrapper = mount(<InputSelect options={[]} value={undefined} onChange={mockFn} id={id} />)
        const result = wrapper.find(`input[id="${id}"]`).first();
        expect(result.props().id).toBe(id)
    })

})