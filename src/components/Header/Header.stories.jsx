import React from 'react';
import Header from './Header'

export default {
    title: 'Section/Header',
    component: 'Header'
}

const Template = (args) => <Header {...args} />;

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