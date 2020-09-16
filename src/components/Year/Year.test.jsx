import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Year from "./Year";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("Year", () => {
  it("should render Year", () => {
    const wrapper = shallow(<Year />);
  });
});
