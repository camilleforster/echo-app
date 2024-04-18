import styled from "styled-components/native";
import { View, Text } from "react-native";

export const Container = styled(View)`
  border-radius: 15px;
  border-style: solid;
  border-color: ${(props) => props.theme.textDarkBlue};
  border-width: 1px;
  width: 100%;
  padding: 5px;
`;

export const Content = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 7px;
`;

export const StyledText = styled(Text)`
  text-align: center;
  color: ${({ disabled, theme }) =>
    disabled ? theme.textGray : theme.textDarkBlue};
  font-family: "WorkSans_400Regular";
  font-size: 15px;
  width: 16px;
`;
