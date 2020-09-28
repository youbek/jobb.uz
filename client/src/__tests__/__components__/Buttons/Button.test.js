import React from "react";
import { render } from "@testing-library/react";
import { Button } from "components";
import "jest-styled-components";

test("Button component rendering", () => {
  const { container: primaryButton } = render(<Button>Hello World!</Button>);
  const { container: secondaryButton } = render(
    <Button secondary>Hello World!</Button>,
  );
  const { container: greyButton } = render(<Button grey>Hello World!</Button>);

  expect(primaryButton.firstChild).toMatchSnapshot();
  expect(secondaryButton.firstChild).toMatchSnapshot();
  expect(greyButton.firstChild).toMatchSnapshot();
});
