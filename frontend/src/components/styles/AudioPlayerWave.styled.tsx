import styled from "styled-components/native";
import { Image, View } from "react-native";

export const Background = styled(Image)`
  width: 100%;
  height: 135px;
`;

export const Container = styled(View)`
  position: relative;
  width: 100%;
  height: 135px;
`;

export const LabelContainer = styled(View)`
  position: absolute;
  top: 10px;
  left: 16px;
  z-index: 1;
`;
