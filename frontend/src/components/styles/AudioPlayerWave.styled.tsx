import styled from "styled-components/native";
import { ImageBackground, View } from "react-native";

export const Background = styled(ImageBackground)`
    width: 100%;
    height: 135px;
`

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
`