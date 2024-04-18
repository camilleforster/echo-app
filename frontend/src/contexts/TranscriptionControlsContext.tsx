import React, { createContext, useContext, useState, useCallback } from "react";

export enum NotationType {
    Sharp = "#",
    Flat = "b",
}

interface TranscriptionControlsContextType {
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

export const TranscriptionControlsContext = createContext<TranscriptionControlsContextType | undefined>(
    undefined,
);

export const useTranscriptionControls = (): TranscriptionControlsContextType => {
    const context = useContext(TranscriptionControlsContext);
    if (context === undefined) {
        throw new Error("useTranscriptionControls must be used within a TranscriptionControlsProvider");
    }
    return context;
};

export const TranscriptionControlsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [selectedNotation, setSelectedNotation] = useState<NotationType>(NotationType.Sharp);
    const [capoValue, setCapoValue] = useState<number>(0);
    const [playback, setPlayback] = useState<boolean>(false);
    const [leftHanded, setLeftHanded] = useState<boolean>(false);

    const incrementCapo = useCallback(() => {
        setCapoValue(prev => prev + 1);
    }, []);

    const decrementCapo = useCallback(() => {
        setCapoValue(prev => prev - 1);
    }, []);

    const toggleLeftHanded = useCallback(() => {
        setLeftHanded(prev => !prev);
    }, []);

    const togglePlayback= useCallback(() => {
        setPlayback(prev => !prev);
    }, []);

    return (
        <TranscriptionControlsContext.Provider value={{
            selectedNotation,
            setSelectedNotation,
            capoValue,
            incrementCapo,
            decrementCapo,
            playback,
            togglePlayback,
            leftHanded,
            toggleLeftHanded,
        }}>
            {children}
        </TranscriptionControlsContext.Provider>
    );
};