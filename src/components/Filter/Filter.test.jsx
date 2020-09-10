import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import Filter from './Filter'

Enzyme.configure({ adapter: new Adapter() });
describe("Filter", () => {
    it("should render Filter", () => {
        const wrapper = shallow(<Filter />)
    })
})