import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Theme from "../../../Theme";
import GradientSwitch, {
  GradientSwitchProps,
} from "../../components/GradientSwitch";

/**
 * Renders the GradientSwitch component wrapped in a ThemeProvider with the default theme.
 *
 * @param props - The props respective to the GradientSwitch
 */
const renderComponent = (props: GradientSwitchProps) => {
  return render(
    <Theme>
      <GradientSwitch {...props} />
    </Theme>,
  );
};

describe("GradientSwitch", () => {
  const onToggle = jest.fn();

  afterEach(() => {
    onToggle.mockClear();
  });

  it("renders the switch with the correct initial value", () => {
    const { getByTestId } = renderComponent({ value: true, onToggle });
    const switchElement = getByTestId("switch");

    expect(switchElement.props.accessibilityState.checked).toBe("checked");
  });

  it("calls onToggle when the switch is pressed", () => {
    const { getByTestId } = renderComponent({ value: false, onToggle });
    const switchElement = getByTestId("switch");

    expect(switchElement.props.accessibilityState.checked).toBe("unchecked");

    fireEvent(switchElement, "onValueChange");
    expect(onToggle).toHaveBeenCalled();
  });
});
