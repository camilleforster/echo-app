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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AudioTranscriptionPage", {
            uri: "file:///var/mobile/Containers/Data/Application/D43D48C6-E218-40AD-A4AE-122A1ECD3E42/Library/Caches/ExponentExperienceData/@anonymous/echo-dfb1fca1-63f7-4b28-b5d6-9360ca5fccdc/AV/recording-7175D525-15B2-420A-9FE4-8D2E58B994C2.m4a",
          })
        }
      >
        <Text style={{ padding: 50 }}>Item Test</Text>
      </TouchableOpacity>
      <RecordingFooter />
    </Container>
  );
};
export default LibraryPage;
