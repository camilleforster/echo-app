import React, { createContext, useContext, useState, useCallback } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

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
  unloadAudio: () => void;
  playbackStatus: PlaybackStatus;
  audioLength: number;
  currentPosition: number;
  scrollingPosition: number;
  setScrollingPosition: (seconds: number) => void;
  isAutoScrolling: boolean;
  setIsAutoScrolling: (flag: boolean) => void;
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
}
const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>(
    PlaybackStatus.Stopped,
  );
  const [audioLength, setAudioLength] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [scrollingPosition, setScrollingPosition] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);

  const loadAudio = async (newUri: string) => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: newUri },
        { progressUpdateIntervalMillis: 1000 },
        updatePlaybackStatus,
      );
      setSound(newSound);
      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setAudioLength((status.durationMillis || 0) / 1000);
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const updatePlaybackStatus = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      const loadedStatus = status;
      if (loadedStatus.isPlaying) {
        setPlaybackStatus(PlaybackStatus.Playing);
        setCurrentPosition(loadedStatus.positionMillis / 1000);
      } else if (loadedStatus.didJustFinish) {
        if (sound) {
          sound.setPositionAsync(0);
          setPlaybackStatus(PlaybackStatus.Stopped);
          setCurrentPosition(0);
          setScrollingPosition(0);
        }
      } else {
        setPlaybackStatus(PlaybackStatus.Paused);
      }
    }
  };

  const playAudio = useCallback(async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (status.positionMillis >= (status.durationMillis || 0)) {
          await sound.setPositionAsync(0);
          setCurrentPosition(0);
          setScrollingPosition(0);
        }
        if (playbackStatus === PlaybackStatus.Paused && !isAutoScrolling) {
          await sound.setPositionAsync(scrollingPosition * 1000);
        }

        await sound.playAsync();
      }
    }
  }, [sound, playbackStatus, currentPosition, scrollingPosition]);

  const pauseAudio = useCallback(async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.pauseAsync();
      }
    }
  }, [sound]);

  const unloadAudio = useCallback(async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        sound
          .stopAsync()
          .then(() => {
            sound
              .unloadAsync()
              .then(() => {
                setCurrentPosition(0);
                setScrollingPosition(0);
              })
              .catch((error) =>
                console.error("Failed to unload audio:", error),
              );
          })
          .catch((error) => console.error("Failed to stop audio:", error));
      }
    }
  }, [sound]);

  const forwardAudio = useCallback(async () => {
    skipTo(Math.min(currentPosition + 15, audioLength));
  }, [currentPosition]);

  const rewindAudio = useCallback(async () => {
    skipTo(Math.max(currentPosition - 15, 0));
  }, [currentPosition]);

  const skipTo = useCallback(
    async (seconds: number) => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.setPositionAsync(seconds * 1000);
          console.log("setting scrolling position", seconds);
          setCurrentPosition(seconds);
          setScrollingPosition(seconds);
        }
      }
    },
    [sound],
  );

  return (
    <PlaybackContext.Provider
      value={{
        loadAudio,
        playAudio,
        pauseAudio,
        rewindAudio,
        forwardAudio,
        skipTo,
        playbackStatus,
        audioLength,
        currentPosition,
        scrollingPosition,
        setScrollingPosition,
        unloadAudio,
        isAutoScrolling,
        setIsAutoScrolling,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackProvider;
