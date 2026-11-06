import { createContext, useContext } from "react";

/**
 * Adaptação para o site institucional: os portais do Radix (Select, Sheet)
 * renderizam dentro da raiz `.pageconv-root`, onde o CSS da PageConv está
 * escopado. Sem isso, o conteúdo iria para o <body> e ficaria sem estilo.
 */
export const PortalContainerContext = createContext<HTMLElement | null>(null);

export const usePortalContainer = () => useContext(PortalContainerContext) ?? undefined;
