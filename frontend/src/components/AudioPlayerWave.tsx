import * as React from "react";
import { Background, Container, LabelContainer } from "./styles/AudioPlayerWave.styled";
import { LabelType, LabelSize } from "../types/LabelType";
import Label from "./Label";

const AudioPlayerWave = () => {
    const backgroundImage = require("../assets/player-background.png");

    return (
        <Container>
            <LabelContainer>
                <Label type={LabelType.Outlined} size={LabelSize.Regular}>
                    C
                </Label>
            </LabelContainer>
            { /* TODO: Insert Audio Wave */ }
            <Background source={backgroundImage} />
        </Container>
    );
};

export default AudioPlayerWave;