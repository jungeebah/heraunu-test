import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import MenuDrawer from './MenuDrawer'

Enzyme.configure({ adapter: new Adapter() });
describe("MenuDrawer", () => {
    it("should render MenuDrawer", () => {
        const wrapper = shallow(<MenuDrawer />)
    })
})