import React from "react";
import { Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRecording } from "../contexts/RecordingContext";
import {
  AudioWavePlaceholder,
  Checkmark,
  Exit,
  RecordingIcon,
  StopRecordingIcon,
} from "../assets/icons";
import {
  Footer,
  TopView,
  TextContent,
  StyledTextField,
  SubText,
  ConfirmRecording,
  ButtonFrame,
} from "./styles/RecordingFooter.styled";

/**
 * A footer component that enables users to manage (record, name, save, and discard) their recordings.
 * Uses the {@link useRecording} hook to decide what is displayed to the user.
 */
const RecordingFooter = () => {
  const {
    isRecording,
    showConfirmOptions,
    startRecording,
    stopRecording,
    saveRecording,
    discardRecording,
    recordingTitle,
    setRecordingTitle,
  } = useRecording();

  const onChangeText = (text: string) => {
    setRecordingTitle(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
    >
      <Footer>
        {(isRecording || showConfirmOptions) && (
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
        )}
        {isRecording ? (
          <Pressable onPress={stopRecording}>
            <StopRecordingIcon />
          </Pressable>
        ) : showConfirmOptions ? (
          showConfirmOptions && (
            <ConfirmRecording>
              <Pressable onPress={discardRecording}>
                <ButtonFrame>
                  <Exit />
                </ButtonFrame>
              </Pressable>
              <Pressable onPress={saveRecording}>
                <ButtonFrame>
                  <Checkmark />
                </ButtonFrame>
              </Pressable>
            </ConfirmRecording>
          )
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
