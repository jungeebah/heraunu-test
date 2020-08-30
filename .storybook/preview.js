import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
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