import { createContext, useContext } from 'react';
import { Turn } from 'chess/es';

const WeightSet = {
  bold: 'bold',
};

const ColorSet = {
  white: '#fff',
  black: '#000',
  light: '#fff',
  dark: '#eaeaea',
  gray1: '#e1e1e1',
  gray2: '#ccc',
  gray3: '#cacaca',
  gray4: '#aaa',
  gray5: '#c8c8c8',
  green: 'green',
  red: 'red',
  crimson: '#dc143c',
  crimsonLight: 'rgba(220, 20, 60, 0.1)',

  // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
  invert: {
    [Turn.w]: {
      bgColor: '#fff',
      color: '#000',
    },
    [Turn.b]: {
      bgColor: '#000',
      color: '#fff',
    },
  },
};

export const theme = {
  color: ColorSet,
  weight: WeightSet,
  fw: '100vw',
  fh: '100vh',
  border: `1px solid ${ColorSet.gray3}`,
  borderRadius: 6,
  sidebar: {
    width: 300,
  },
  analysisPanel: {
    width: 360,
  },
  hintPanel: {
    width: 360,
  },
  logo: {
    width: '100px',
    height: '100%',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ThemeContext.Provider;

const useTheme = () => useContext(ThemeContext);

export { useTheme };
