"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PortfolioContent, Project } from "@/lib/content";

const ContentContext = createContext<PortfolioContent | null>(null);

/**
 * Carries the server-loaded portfolio content into the client game shell.
 * Panels read from here instead of importing the bundled content directly.
 */
export function ContentProvider({
  content,
  children,
}: {
  content: PortfolioContent;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): PortfolioContent {
  const content = useContext(ContentContext);
  if (!content) {
    throw new Error("useContent must be used inside <ContentProvider>.");
  }
  return content;
}

export function useProject(id: string): Project | undefined {
  return useContent().projects.find((project) => project.id === id);
}
