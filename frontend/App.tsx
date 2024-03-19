import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import LibraryPage from './src/pages/LibraryPage';
import { RecordingProvider } from './src/contexts/RecordingContext';
import { Colors } from 'react-native-ui-lib';
import { useFonts } from "expo-font";
import { WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_700Bold } from '@expo-google-fonts/work-sans';

Colors.loadColors({
  textAndBoxesDarkGray: '#595959',
  textGray: '#858585',
  textDarkBlue: '#2D2F34',
  textLightBlue: '#848999',
  deleteRed: '#FF4949',
  acceptGreen: '#57b195',
  backgroundLightBlue: '#F0F5F9',
});

// TODO: Write comments
const App = () => {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
  });
  
  // TODO: Make a loading page?
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <RecordingProvider>
      <LibraryPage />
    </RecordingProvider>
  );
};

export default App;