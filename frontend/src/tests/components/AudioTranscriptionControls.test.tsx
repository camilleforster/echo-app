import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Theme from "../../../Theme";
import AudioTranscriptionControls from "../../components/AudioTranscriptionControls";
import * as TranscriptionControlsContext from "../../contexts/TranscriptionControlsContext";
import { TranscriptionControlsContextType } from "../../contexts/TranscriptionControlsContext";
import { NotationType } from "../../types/NotationType";

// Mock the useTranscriptionControls context hook
jest.mock("../../contexts/TranscriptionControlsContext", () => {
  const actual = jest.requireActual("../../contexts/TranscriptionControlsContext");
  return {
    ...actual,
    useTranscriptionControls: jest.fn(),
  };
});

const setupTranscriptionControlsContext = (values: Partial<TranscriptionControlsContextType> = {}) => {
(TranscriptionControlsContext.useTranscriptionControls as jest.Mock).mockImplementation(() => ({
    leftHanded: false,
    toggleLeftHanded: jest.fn(),
    playback: false,
    togglePlayback: jest.fn(),
    capoValue: 0,
    incrementCapo: jest.fn(),
    decrementCapo: jest.fn(),
    selectedNotation: NotationType.Sharp,
    setSelectedNotation: jest.fn(),
    ...values,
  }));
};

const renderAudioTranscriptionControls = () => render(
  <Theme>
    <AudioTranscriptionControls />
  </Theme>
);

describe("AudioTranscriptionControls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the capo value when plus or minus is clicked", () => {
    const mockIncrementCapo = jest.fn();
    const mockDecrementCapo = jest.fn();

    setupTranscriptionControlsContext({
      capoValue: 5,
      incrementCapo: mockIncrementCapo,
      decrementCapo: mockDecrementCapo,
    });

    const { getByTestId } = renderAudioTranscriptionControls();

    fireEvent.press(getByTestId("plus-button"));
    expect(mockIncrementCapo).toHaveBeenCalled();

    fireEvent.press(getByTestId("minus-button"));
    expect(mockDecrementCapo).toHaveBeenCalled();
  });

  it("should toggle notation when notation buttons are pressed", () => {
    const mockSetSelectedNotation = jest.fn();

    setupTranscriptionControlsContext({
      selectedNotation: NotationType.Sharp,
      setSelectedNotation: mockSetSelectedNotation,
    });

    const { getByTestId } = renderAudioTranscriptionControls();

    fireEvent.press(getByTestId("flat-button"));
    expect(mockSetSelectedNotation).toHaveBeenCalledWith(NotationType.Flat);

    fireEvent.press(getByTestId("sharp-button"));
    expect(mockSetSelectedNotation).toHaveBeenCalledWith(NotationType.Sharp);
  });

  it("toggles the left-handed switch and triggers context function", () => {
    const mockToggleLeftHanded = jest.fn();
    setupTranscriptionControlsContext({
      leftHanded: false,
      toggleLeftHanded: mockToggleLeftHanded
    });

    const { getByTestId } = renderAudioTranscriptionControls();
    fireEvent.press(getByTestId("left-handed-switch").children[1]);
    expect(mockToggleLeftHanded).toHaveBeenCalledTimes(1);
  });

  it("toggles the playback switch and triggers context function", () => {
    const mockTogglePlayback = jest.fn();
    setupTranscriptionControlsContext({
      playback: false,
      togglePlayback: mockTogglePlayback
    });

    const { getByTestId } = renderAudioTranscriptionControls();
    fireEvent.press(getByTestId("playback-switch").children[1]);
    expect(mockTogglePlayback).toHaveBeenCalledTimes(1);
  });
});