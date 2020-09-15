import React from "react";
import Enzyme, { shallow } from "enzyme";
import MovieCastnCrew from "./MovieCastnCrew";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("MovieCastnCrew", () => {
  it("should render MovieCastnCrew", () => {
    const wrapper = shallow(<MovieCastnCrew />);
  });
});
