import React from "react";
import renderer from "react-test-renderer";
import Repositories from "../components/Repositories";

test("renders correctly", () => {
  // Mock props for the Repositories component
  const repos_url = "https://api.github.com/users/wowntb/repos";

  // Create a snapshot of the Repositories component with props
  const tree = renderer.create(<Repositories repos_url={repos_url} />).toJSON();

  // Compare the rendered component tree with the saved snapshot
  expect(tree).toMatchSnapshot();
});
