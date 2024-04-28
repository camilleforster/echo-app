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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./src/types/NavigationStackTypes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PlaybackProvider from "./src/contexts/PlaybackContext";

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

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Theme>
      <RecordingProvider>
        <TranscriptionControlsProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PlaybackProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="LibraryPage"
                  screenOptions={{
                    contentStyle: { backgroundColor: "white" },
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="LibraryPage" component={LibraryPage} />
                  <Stack.Screen
                    name="AudioTranscriptionPage"
                    component={AudioTranscriptionPage}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </PlaybackProvider>
          </GestureHandlerRootView>
        </TranscriptionControlsProvider>
      </RecordingProvider>
    </Theme>
  );
};

export default App;
