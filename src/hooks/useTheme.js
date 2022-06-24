import { createContext, useContext } from 'react';
import { Turn, Side } from 'chess/es';

const ColorSet = {
  white: '#fff',
  black: '#000',
  light: '#fff',
  dark: '#eaeaea',
  gray1: '#e1e1e1',
  gray2: '#ccc',
  gray3: '#cacaca',
  gray4: '#aaa',
  reflect: {
    // TODO remove text
    [Turn.w]: {
      bgColor: '#fff',
      color: '#000',
      text: Side[Turn.w],
    },
    [Turn.b]: {
      bgColor: '#000',
      color: '#fff',
      text: Side[Turn.b],
    },
  },
};

export const theme = {
  color: ColorSet,
  fw: '100vw',
  fh: '100vh',
  border: `1px solid ${ColorSet.gray3}`,
  borderRadius: 6,
  sidebar: {
    width: 300,
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ThemeContext.Provider;
export default function useTheme() {
  return useContext(ThemeContext);
}
