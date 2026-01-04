import { createContext, useContext, ReactNode } from "react";

interface EmbedContextType {
  isEmbed: boolean;
}

const EmbedContext = createContext<EmbedContextType>({ isEmbed: false });

export const useEmbed = () => useContext(EmbedContext);

interface EmbedProviderProps {
  children: ReactNode;
  isEmbed?: boolean;
}

export const EmbedProvider = ({ children, isEmbed = false }: EmbedProviderProps) => {
  return (
    <EmbedContext.Provider value={{ isEmbed }}>
      {children}
    </EmbedContext.Provider>
  );
};
