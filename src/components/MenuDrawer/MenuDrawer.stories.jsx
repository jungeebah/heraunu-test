import React from 'react';
import MenuDrawer from './MenuDrawer';
import darkTheme from '../Theme/blackTheme';
import lightTheme from '../Theme/lightTheme';
import { ThemeProvider } from '@material-ui/core/styles';

export default {
    title: 'Section/MenuDrawer',
    component: 'MenuDrawer'
}

const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => <ThemeProvider theme={theme['dark']}><MenuDrawer {...args} /></ThemeProvider>
const Template = (...args) => <ThemeProvider theme={theme['light']}><MenuDrawer {...args} /></ThemeProvider>;

export const DarkTheme = DarkThemeTemplate.bind({});
export const Default = Template.bind({});
export const MobileView = Template.bind({});
export const IpadView = Template.bind({});
export const largeScreen = Template.bind({});

MobileView.parameters = {
    viewport: {
        defaultViewport: 'xs'
    },
}

IpadView.parameters = {
    viewport: {
        defaultViewport: 'sm'
    },
}

largeScreen.parameters = {
    viewport: {
        defaultViewport: 'xl'
    },
}