import * as React from "react";
import {
  Background,
  Container,
  LabelContainer,
} from "./styles/AudioPlayerWave.styled";
import { LabelType, LabelSize } from "../types/LabelType";
import Label from "./Label";

/**
  Contains the audio playback waveform and note descriptions of the selected audio
 */
const AudioPlayerWave = () => {
  return (
    <Container>
      <LabelContainer>
        {/* TODO: Connect with time */}
        <Label type={LabelType.Outlined} size={LabelSize.Regular}>
          C
        </Label>
      </LabelContainer>
      {/* TODO: Insert Audio Wave */}
      <Background
        testID="audio-player-background"
        source={require("../assets/player-background.png")}
      />
    </Container>
  );
};

export default AudioPlayerWave;
