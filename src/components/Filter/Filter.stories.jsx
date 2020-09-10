import React from 'react';
import Filter from './Filter';
import darkTheme from '../Styling/Theme/blackTheme';
import lightTheme from '../Styling/Theme/lightTheme';
import { ThemeProvider } from '@material-ui/core/styles';

export default {
    title: 'Section/Filter',
    component: 'Filter'
}

const theme = { dark: darkTheme, light: lightTheme };
const DarkThemeTemplate = (...args) => <ThemeProvider theme={theme['dark']}><Filter {...args} /></ThemeProvider>
const Template = (...args) => <ThemeProvider theme={theme['light']}><Filter {...args} /></ThemeProvider>;

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