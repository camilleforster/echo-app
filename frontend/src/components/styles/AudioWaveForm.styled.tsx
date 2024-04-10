import styled from "styled-components/native";
import { View } from "react-native";

export const WaveformContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 90px;
  min-width: 100%;
  gap: 3px;
`;

export const LevelBar = styled(View)<{ height: number }>`
  background-color: ${(props) => props.theme.textDarkBlue};
  height: ${(props) => props.height}px;
  width: 2px;
  align-items: center;
  border-radius: 20px;
`;
