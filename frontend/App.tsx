import React from "react";
import { Text } from "react-native";
import LibraryPage from "./src/screens/LibraryPage";
import { RecordingProvider } from "./src/contexts/RecordingContext";
import { useFonts } from "expo-font";
import Theme from "./Theme";
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";
import AudioTranscriptionPage from "./src/screens/AudioTranscriptionPage";
import { TranscriptionControlsProvider } from "./src/contexts/TranscriptionControlsContext";

/**
 * An app that converts a user's voice to notes.
 */
const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
  });

  // TODO: Replace with loading/splash page?
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Theme>
      <RecordingProvider>
        <TranscriptionControlsProvider>
          {/* <LibraryPage /> */}
          <AudioTranscriptionPage />
        </TranscriptionControlsProvider>
      </RecordingProvider>
    </Theme>
  );
};

export default App;
