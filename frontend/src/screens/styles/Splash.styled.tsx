import { Text, ImageBackground } from "react-native";
import styled from "styled-components/native";

export const Echo = styled(Text)`
  position: absolute;
  marginleft: -44.5px;
  top: 379;
  left: 50%;
  fontsize: 45px;
  fontstyle: italic;
  color: #fff;
  font-weight: 300;
`;

export const SplashBackground = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: "hidden";
  align-items: center;
`;
