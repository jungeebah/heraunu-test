import React from 'react';
import Header from './Header';
import darkTheme from '../Styling/Theme/blackTheme';
import lightTheme from '../Styling/Theme/lightTheme';
import { ThemeProvider } from '@material-ui/core/styles';


export default {
    title: 'Section/Header',
    component: 'Header',
}
const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => <ThemeProvider theme={theme['dark']}><Header {...args} /></ThemeProvider>
const Template = (...args) => <ThemeProvider theme={theme['light']}><Header {...args} /></ThemeProvider>;

export const Default = Template.bind({});
export const DarkTheme = DarkThemeTemplate.bind({});
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