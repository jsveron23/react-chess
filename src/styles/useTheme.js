import { createContext, useContext } from 'react';

const BORDER_RADIUS = 6;

export const theme = {
  border: '1px solid #cacaca',
  borderRadius: BORDER_RADIUS,
  tile: {
    text: '#ccc',
    dark: '#eaeaea',
    light: '#fff',
  },
  sidebar: {
    bg: '#e1e1e1',
  },
  overlay: {
    bg: 'rgba(200, 200, 200, .8)',
    modal: {
      bg: '#eaeaea',
    },
  },
};

export const ThemeContext = createContext();

export default function useTheme() {
  return useContext(ThemeContext);
}
