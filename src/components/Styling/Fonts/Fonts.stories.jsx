import React from "react";
import Fonts from "./Fonts";
import darkTheme from "../Theme/blackTheme";
import lightTheme from "../Theme/lightTheme";
import { ThemeProvider } from "@material-ui/core/styles";

export default {
  title: "Theme/Fonts",
  component: "Fonts",
};
const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => (
  <ThemeProvider theme={theme["dark"]}>
    <Fonts {...args} />
  </ThemeProvider>
);
const Template = (...args) => (
  <ThemeProvider theme={theme["light"]}>
    <Fonts {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
export const DarkTheme = DarkThemeTemplate.bind({});
