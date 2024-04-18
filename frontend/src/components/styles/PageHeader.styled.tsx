import { View, Text } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0px 30px 15px;
`;

export const LeftIcon = styled(View)`
  width: 40px;
  align-items: center;
  flex-direction: row;
`;

export const RightIcon = styled(View)`
  justify-content: flex-end;
  width: 40px;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled(Text)`
  font-size: 15px;
  font-family: "WorkSans_600SemiBold";
  color: #2d2f34;
  text-align: center;
  overflow: hidden;
  flex: 1;
`;
