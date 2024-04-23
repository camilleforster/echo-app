import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export enum RecordingStatus {
  Idle,
  Recording,
  Confirming,
}

interface RecordingContextType {
  recordingStatus: RecordingStatus;
  startRecording: () => void;
  stopRecording: () => void;
  saveRecording: () => void;
  discardRecording: () => void;
  recordingTitle: string;
  setRecordingTitle: (title: string) => void;
  meteringArray: number[];
  durationMillis: number;
}

export const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

/**
 * Custom hook to use the recording context. Must be used within a {@link RecordingProvider}.
 * @throws Error if used outside of a {@link RecordingProvider}
 * @returns The recording context
 */
export const useRecording = (): RecordingContextType => {
  const context = useContext(RecordingContext);
  if (context === undefined) {
    throw new Error("useRecording must be used within a RecordingProvider");
  }
  return context;
};

/**
 * Provides the recording context to its child components.
 * Manages the state related to recording operations.
 * @param children - The children components that will have access to the context
 * @returns The recording provider
 */
export const RecordingProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>(
    RecordingStatus.Idle,
  );
  const [recordingCount] = useState<number>(0); // TODO: Fetch from backend
  const [recordingTitle, setRecordingTitle] = useState<string>(
    `Untitled ${recordingCount + 1}`,
  );
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [meteringArray, setMeteringArray] = useState<number[]>([]);
  const [durationMillis, setDurationMillis] = useState<number>(0);

  const startRecording = useCallback(async () => {
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const recording = new Audio.Recording();

      if (recording) {
        recording.setProgressUpdateInterval(100);

        recording.setOnRecordingStatusUpdate((status) => {
          if (status.metering !== undefined && status.isRecording) {
            setMeteringArray((cur) => [...cur, status.metering || -100]);
          }
          if (status.durationMillis !== undefined) {
            setDurationMillis(status.durationMillis);
          }
        });

        await recording.prepareToRecordAsync({
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        });
        await recording.startAsync();
        setRecording(recording);
        setRecordingStatus(RecordingStatus.Recording);
        console.log("Recording started");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }, [permissionResponse, requestPermission]);

  const stopRecording = useCallback(async () => {
    if (recording) {
      await recording.pauseAsync();
      setRecordingStatus(RecordingStatus.Confirming);
    }
  }, [recording]);

  const saveRecording = useCallback(async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      console.log("Recording saved at.", recording.getURI());

      // TODO: Send file to backend
      // const uri = await recording.getURI();

      setRecording(undefined);
      setRecordingStatus(RecordingStatus.Idle);
      setMeteringArray([]);
    }
  }, [recording]);

  const discardRecording = useCallback(async () => {
    if (recording) {
      const uri = await recording.getURI();
      await recording.stopAndUnloadAsync();

      if (uri) {
        try {
          await FileSystem.deleteAsync(uri);
          console.log("Recording file deleted successfully");
        } catch (error) {
          console.error("Failed to delete recording file:", error);
        }
      }

      setRecording(undefined);
      setRecordingStatus(RecordingStatus.Idle);
      setMeteringArray([]);
    }
  }, [recording]);

  return (
    <RecordingContext.Provider
      value={{
        recordingStatus,
        startRecording,
        stopRecording,
        saveRecording,
        discardRecording,
        recordingTitle,
        setRecordingTitle,
        meteringArray,
        durationMillis,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};
