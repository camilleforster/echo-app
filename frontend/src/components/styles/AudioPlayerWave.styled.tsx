import styled from "styled-components/native";
import { Image, View } from "react-native";
import { ScrollView } from "react-native";

export const Background = styled(Image)`
  width: 100%;
  height: 135px;
`;

export const Container = styled(View)`
  position: relative;
  width: 100%;
  height: 135px;
  display: flex;
  flex-direction: row;
`;

export const LabelContainer = styled(View)`
  position: relative;
  top: 10px;
  left: 16px;
  z-index: 1;
`;

export const ScrollContainer = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})`
  width: 100%;
  height: 135px;
  position: absolute;
  z-index: 1;
`;

export const WaveformContainer = styled(View)`
  display: flex;
  margin-left: 208px;
  margin-right: 208px;
`;

export const CenterLine = styled(Image)`
  position: absolute;
  top: 0;
  left: -1px;
  bottom: 0;
  left: 50%;
  width: 3px;
  height: 135px;
  z-index: 2;
`;