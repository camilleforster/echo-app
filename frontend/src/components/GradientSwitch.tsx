import React from "react";
import { SwitchContainer, Gradient, StyledSwitch } from "./styles/GradientSwitch.styled";

interface GradientSwitchProps {
     value: boolean;
     onToggle: () => void;
}
const GradientSwitch: React.FC<GradientSwitchProps> = ({ value, onToggle }) => {
    const backgroundImage = require('../assets/gradient.png');

    return (
        <SwitchContainer>
            <Gradient
                source={backgroundImage}
                imageStyle={{ borderRadius: 15 }}
            />
            <StyledSwitch
                value={value}
                onValueChange={onToggle}
                onColor="transparent"
            />
        </SwitchContainer>
    );
};
export default GradientSwitch;
