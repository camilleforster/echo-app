import React, { createContext, useContext, useState, useCallback } from "react";
import { NotationType } from "../types/NotationType";

export interface TranscriptionControlsContextType {
  selectedNotation: NotationType;
  setSelectedNotation: (notation: NotationType) => void;
  capoValue: number;
  incrementCapo: () => void;
  decrementCapo: () => void;
  playback: boolean;
  togglePlayback: () => void;
  leftHanded: boolean;
  toggleLeftHanded: () => void;
}

export const TranscriptionControlsContext = createContext<
  TranscriptionControlsContextType | undefined
>(undefined);

/**
 * Custom hook to use the transcription controls context. Must be used within a {@link TranscriptionControlsProvider}.
 * @throws Error if used outside of a {@link TranscriptionControlsProvider}
 * @returns The transcription controls context
 */
export const useTranscriptionControls =
  (): TranscriptionControlsContextType => {
    const context = useContext(TranscriptionControlsContext);
    if (context === undefined) {
      throw new Error(
        "useTranscriptionControls must be used within a TranscriptionControlsProvider",
      );
    }
    return context;
  };

/**
 * Provides the transcription controls context to its child components.
 * Manages the state related to recording operations.
 * @param children - The children components that will have access to the context
 * @returns The transcription controls provider
 */
export const TranscriptionControlsProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [selectedNotation, setSelectedNotation] = useState<NotationType>(
    NotationType.Sharp,
  );
  const [capoValue, setCapoValue] = useState<number>(0);
  const [playback, setPlayback] = useState<boolean>(false);
  const [leftHanded, setLeftHanded] = useState<boolean>(false);

  const incrementCapo = useCallback(() => {
    setCapoValue((prev) => prev + 1);
  }, []);

  const decrementCapo = useCallback(() => {
    setCapoValue((prev) => prev - 1);
  }, []);

  const toggleLeftHanded = useCallback(() => {
    setLeftHanded((prev) => !prev);
  }, []);

  const togglePlayback = useCallback(() => {
    setPlayback((prev) => !prev);
  }, []);

  return (
    <TranscriptionControlsContext.Provider
      value={{
        selectedNotation,
        setSelectedNotation,
        capoValue,
        incrementCapo,
        decrementCapo,
        playback,
        togglePlayback,
        leftHanded,
        toggleLeftHanded,
      }}
    >
      {children}
    </TranscriptionControlsContext.Provider>
  );
};
