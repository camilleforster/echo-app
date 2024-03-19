import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import LibraryPage from "./src/pages/LibraryPage";
import { RecordingProvider } from "./src/contexts/RecordingContext";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styled-components";
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";

const theme = {
  textAndBoxesDarkGray: "#595959",
  textGray: "#858585",
  textDarkBlue: "#2D2F34",
  textLightBlue: "#848999",
  deleteRed: "#FF4949",
  acceptGreen: "#57b195",
  backgroundLightBlue: "#F0F5F9",
};

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
