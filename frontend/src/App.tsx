import React from "react";
import { Text } from "react-native";
import LibraryPage from "./screens/LibraryPage";
import { RecordingProvider } from "./contexts/RecordingContext";
import { useFonts } from "expo-font";
import Theme from "./Theme";
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";

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
        <LibraryPage />
      </RecordingProvider>
    </Theme>
  );
};

export default App;
