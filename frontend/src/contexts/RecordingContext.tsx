import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";

/**
 * Interface defining the shape of the context for recording.
 */
interface RecordingContextType {
  isRecording: boolean; // Indicates if a recording is currently in progress
  showConfirmOptions: boolean; // Indicates if the confirm options should be shown
  startRecording: () => void; // Function to start the recording
  stopRecording: () => void; // Function to stop the recording
  saveRecording: () => void; // Function to save the recording
  discardRecording: () => void; // Function to discard the recording
  recordingTitle: string; // The title of the recording
  setRecordingTitle: (title: string) => void; // Function to set the recording title
}

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

/**
 * Custom hook to use the recording context. Must be used within a `RecordingProvider`.
 * @throws Error if used outside of a `RecordingProvider`.
 * @returns The recording context.
 */
export const useRecording = () => {
  const context = useContext(RecordingContext);
  if (context === undefined) {
    throw new Error("useRecording must be used within a RecordingProvider");
  }
  return context;
};

/**
 * Provides the recording context to its child components.
 * Manages the state related to recording operations.
 * @param children - The children components that will have access to the context.
 */
export const RecordingProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showConfirmOptions, setShowConfirmOptions] = useState(false);
  const [recordingCount, setRecordingCount] = useState(0); // TODO: fetch recordingCount from backend
  const [recordingTitle, setRecordingTitle] = useState(
    `Untitled ${recordingCount + 1}`,
  );

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setShowConfirmOptions(false);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    setShowConfirmOptions(true);
  }, []);

  const saveRecording = useCallback(() => {
    setShowConfirmOptions(false);
    setRecordingTitle(`Untitled ${recordingCount + 1}`);
  }, []);

  const discardRecording = useCallback(() => {
    setShowConfirmOptions(false);
    setRecordingTitle(`Untitled ${recordingCount + 1}`);
  }, []);

  return (
    <RecordingContext.Provider
      value={{
        isRecording,
        showConfirmOptions,
        startRecording,
        stopRecording,
        saveRecording,
        discardRecording,
        recordingTitle,
        setRecordingTitle,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};
