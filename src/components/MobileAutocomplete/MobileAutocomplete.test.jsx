import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import MobileAutocomplete from './MobileAutocomplete'

Enzyme.configure({ adapter: new Adapter() });
describe("MobileAutocomplete", () => {
    it("should render MobileAutocomplete", () => {
        const wrapper = shallow(<MobileAutocomplete />)
    })
})