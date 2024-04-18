import styled from "styled-components";
import { View, ImageBackground } from "react-native";
import { Switch } from "react-native-ui-lib";

export const SwitchContainer = styled(View)`
  position: relative;
  width: 42.5px;
  height: 25px;
  overflow: hidden;
`;

export const Gradient = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledSwitch = styled(Switch)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
