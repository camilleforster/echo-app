import {
  Text,
  ImageBackground,
  View,
  Pressable,
  TextInput,
} from "react-native";
import styled from "styled-components/native";

export const StyledPressable = styled(Pressable)`
  top: 644px;
  width: 70%;
  position: absolute;
  justify-content: center;
  align-items: center;
  backgroundcolor: red;
`;

export const SigninContanier = styled(View)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 50px 30px 95px 30px;
  flex-direction: column;

  align-items: center;
  flex-shrink: 0;
`;

export const TextInputContainer = styled(View)`
  display: flex;
  align-items: left;
  width: 100%;
  padding: 12px;
`;

export const ButtonBackground = styled(ImageBackground)`
  display: flex;
  width: 287px;
  padding: 14px 25px;
  justify-content: center;
  align-items: center;
`;
export const ContentRow = styled(View)`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  font-size: 20;
  color: #fff;
  display: flex;
  text-align: center;

  font-weight: 600;
  align-self: stretch;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SignUpTextInput = styled(TextInput)`
  height: 40px;
  border-width: 0;
  border-bottom-width: 1px;

  padding: 10px;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 20px;
  border-color: #ccc;
`;

export const TitleText = styled(Text)`
  text-align: center;
  font-family: "Work Sans";
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 50px;
  margin-bottom: 68px;
`;
