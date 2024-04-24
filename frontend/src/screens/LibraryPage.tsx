import React from "react";
import RecordingFooter from "../components/RecordingFooter";
import { Container } from "./styles/LibraryPage.styled";
import { Text, TouchableOpacity } from "react-native";
import { LibraryPageProps } from "../types/NavigationStackTypes";

/**
 * Contains the content accessible within the "My Library" folder
 **/
const LibraryPage: React.FC<LibraryPageProps> = ({ navigation }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('AudioTranscriptionPage', { uri: 'file:///var/mobile/Containers/Data/Application/B398B30D-D853-4217-81AB-589D469E12DF/Library/Caches/ExponentExperienceData/@anonymous/echo-dfb1fca1-63f7-4b28-b5d6-9360ca5fccdc/AV/recording-0A5756B5-AB77-45E4-AB31-467227599731.m4a' })}>
        <Text style={{ padding: 50 }}>Item Test</Text>
      </TouchableOpacity>
      <RecordingFooter />
    </Container>
  );
};
export default LibraryPage;
