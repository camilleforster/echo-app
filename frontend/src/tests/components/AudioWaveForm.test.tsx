import React from "react";
import { render } from "@testing-library/react-native";
import AudioWaveForm from "../../components/AudioWaveForm";
import Theme from "../../../Theme";

/**
 * Renders the AudioWaveForm component wrapped in a ThemeProvider with the default theme.
 *
 * @param meteringArray - The array of metering data points to be passed to AudioWaveForm
 */
const renderComponent = (meteringArray: number[] = []) =>
  render(
    <Theme>
      <AudioWaveForm meteringArray={meteringArray} />
    </Theme>,
  );

describe("AudioWaveForm", () => {
  it("renders LevelBars correctly given meteringArray", () => {
    const meteringArray = [-20, -15, -30, 0, -5];

    const { getAllByTestId } = renderComponent(meteringArray);

    const bars = getAllByTestId("levelBar");
    expect(bars.length).toBe(meteringArray.length);
  });

  it("renders correclty with empty meteringArray", () => {
    const { getByTestId } = renderComponent();
    const container = getByTestId("waveform-container");
    expect(container).toBeTruthy();
    expect(container.children.length).toBe(0);
  });
});
