import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RecordingFooter from "../../components/RecordingFooter";
import { ThemeProvider } from "styled-components";
import theme from "../../../theme";
import * as RecordingContext from "../../contexts/RecordingContext";

/**
 * Interface defining the parameters for setting up the mock implementation of useRecording hook.
 */
interface UseRecordingMockParams {
  isRecording?: boolean;
  showConfirmOptions?: boolean;
  recordingTitle?: string;
}

describe("RecordingFooter", () => {
  const mockStartRecording = jest.fn();
  const mockStopRecording = jest.fn();
  const mockSaveRecording = jest.fn();
  const mockDiscardRecording = jest.fn();
  const mockSetRecordingTitle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Sets up the mock implementation for the useRecording hook.
   *
   * @param params - The parameters to customize the mock implementation
   */
  const useRecordingMock = ({
    isRecording = false,
    showConfirmOptions = false,
    recordingTitle = "",
  }: UseRecordingMockParams = {}) => {
    jest.spyOn(RecordingContext, "useRecording").mockImplementation(() => ({
      isRecording,
      showConfirmOptions,
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
      saveRecording: mockSaveRecording,
      discardRecording: mockDiscardRecording,
      recordingTitle,
      setRecordingTitle: mockSetRecordingTitle,
    }));
  };

  /**
   * Renders the RecordingFooter component wrapped in a ThemeProvider with the default theme.
   *
   * @returns The RecordingFooter component with the default theme
   */
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <RecordingFooter />
      </ThemeProvider>,
    );

  it("should render start recording button when not recording and no confirm options", () => {
    useRecordingMock();
    const { queryByTestId } = renderComponent();
    expect(queryByTestId("start-recording")).toBeTruthy();
    expect(queryByTestId("stop-recording")).toBeNull();
    expect(queryByTestId("discard-recording")).toBeNull();
    expect(queryByTestId("save-recording")).toBeNull();
  });

  it("should render stop recording button when isRecording is true", () => {
    useRecordingMock({ isRecording: true });
    const { queryByTestId } = renderComponent();
    expect(queryByTestId("stop-recording")).toBeTruthy();
    expect(queryByTestId("start-recording")).toBeNull();
  });

  it("should render confirm options when showConfirmOptions is true", () => {
    useRecordingMock({
      showConfirmOptions: true,
      recordingTitle: "Test Title",
    });
    const { queryByTestId } = renderComponent();
    expect(queryByTestId("discard-recording")).toBeTruthy();
    expect(queryByTestId("save-recording")).toBeTruthy();
  });

  it("should handle start recording", () => {
    useRecordingMock();
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId("start-recording"));
    expect(mockStartRecording).toHaveBeenCalled();
  });

  it("should handle stop recording", () => {
    useRecordingMock({ isRecording: true });
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId("stop-recording"));
    expect(mockStopRecording).toHaveBeenCalled();
  });

  it("should handle discard recording", () => {
    useRecordingMock({ showConfirmOptions: true });
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId("discard-recording"));
    expect(mockDiscardRecording).toHaveBeenCalled();
  });

  it("should handle save recording", () => {
    useRecordingMock({ showConfirmOptions: true });
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId("save-recording"));
    expect(mockSaveRecording).toHaveBeenCalled();
  });
});
