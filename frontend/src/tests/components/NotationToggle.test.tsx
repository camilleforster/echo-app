import React from "react";
import { render, fireEvent, RenderAPI } from "@testing-library/react-native";
import NotationToggle, { NotationToggleProps } from "../../components/NotationToggle";
import Theme from "../../../Theme";
import { NotationType } from "../../types/NotationType";

/**
 * Renders the NotationToggle component wrapped in a ThemeProvider with the default theme.
 *
 * @param props - The props respective to the NotationToggle
 */
const renderComponent = (props: NotationToggleProps): RenderAPI =>
    render(
        <Theme>
            <NotationToggle {...props} />
        </Theme>
    );

describe("NotationToggle", () => {
    const handleClick = jest.fn();

    afterEach(() => {
        handleClick.mockClear();
    });

    it("renders correctly with Sharp selected", () => {
        const { getByTestId } = renderComponent({ selectedValue: NotationType.Sharp, onClick: handleClick });
        expect(getByTestId("sharp-button")).toBeTruthy();
        expect(getByTestId("flat-button")).toBeTruthy();
    });

    it("calls onClick with Sharp when '#' is pressed", () => {
        const { getByTestId } = renderComponent({ selectedValue: NotationType.Flat, onClick: handleClick });

        const sharpButton = getByTestId("sharp-button");
        fireEvent.press(sharpButton);
        expect(handleClick).toHaveBeenCalledWith(NotationType.Sharp);
    });

    it("calls onClick with Flat when 'b' is pressed", () => {
        const { getByTestId } = renderComponent({ selectedValue: NotationType.Sharp, onClick: handleClick });

        const flatButton = getByTestId("flat-button");
        fireEvent.press(flatButton);
        expect(handleClick).toHaveBeenCalledWith(NotationType.Flat);
    });
});
