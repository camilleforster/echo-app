import * as React from "react";

import { SplashBackground, Echo } from "./styles/Splash.styled";

/**
 * Splash page that is shown to users while they load the app
*/
const Splash = () => {
  return (
    <SplashBackground
      resizeMode="cover"
      source={require("../assets/Splash0.png")}
      testID="splashBackground"
    >
      <Echo testID="echoLogo">echo</Echo>
    </SplashBackground>
  );
};

export default Splash;
