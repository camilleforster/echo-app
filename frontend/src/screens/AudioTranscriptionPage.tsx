import * as React from "react";
import PageHeader from "../components/PageHeader";
import AudioPlaybackWave from "../components/AudioPlayerWave";
import { Container, Bottom } from "./styles/AudioTranscriptionPage.styled";
import AudioPlaybackControls from "../components/AudioPlayerControls";
import AudioTranscriptionControls from "../components/AudioTranscriptionControls";
import ChordCarousel from "../components/ChordCarousel";

// TODO: Connect with navigation
const AudioTranscriptionPage = () => {
  return (
    <Container>
      <PageHeader headerTitle={"alternative bass line for Kanye"} />
      <AudioPlaybackWave />
      <Bottom>
        <AudioPlaybackControls />
        <AudioTranscriptionControls />
        {/* TODO: Supply actual Chord Diagram data */}
        <ChordCarousel chordDiagrams={[0, 1, 2]} />
      </Bottom>
    </Container>
  );
};
export default AudioTranscriptionPage;
