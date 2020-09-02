import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import lightTheme from '../src/components/Theme/lightTheme';
import darkTheme from '../src/components/Theme/blackTheme';

const customViewports = {
  xs: {
    name: 'xs',
    styles: {
      width: '400px',
      height: '812px',
    },
  },
  sm: {
    name: 'Ipad',
    styles: {
      width: '600px',
      height: '1024px',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: '960px',
      height: '1024px',
    },
  },
  lg: {
    name: 'lg',
    styles: {
      width: '1280px',
      height: '1024px',
    },
  },
  xl: {
    name: 'xl',
    styles: {
      width: '1920px',
      height: '1024px',
    },
  }
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
}

const themes = { darkMode: darkTheme, lightMode: lightTheme };
const themeNames = Object.keys(themes);

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themes[themeNames[1]]}>
      <Story />
    </ThemeProvider>
  ),
];