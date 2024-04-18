import * as React from "react";
import { StyledSlider, Container, Time, TimeText, Controls } from "./styles/AudioPlayerControls.styled";
import { ForwardIcon, PlayIcon, PauseIcon, RewindIcon } from "../assets/icons/icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

// TODO: Make functional
const AudioPlayerControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <Container>
            <StyledSlider
                onValueChange={value => console.log(value)}
            />
            <Time>
                <TimeText>0:00</TimeText>
                <TimeText>3:56</TimeText>
            </Time>
            <Controls>
                <RewindIcon />
                {isPlaying ? (
                    <TouchableOpacity onPress={togglePlayPause}>
                        <PauseIcon />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={togglePlayPause}>
                        <PlayIcon />
                    </TouchableOpacity>
                )
                }
                <ForwardIcon />
            </Controls >
        </Container >
    );
}
export default AudioPlayerControls