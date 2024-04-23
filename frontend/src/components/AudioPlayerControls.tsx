import * as React from "react";
import { useState, useEffect } from "react";
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
  const [sliderPosition, setSliderPosition] = useState(currentPosition);

  useEffect(() => {
    setSliderPosition(currentPosition);
  }, [currentPosition]);

  const handleSliderChange = (value: number) => {
    setSliderPosition(value);
  };

  const handleSliderChangeStart = () => {
    if (playbackStatus === PlaybackStatus.Playing) {
      pauseAudio();
    }
  };

  const handleSliderChangeComplete = async () => {
    await skipTo(sliderPosition);
  };

  const togglePlayPause = () => {
    if (playbackStatus === PlaybackStatus.Playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const formatTime = (totalSeconds: number) => {
    const roundedSeconds = Math.round(totalSeconds);
    const date = new Date(0);
    date.setSeconds(roundedSeconds);
    return date.toISOString().substring(14, 19);
  };

  return (
    <Container>
      <StyledSlider
        value={0 || currentPosition}
        onValueChange={handleSliderChange}
        onSeekStart={handleSliderChangeStart}
        onSeekEnd={handleSliderChangeComplete}
        maximumValue={audioLength || 1}
        minimumValue={0}
      />
      <Time>
        <TimeText>{formatTime(sliderPosition)}</TimeText>
        <TimeText>{formatTime(audioLength)}</TimeText>
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
