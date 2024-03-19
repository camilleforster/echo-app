import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';

interface RecordingContextType {
  isRecording: boolean;
  showConfirmOptions: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  saveRecording: () => void;
  discardRecording: () => void;
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined);

export const useRecording = () => {
  const context = useContext(RecordingContext);
  if (context === undefined) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
};

export const RecordingProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showConfirmOptions, setShowConfirmOptions] = useState(false);

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
  }, []);

  const discardRecording = useCallback(() => {
    setShowConfirmOptions(false);
  }, []);

  return (
    <RecordingContext.Provider value={{
      isRecording,
      showConfirmOptions,
      startRecording,
      stopRecording,
      saveRecording,
      discardRecording,
    }}>
      {children}
    </RecordingContext.Provider>
  );
};