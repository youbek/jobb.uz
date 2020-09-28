import React from "react";
import { render } from "@testing-library/react";

import { CustomCheckbox } from "components";

test("CustomCheckbox rendering", () => {
  const { container: checkBox } = render(
    <CustomCheckbox defaultChecked={true} />,
  );

  expect(checkBox.firstChild.getAttribute("type")).toBe("checkbox");

  expect(checkBox.firstChild).toMatchSnapshot();
});
