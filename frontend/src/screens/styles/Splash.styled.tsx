import { View, Text, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "react-native-svg";


export const Echo = styled(Text)`
position: absolute;
    marginLeft: -44.5px;
    top: 379;
    left: 50%;
    fontSize: 45px;
    fontStyle: italic;
    color: #fff;
    font-weight: 300;
    
`;

export const SplashBackground = styled(ImageBackground)`
flex: 1;
width: 100%;
height: 100%;
overflow: "hidden";
align-items: center;
`;
