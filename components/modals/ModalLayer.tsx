"use client";

import { useCallback, useEffect, useState } from "react";
import { useGameStore, type ModalState } from "@/store/useGameStore";
import { islands } from "@/game/data/islands";
import { useContent } from "@/components/content/ContentProvider";
import type { Project } from "@/lib/content";
import { ParchmentDialog } from "@/components/modals/ParchmentDialog";
import { HomePanel } from "@/components/modals/panels/HomePanel";
import { AboutPanel } from "@/components/modals/panels/AboutPanel";
import { SkillsPanel } from "@/components/modals/panels/SkillsPanel";
import { ExperiencePanel } from "@/components/modals/panels/ExperiencePanel";
import { PortfolioPanel } from "@/components/modals/panels/PortfolioPanel";
import { ContactPanel } from "@/components/modals/panels/ContactPanel";
import { ProjectPanel } from "@/components/modals/panels/ProjectPanel";

function modalTitle(
  modal: ModalState,
  projects: Project[],
): { title: string; kicker: string; wide: boolean } {
  if (modal.kind === "project") {
    const project = projects.find((item) => item.id === modal.project);
    return {
      title: project?.title ?? "Charted project",
      kicker: project ? `A charted project · ${project.epoch}` : "A charted project",
      wide: true,
    };
  }
  const island = islands.find((item) => item.id === modal.section);
  return {
    title: island?.name ?? "Logbook",
    kicker: island ? `${island.tagline} · logbook` : "The logbook",
    wide: modal.section === "portfolio",
  };
}

function ModalContent({ modal }: { modal: ModalState }) {
  const { projects } = useContent();
  if (modal.kind === "project") {
    const project = projects.find((item) => item.id === modal.project);
    return project ? <ProjectPanel project={project} /> : null;
  }
  switch (modal.section) {
    case "home":
      return <HomePanel />;
    case "about":
      return <AboutPanel />;
    case "skills":
      return <SkillsPanel />;
    case "experience":
      return <ExperiencePanel />;
    case "portfolio":
      return <PortfolioPanel />;
    case "contact":
      return <ContactPanel />;
  }
}

/**
 * Keeps the last parchment mounted for the duration of its closing animation,
 * which allows the store to clear its state immediately on close.
 */
export function ModalLayer() {
  const { projects } = useContent();
  const modal = useGameStore((state) => state.modal);
  const closeModal = useGameStore((state) => state.closeModal);
  const [rendered, setRendered] = useState<ModalState | null>(modal);
  const [lastModal, setLastModal] = useState<ModalState | null>(modal);

  // Derive the visible parchment during render, then hold it briefly after
  // close so the unroll animation can reverse before unmounting.
  if (modal !== lastModal) {
    setLastModal(modal);
    if (modal) setRendered(modal);
  }
  const closing = Boolean(rendered) && !modal;

  useEffect(() => {
    if (!closing) return;
    const timeout = window.setTimeout(() => setRendered(null), 420);
    return () => window.clearTimeout(timeout);
  }, [closing]);

  const handleClose = useCallback(() => closeModal(), [closeModal]);

  if (!rendered) return null;
  const meta = modalTitle(rendered, projects);
  const key =
    rendered.kind === "section"
      ? `section-${rendered.section}`
      : `project-${rendered.project}`;

  return (
    <ParchmentDialog
      key={key}
      title={meta.title}
      kicker={meta.kicker}
      closing={closing}
      wide={meta.wide}
      onClose={handleClose}
    >
      <ModalContent modal={rendered} />
    </ParchmentDialog>
  );
}
