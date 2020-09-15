import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AutoComplete from "./AutoComplete";

Enzyme.configure({ adapter: new Adapter() });
describe("AutoComplete", () => {
  it("should render AutoComplete", () => {
    const wrapper = shallow(<AutoComplete />);
  });
});
