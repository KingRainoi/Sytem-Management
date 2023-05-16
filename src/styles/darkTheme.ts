import { createTheme, Theme } from '@nextui-org/react';

const sharedTheme: Theme = {
  theme: {
    fonts: { 
      sans: 'Inter, sans-serif',
      mono: 'Inter, monospace'
      },
    }
}

export const lightTheme = createTheme({
  ...sharedTheme,
  type: 'light'
});

export const darkTheme = createTheme({
  ...sharedTheme,
  type: 'dark'
});