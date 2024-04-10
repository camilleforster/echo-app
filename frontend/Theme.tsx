import React, { PropsWithChildren } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components/native";

const theme: DefaultTheme = {
  textAndBoxesDarkGray: "#595959",
  textGray: "#858585",
  textDarkBlue: "#2D2F34",
  textLightBlue: "#848999",
  deleteRed: "#FF4949",
  acceptGreen: "#57b195",
  backgroundLightBlue: "#F0F5F9",
};

const Theme: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
