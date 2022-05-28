import { createContext, useContext } from 'react';

const DiagramContext = createContext();

export const DiagramProvider = DiagramContext.Provider;
export default function useDiagram() {
  return useContext(DiagramContext);
}
