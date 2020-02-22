import React from "react";
import { render } from "@testing-library/react";
import { ButtonLink } from "components";
import { BrowserRouter as Router } from "react-router-dom";
import "jest-styled-components";

test("Link button rendering", () => {
  const { container } = render(
    <Router>
      <ButtonLink to="/about">Hello World!</ButtonLink>
      <ButtonLink to="/about" secondary={true}>
        Hello World!
      </ButtonLink>
    </Router>,
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(container.lastChild).toMatchSnapshot();
});
