import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import LibraryPage from "./src/screens/LibraryPage";
import { RecordingProvider } from "./src/contexts/RecordingContext";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";

/**
 * An app that converts a user's voice to notes
 */
const App = () => {
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
    <ThemeProvider theme={theme}>
      <RecordingProvider>
        <LibraryPage />
      </RecordingProvider>
    </ThemeProvider>
  );
};

export default App;
