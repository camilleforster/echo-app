import React from "react";
import { render, RenderAPI } from "@testing-library/react-native";
import PageHeader, { PageHeaderProps } from "../../components/PageHeader";
import Theme from "../../../Theme";

/**
 * Renders the PageHeader component wrapped in a ThemeProvider with the default theme.
 *
 * @param props - The props respective to the PageHeader
 */
const renderComponent = (props: PageHeaderProps): RenderAPI =>
  render(
    <Theme>
      <PageHeader {...props} />
    </Theme>,
  );

describe("PageHeader", () => {
  it("renders the header title correctly", () => {
    const testTitle = "Test Page Title";
    const { getByText } = renderComponent({ headerTitle: testTitle });

    expect(getByText(testTitle)).toBeTruthy();
  });
});
