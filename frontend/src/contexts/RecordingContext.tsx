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
  isRecording: boolean;
  showConfirmOptions: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  saveRecording: () => void;
  discardRecording: () => void;
  recordingTitle: string;
  setRecordingTitle: (title: string) => void;
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
export const RecordingProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showConfirmOptions, setShowConfirmOptions] = useState<boolean>(false);
  const [recordingCount, setRecordingCount] = useState<number>(0); // TODO: fetch recordingCount from backend
  const [recordingTitle, setRecordingTitle] = useState<string>(
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
