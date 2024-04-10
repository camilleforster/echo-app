import React from "react";
import { Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRecording } from "../contexts/RecordingContext";
import { RecordingStatus } from "../contexts/RecordingContext";
import {
  CheckmarkIcon,
  ExitIcon,
  RecordIcon,
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
import AudioWaveForm from "./AudioWaveForm";

/**
 * A footer component that enables users to manage (record, name, save, and discard) their recordings.
 * Uses the {@link useRecording} hook to decide what is displayed to the user.
 */
const RecordingFooter = () => {
  const {
    recordingStatus,
    startRecording,
    stopRecording,
    saveRecording,
    discardRecording,
    recordingTitle,
    setRecordingTitle,
    meteringArray,
    durationMillis,
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
        {(recordingStatus === RecordingStatus.Recording ||
          recordingStatus === RecordingStatus.Confirming) && (
          <TopView>
            <TextContent>
              <StyledTextField
                value={recordingTitle}
                onChangeText={onChangeText}
              />
              <SubText>
                {new Date(durationMillis).toISOString().slice(14, 19)}
              </SubText>
            </TextContent>
            <AudioWaveForm meteringArray={meteringArray} />
          </TopView>
        )}
        {recordingStatus === RecordingStatus.Recording ? (
          <Pressable testID="stop-recording" onPress={stopRecording}>
            <StopRecordingIcon />
          </Pressable>
        ) : recordingStatus === RecordingStatus.Confirming ? (
          <ConfirmRecording>
            <Pressable testID="discard-recording" onPress={discardRecording}>
              <ButtonFrame>
                <ExitIcon />
              </ButtonFrame>
            </Pressable>
            <Pressable testID="save-recording" onPress={saveRecording}>
              <ButtonFrame>
                <CheckmarkIcon />
              </ButtonFrame>
            </Pressable>
          </ConfirmRecording>
        ) : (
          <Pressable testID="start-recording" onPress={startRecording}>
            <RecordIcon />
          </Pressable>
        )}
      </Footer>
    </KeyboardAvoidingView>
  );
};
export default RecordingFooter;
