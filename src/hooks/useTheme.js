import { createContext, useContext } from 'react';

export const theme = {
  fw: '100vw',
  fh: '100vh',
  border: '1px solid #cacaca',
  borderRadius: 6,
  logo: {
    width: '100px',
    height: '100%',
  },
  diagram: {
    width: window.innerHeight,
  },
  tile: {
    text: '#ccc',
    dark: '#eaeaea',
    light: '#fff',
  },
  sidebar: {
    width: 300,
    bg: '#e1e1e1',
  },
  overlay: {
    bg: 'rgba(200, 200, 200, .8)',
    modal: {
      bg: '#eaeaea',
    },
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ThemeContext.Provider;
export default function useTheme() {
  return useContext(ThemeContext);
}
