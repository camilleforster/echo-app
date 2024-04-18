import React from "react";
import { render } from "@testing-library/react-native";
import Theme from "../../../Theme";
import Label, { LabelProps } from "../../components/Label";
import { LabelType, LabelSize } from "../../types/LabelType";

/**
 * Renders the Label component wrapped in a ThemeProvider with the default theme.
 *
 * @param props - The props respective to the Label
 */
const renderComponent = (props: LabelProps) =>
  render(
    <Theme>
      <Label {...props} />
    </Theme>,
  );

describe("Label", () => {
  it("renders correctly with Solid type and Regular size", () => {
    const { getByTestId } = renderComponent({
      type: LabelType.Solid,
      size: LabelSize.Regular,
      children: "Test",
    });

    const label = getByTestId("label");
    expect(label.props.style).toMatchObject({
      backgroundColor: "#2D2F34",
      borderColor: "transparent",
      width: 45,
    });
  });

  it("renders correctly with Outlined type and Small size", () => {
    const { getByTestId } = renderComponent({
      type: LabelType.Outlined,
      size: LabelSize.Small,
      children: "Test",
    });

    const label = getByTestId("label");
    expect(label.props.style).toMatchObject({
      backgroundColor: "transparent",
      borderColor: "#2D2F34",
      width: 22,
    });
  });
});
