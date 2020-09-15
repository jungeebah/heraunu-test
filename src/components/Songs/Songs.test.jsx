import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Songs from "./Songs";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("Songs", () => {
  it("should render Songs", () => {
    const wrapper = shallow(<Songs />);
  });
});
