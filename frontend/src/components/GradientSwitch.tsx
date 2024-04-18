import React from "react";
import {
  SwitchContainer,
  Gradient,
  StyledSwitch,
} from "./styles/GradientSwitch.styled";

export interface GradientSwitchProps {
  value: boolean;
  onToggle: () => void;
  testID?: string;
}

/**
 * A switch with a graident background
 *
 * @param value - the state of the switch (on/off)
 * @param onToggle - function to be called on switch toggle
 * @param testID - testing id for the switch
 */
const GradientSwitch: React.FC<GradientSwitchProps> = ({
  value,
  onToggle,
  testID,
}) => {
  return (
    <SwitchContainer>
      <Gradient
        source={require("../assets/gradient.png")}
        imageStyle={{ borderRadius: 15 }}
      />
      <StyledSwitch
        testID={testID || "switch"}
        value={value}
        onValueChange={onToggle}
        onColor="transparent"
      />
    </SwitchContainer>
  );
};
export default GradientSwitch;
