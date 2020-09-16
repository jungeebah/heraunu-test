import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Body from "./Body";

Enzyme.configure({ adapter: new Adapter() });
describe("Body", () => {
  it("should render Body", () => {
    const wrapper = shallow(<Body />);
  });
});
