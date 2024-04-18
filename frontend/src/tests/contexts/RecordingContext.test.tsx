import { renderHook, act } from "@testing-library/react-native";
import * as FileSystem from "expo-file-system";
import {
  RecordingProvider,
  useRecording,
  RecordingStatus,
} from "../../contexts/RecordingContext";

const mockSetProgressUpdateInterval = jest.fn();
const mockSetOnRecordingStatusUpdate = jest.fn();
const mockPrepareToRecordAsync = jest.fn();
const mockStartAsync = jest.fn();
const mockStopAndUnloadAsync = jest.fn();
const mockPauseAsync = jest.fn();
const mockGetURI = jest.fn(() => Promise.resolve("file://path-to-recording"));

// Mock the Expo AV library
jest.mock("expo-av", () => {
  const actual = jest.requireActual("expo-av");

  return {
    ...actual,
    Audio: {
      setAudioModeAsync: jest.fn(),
      Recording: jest.fn().mockImplementation(() => ({
        setProgressUpdateInterval: mockSetProgressUpdateInterval,
        setOnRecordingStatusUpdate: mockSetOnRecordingStatusUpdate,
        prepareToRecordAsync: mockPrepareToRecordAsync,
        startAsync: mockStartAsync,
        stopAndUnloadAsync: mockStopAndUnloadAsync,
        pauseAsync: mockPauseAsync,
        getURI: mockGetURI,
      })),
      RecordingOptionsPresets: {
        HIGH_QUALITY: {},
      },
      usePermissions: jest.fn(() => [{ status: "granted" }, jest.fn()]),
    },
  };
});

// Mock the Expo File System library
jest.mock("expo-file-system", () => ({
  deleteAsync: jest.fn(),
}));

/**
 * Renders the useRecording hook which is wrapped by the RecordingProvider for context
 */
const renderComponent = () =>
  renderHook(() => useRecording(), {
    wrapper: RecordingProvider,
  });

describe("RecordingContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should start recording correctly", async () => {
    const { result } = renderComponent();

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.recordingStatus).toBe(RecordingStatus.Recording);
    expect(mockStartAsync).toHaveBeenCalled();
  });

  it("should pause recording and set status to Confirming when stopping the recording", async () => {
    const { result } = renderComponent();

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(result.current.recordingStatus).toBe(RecordingStatus.Confirming);
    expect(mockPauseAsync).toHaveBeenCalled();
  });

  it("should handle recording saving process", async () => {
    const { result } = renderComponent();

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
      await result.current.saveRecording();
    });

    expect(result.current.recordingStatus).toBe(RecordingStatus.Idle);
    expect(mockStopAndUnloadAsync).toHaveBeenCalled();

    // TODO: Check that it's sending to backend properly
  });

  it("should delete the recording file and reset state when discarding the recording", async () => {
    const { result } = renderComponent();

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
      await result.current.discardRecording();
    });

    expect(result.current.recordingStatus).toBe(RecordingStatus.Idle);
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(expect.any(String));
    expect(result.current.meteringArray).toEqual([]);
    expect(result.current.durationMillis).toEqual(0);
  });
});
