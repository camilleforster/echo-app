import * as React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { SplashBackground, Echo } from "./styles/Splash.styled";
import styled from "styled-components";
import { useFonts } from "expo-font";

/**
 * Splash page that is shown to users while they load the app
 * 
 * @returns the Splash page that users see when they load the app
 */
const Splash = () => {
  return (
    <SplashBackground
      resizeMode="cover"
      source={require("../assets/Splash0.png")}
      testID="splashBackground"
    >
      <Echo testID="echoLogo">{`echo `}</Echo>
    </SplashBackground>
  );
};

export default Splash;
