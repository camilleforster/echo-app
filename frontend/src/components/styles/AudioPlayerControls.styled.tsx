import styled from "styled-components/native";
import { Slider } from "react-native-ui-lib";
import { View, Text } from "react-native";

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const StyledSlider = styled(Slider).attrs((props) => ({
  minimumTrackTintColor: `${props.theme.textDarkBlue}`,
  maximumTrackTintColor: `${props.theme.backgroundLightBlue}`,
  thumbTintColor: `${props.theme.textDarkBlue}`,
  thumbStyle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: `${props.theme.textDarkBlue}`,
    borderWidth: 0,
  },
  activeThumbStyle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: `${props.theme.textDarkBlue}`,
    borderWidth: 0,
  },
  trackStyle: {
    height: 4,
  },
}))``;

export const Time = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TimeText = styled(Text)`
  font-size: 12px;
  font-family: "WorkSans_400Regular";
  color: ${(props) => props.theme.textGray};
`;

export const Controls = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
