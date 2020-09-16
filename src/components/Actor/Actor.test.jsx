import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Actor from "./Actor";

Enzyme.configure({ adapter: new Adapter() });
describe("Actor", () => {
  it("should render Actor", () => {
    const wrapper = shallow(<Actor />);
  });
});
