import * as React from "react";
import PageHeader from "../components/PageHeader";
import AudioPlaybackWave from "../components/AudioPlayerWave";
import { Container, Bottom } from "./styles/AudioTranscriptionPage.styled";
import AudioPlaybackControls from "../components/AudioPlayerControls";
import AudioTranscriptionControls from "../components/AudioTranscriptionControls";
import ChordCarousel from "../components/ChordCarousel";
import { useRoute } from "@react-navigation/native";
import { AudioTranscriptionPageProps } from "../types/NavigationStackTypes";
import { useEffect } from "react";
import { usePlayback } from "../contexts/PlaybackContext";
import { useFocusEffect } from "@react-navigation/native";

/**
 * The page that contains audio transcription data and controls for the chosen audio
 */
const AudioTranscriptionPage: React.FC<AudioTranscriptionPageProps> = () => {
  const route = useRoute<AudioTranscriptionPageProps["route"]>();
  const { uri } = route.params;
  const { loadAudio, unloadAudio } = usePlayback();

  useEffect(() => {
    if (uri) {
      loadAudio(uri);
    }
  }, [uri]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        unloadAudio();
      };
    }, [unloadAudio]),
  );

  // THIS WILL BE CHANGED GIVEN BACKEND METERING ARRAY
  const meteringArray = [
    -28, -21, -20
  ];

  return (
    <Container>
      <PageHeader headerTitle={"alternative bass line for Kanye"} />
      <AudioPlaybackWave meteringArray={meteringArray} />
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
