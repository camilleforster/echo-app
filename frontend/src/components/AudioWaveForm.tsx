import React from "react";
import { interpolate } from "react-native-reanimated";
import { WaveformContainer, LevelBar } from "./styles/AudioWaveForm.styled";

type AudioWaveFormProps = {
  meteringArray: number[];
};

/**
 * Renders an audio waveform visualization based on metering data.
 *
 * @param meteringArray - An array of metering data points, with each point representing the audio intensity (in dB) at a given moment
 */
const AudioWaveForm: React.FC<AudioWaveFormProps> = ({ meteringArray }) => {  
  return (
    <WaveformContainer testID="waveform-container">
      {meteringArray.map((metering, index) => {
        const height = interpolate(metering, [-60, 0], [-10, 90]);

        return <LevelBar key={index} height={height} testID="levelBar" />;
      })}
    </WaveformContainer>
  );
};

export default AudioWaveForm;
