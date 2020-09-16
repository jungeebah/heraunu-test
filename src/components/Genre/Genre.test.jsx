import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Genre from "./Genre";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("Genre", () => {
  it("should render Genre", () => {
    const wrapper = shallow(<Genre />);
  });
});
