import React, { useEffect, useRef, useState, useContext } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import {
  Background,
  Container,
  WaveformContainer,
  CenterLine,
  ScrollContainer,
} from "./styles/AudioPlayerWave.styled";
import AudioWaveForm from "./AudioWaveForm";
import { PlaybackContext, PlaybackStatus } from "../contexts/PlaybackContext";

interface AudioPlayerWaveProps {
  meteringArray: number[];
}
const AudioPlayerWave: React.FC<AudioPlayerWaveProps> = ({ meteringArray }) => {
  const { currentPosition, skipTo, audioLength, playbackStatus, scrollingPosition, setScrollingPosition, isAutoScrolling, setIsAutoScrolling } = useContext(PlaybackContext)!;
  const waveformWidth = (meteringArray.length * 2) + ((meteringArray.length - 1) * 3);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      const scrollTo = (currentPosition / audioLength) * waveformWidth;
      setIsAutoScrolling(true);
      scrollViewRef.current.scrollTo({ x: scrollTo, animated: true });
    }
  }, [currentPosition, waveformWidth, audioLength]);


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isAutoScrolling) {
      const scrollOffset = event.nativeEvent.contentOffset.x;
      let newAudioPosition = (scrollOffset / waveformWidth) * audioLength;
      newAudioPosition = Math.max(0, Math.min(newAudioPosition, audioLength));

      setScrollingPosition(newAudioPosition);
    }
  };

  const handleOnScrollEndDrag = () => {
    setIsAutoScrolling(false);
  }

  return (
    <Container>
      <CenterLine source={require("../assets/gradient.png")} />
      <ScrollContainer
        scrollEnabled={playbackStatus !== PlaybackStatus.Playing}
        ref={scrollViewRef}
        onScroll={handleScroll}
        onScrollEndDrag={handleOnScrollEndDrag}
        scrollEventThrottle={100}
      >
        <WaveformContainer>
          <AudioWaveForm meteringArray={meteringArray} />
        </WaveformContainer>
      </ScrollContainer>
      <Background
        testID="audio-player-background"
        source={require("../assets/player-background.png")}
      />
    </Container>
  );
};

export default AudioPlayerWave;