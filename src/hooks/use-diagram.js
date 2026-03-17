import { createContext, useContext } from 'react';

const DiagramContext = createContext();

export const DiagramProvider = DiagramContext.Provider;

const useDiagram = () => useContext(DiagramContext);

export { useDiagram };
