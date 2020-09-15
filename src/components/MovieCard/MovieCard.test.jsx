import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./MovieCard";

Enzyme.configure({ adapter: new Adapter() });
describe("MovieCard", () => {
  it("should render MovieCard", () => {
    const wrapper = shallow(<MovieCard />);
  });
});
