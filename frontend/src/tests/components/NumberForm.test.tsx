import React from "react";
import { render, fireEvent, RenderAPI } from "@testing-library/react-native";
import NumberForm, { NumberFormProps } from "../../components/NumberForm";
import Theme from "../../../Theme";

/**
 * Renders the PageHeader component wrapped in a ThemeProvider with the default theme.
 *
 * @param props - The props respective to the NumberForm
 */
const renderComponent = (props: NumberFormProps): RenderAPI =>
    render(
      <Theme>
        <NumberForm {...props} />
      </Theme>
    );

describe("NumberForm", () => {
    it("displays the correct initial value", () => {
        const { getByText } = renderComponent({ value: 5, onIncrease: jest.fn(), onDecrease: jest.fn() });
        expect(getByText("5")).toBeTruthy();
    });

    it("calls onIncrease when the '+' button is pressed", () => {
        const handleIncrease = jest.fn();
        const { getByTestId } = renderComponent({ value: 5, onIncrease: handleIncrease, onDecrease: jest.fn() });

        const plusButton = getByTestId("plus-button");
        fireEvent.press(plusButton);
        expect(handleIncrease).toHaveBeenCalledTimes(1);
    });

    it("calls onDecrease when the '-' button is pressed", () => {
        const handleDecrease = jest.fn();
        const { getByTestId } = renderComponent({ value: 5, onIncrease: jest.fn(), onDecrease: handleDecrease });

        const minusButton = getByTestId("minus-button");
        fireEvent.press(minusButton);
        expect(handleDecrease).toHaveBeenCalledTimes(1);
    });

    it("disables '-' button when value is 0", () => {
        const { getByTestId } = renderComponent({ value: 0, onIncrease: jest.fn(), onDecrease: jest.fn() });
        const minusButton = getByTestId("minus-button");
        expect(minusButton.props.accessibilityState.disabled).toBeTruthy();
    });

    it("disables '+' button when value is 10", () => {
        const { getByTestId } = renderComponent({ value: 10, onIncrease: jest.fn(), onDecrease: jest.fn() });
        const plusButton = getByTestId("plus-button");
        expect(plusButton.props.accessibilityState.disabled).toBeTruthy();
    });
});  