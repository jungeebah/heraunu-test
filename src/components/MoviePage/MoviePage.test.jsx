import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviePage from "./MoviePage";

Enzyme.configure({ adapter: new Adapter() });
describe("MoviePage", () => {
  it("should render MoviePage", () => {
    const wrapper = shallow(<MoviePage />);
  });
});
