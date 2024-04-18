import styled from "styled-components/native";
import { View, Text } from "react-native";

export const Container = styled(View)`
  display: flex;
  padding: 20px 17px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.backgroundLightBlue};
  width: 100%;
`;

export const Content = styled(View)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 24px;
`;

export const SelectionItem = styled(View)`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50px;
`;

export const SelectionItemLabel = styled(Text)`
  display: flex;
  font-size: 12px;
  font-family: "WorkSans_400Regular";
  color: ${(props) => props.theme.textDarkBlue};
`;
