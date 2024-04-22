import React, { createContext, useContext, useState, useCallback } from 'react';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

export enum PlaybackStatus {
    Stopped,
    Playing,
    Paused,
}

interface PlaybackContextType {
    loadAudio: (uri: string) => void;
    playAudio: () => void;
    pauseAudio: () => void;
    rewindAudio: () => void;
    forwardAudio: () => void;
    skipTo: (seconds: number) => void;
    playbackStatus: PlaybackStatus;
    audioLength: number;
    currentPosition: number;
    isLoading: boolean;
}

export const PlaybackContext = createContext<PlaybackContextType | undefined>(
    undefined,
);

export const usePlayback = (): PlaybackContextType => {
    const context = useContext(PlaybackContext);
    if (context === undefined) {
        throw new Error("usePlayback must be used within a PlaybackProvider");
    }
    return context;
};


interface PlaybackProviderProps {
    children: React.ReactNode;
    uri: string;
}
const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children, uri }) => {
    const [sound, setSound] = useState<Audio.Sound>();
    const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>(PlaybackStatus.Stopped);
    const [audioLength, setAudioLength] = useState<number>(0);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadAudio = async (uri: string) => {
        setIsLoading(true);
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
            setSound(sound);
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                setAudioLength((status.durationMillis || 0) / 1000);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to load audio:", error);
            setIsLoading(false);
        }
    };  

    React.useEffect(() => {
        if (uri) {
            loadAudio(uri);
        }
    }, [uri]);

    const updatePlaybackStatus = (status: AVPlaybackStatus) => {
        if (!status.isLoaded) {
            return;
        }

        const loadedStatus = status as AVPlaybackStatusSuccess;

        if (loadedStatus.isPlaying) {
            setPlaybackStatus(PlaybackStatus.Playing);
            setCurrentPosition(loadedStatus.positionMillis / 1000);
        } else {
            setPlaybackStatus(PlaybackStatus.Paused);
        }

        if (loadedStatus.didJustFinish) {
            setPlaybackStatus(PlaybackStatus.Stopped);
            setCurrentPosition(0);
        }
    };

    const playAudio = useCallback(async () => {
        if (sound) {
            await sound.playAsync();
        }
    }, [sound]);

    const pauseAudio = useCallback(async () => {
        if (sound) {
            await sound.pauseAsync();
        }
    }, [sound]);

    const forwardAudio = useCallback(async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.min(status.durationMillis || 0, status.positionMillis + 15000);
                await sound.setPositionAsync(newPosition);
            }
        }
    }, [sound]);

    const rewindAudio = useCallback(async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.max(0, status.positionMillis - 15000);
                await sound.setPositionAsync(newPosition);
            }
        }
    }, [sound]);


    const skipTo = useCallback(async (seconds: number) => {
        if (sound) {
            await sound.setPositionAsync(seconds * 1000);
        }
    }, [sound]);

    return (
        <PlaybackContext.Provider value={{
            loadAudio,
            playAudio,
            pauseAudio,
            rewindAudio,
            forwardAudio,
            skipTo,
            playbackStatus,
            audioLength,
            currentPosition,
            isLoading
        }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export default PlaybackProvider;  