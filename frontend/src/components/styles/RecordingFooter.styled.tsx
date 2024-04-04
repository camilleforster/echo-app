import { View, Text } from "react-native";
import { TextField } from "react-native-ui-lib";
import styled from "styled-components/native";

export const Footer = styled(View)`
  width: 100%;
  height: auto;
  padding-left: 38px;
  padding-right: 38px;
  padding-top: 30px;
  padding-bottom: 50px;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundLightBlue};
  z-index: 10;
`;

export const StyledTextField = styled(TextField)`
  font-size: 20px;
  font-weight: 600;
  font-family: "WorkSans_600SemiBold";
  color: ${(props) => props.theme.textDarkBlue};
  text-align: left;
`;

export const SubText = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  font-family: "WorkSans_500Medium";
  color: ${(props) => props.theme.textGray};
  margin-top: 10px;
  text-align: left;
`;

export const TopView = styled(View)`
  align-items: center;
  margin-bottom: 40px;
  gap: 40px;
`;
export const TextContent = styled(View)`
  align-items: center;
`;

export const ConfirmRecording = styled(View)`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  flex: 1;
`;

export const ButtonFrame = styled(View)`
  width: 188px;
  height: 57px;
  align-items: center;
  justify-content: center;
`;
