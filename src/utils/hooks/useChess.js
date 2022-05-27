import { createContext, useContext } from 'react';

const ChessContext = createContext();

export const ChessProvider = ChessContext.Provider;
export default function useChess() {
  return useContext(ChessContext);
}
