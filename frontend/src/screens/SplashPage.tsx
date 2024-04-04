import * as React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { SplashBackground, Echo } from "./styles/Splash.styled";
import styled from "styled-components";
import { useFonts } from "expo-font";




const Splash = () => {
  
  return (
    <SplashBackground
      resizeMode="cover"
      source={require("../assets/Splash0.png")}
    >
      
      <Echo>{`echo `}</Echo>
    </SplashBackground>
  );
};



export default Splash;
