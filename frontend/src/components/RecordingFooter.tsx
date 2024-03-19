import React, { useState } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useRecording } from '../contexts/RecordingContext';
import { AudioWavePlaceholder, Checkmark, Exit, RecordingIcon, StopRecordingIcon } from '../assets/icons';
import { Colors, TextField } from 'react-native-ui-lib';

const Footer = styled.View`
  width: 100%;
  height: auto;
  padding-left: 38px;
  padding-right: 38px;
  padding-top: 30px;
  padding-bottom: 50px;
  align-items: center;
  background-color: '#F0F5F9';
  z-index: 10;
`;

const StyledTextField = styled(TextField)`
  font-size: 20px;
  font-weight: 600;
  font-family: "WorkSans_600SemiBold";
  color: ${Colors.textDarkBlue};
  text-align: left;
`;

const SubText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  font-family: "WorkSans_500Medium";
  color: ${Colors.textGray};
  margin-top: 10px;
  text-align: left;
`;

const TopView = styled.View`
  align-items: center;
  margin-bottom: 40px;
  gap: 40px;
`;
const TextContent = styled.View`
  align-items: center;
`

const ConfirmRecording = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  flex: 1;
`

const ButtonFrame = styled.View`
  width: 188px;
  height: 57px;
  align-items: center;
  justify-content: center;
`

interface RecordingFooterProps {
  recordingCount: number;
}

const RecordingFooter: React.FC<RecordingFooterProps> = ({ recordingCount }) => {
  const { isRecording, showConfirmOptions, startRecording, stopRecording, saveRecording, discardRecording } = useRecording();
  const [recordingTitle, setRecordingTitle] = useState(`Untitled ${recordingCount + 1}`);

  const onChangeText = (text: string) => {
    setRecordingTitle(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
    >
      <Footer>
        {(isRecording || showConfirmOptions) &&
          <TopView>
            <TextContent>
              <StyledTextField
                value={recordingTitle}
                onChangeText={onChangeText}
              />
              {/* TODO: Replace with the actual length of the recording file */}
              <SubText>00:00.33</SubText>
            </TextContent>
            {/* TODO: Replace with actual recording wave */}
            <AudioWavePlaceholder />
          </TopView>
        }
        {isRecording ? (
          <Pressable onPress={stopRecording}>
            <StopRecordingIcon />
          </Pressable>
        ) : showConfirmOptions ? (
          showConfirmOptions && <ConfirmRecording>
            <ButtonFrame>
              <Pressable onPress={discardRecording}>
                <Exit />
              </Pressable>
            </ButtonFrame>
            <ButtonFrame>
              <Pressable onPress={saveRecording}>
                <Checkmark />
              </Pressable>
            </ButtonFrame>
          </ConfirmRecording>
        ) : (
          <Pressable onPress={startRecording}>
            <RecordingIcon />
          </Pressable>
        )}
      </Footer>
    </KeyboardAvoidingView>
  );
};
export default RecordingFooter;