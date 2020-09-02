import React from 'react';
import MenuDrawer from './MenuDrawer'

export default {
    title: 'Section/MenuDrawer',
    component: 'MenuDrawer'
}

const Template = (args) => <MenuDrawer {...args} />;

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