import * as React from "react";
import {
  StyledSlider,
  Container,
  Time,
  TimeText,
  Controls,
} from "./styles/AudioPlayerControls.styled";
import {
  ForwardIcon,
  PlayIcon,
  PauseIcon,
  RewindIcon,
} from "../assets/icons/icons";
import { TouchableOpacity } from "react-native";
import { usePlayback } from "../contexts/PlaybackContext";
import { PlaybackStatus } from "../contexts/PlaybackContext";

/**
  Contains controls for playing the audio including play, pause, rewind, and forward
 */
const AudioPlayerControls = () => {
  const { playAudio, pauseAudio, rewindAudio, forwardAudio, playbackStatus, audioLength, currentPosition, skipTo } = usePlayback();

  const togglePlayPause = () => {
    if (playbackStatus === PlaybackStatus.Playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <Container>
      <StyledSlider onValueChange={(value) => skipTo(value)} maximumValue={audioLength} />
      <Time>
        <TimeText>{currentPosition}</TimeText>
        <TimeText>{audioLength}</TimeText>
      </Time>
      <Controls>
        <TouchableOpacity onPress={rewindAudio}>
          <RewindIcon />
        </TouchableOpacity>
        {playbackStatus === PlaybackStatus.Playing ? (
          <TouchableOpacity onPress={togglePlayPause}>
            <PauseIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={togglePlayPause}>
            <PlayIcon />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={forwardAudio}>
          <ForwardIcon />
        </TouchableOpacity>
      </Controls>
    </Container>
  );
};
export default AudioPlayerControls;
