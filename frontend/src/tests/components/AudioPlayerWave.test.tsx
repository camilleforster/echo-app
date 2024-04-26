import React from "react";
import { render } from "@testing-library/react-native";
import Theme from "../../../Theme";
import AudioPlayerWave from "../../components/AudioPlayerWave";

/**
 * Renders the AudioPlayerWave component wrapped in a ThemeProvider with the default theme.
 */
const renderComponent = () =>
  render(
    <Theme>
      <AudioPlayerWave meteringArray={[-18, -20]} />
    </Theme>,
  );

describe("AudioPlayerWave", () => {
  it("renders the background image", () => {
    const { getByTestId } = renderComponent();

    const background = getByTestId("audio-player-background");
    expect(background.props.source).toEqual(
      {
        source: require("../../assets/player-background.png"),
      }.source,
    );
  });
});
