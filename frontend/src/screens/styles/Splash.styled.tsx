import { Text, ImageBackground } from "react-native";
import styled from "styled-components/native";

export const Echo = styled(Text)`
  color: #fff;

  font-size: 45px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
`;

export const SplashBackground = styled(ImageBackground)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
