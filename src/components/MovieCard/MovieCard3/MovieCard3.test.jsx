import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import MovieCard2 from './MovieCard3'

Enzyme.configure({ adapter: new Adapter() });
describe("MovieCard2", () => {
    it("should render MovieCard2", () => {
        const wrapper = shallow(<MovieCard2 />)
    })
})