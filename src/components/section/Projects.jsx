import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../../data/constants";
import { ProjectCard } from "../cards/ProjectCard";
import { Section, SectionHeader, SectionInner } from "../shared/Section";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "web app", label: "Web Apps" },
  { id: "android app", label: "Android" },
  { id: "machine learning", label: "Machine Learning" },
];

const ToggleButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.02);
  border-radius: 999px;
  margin-bottom: 36px;

  @media (max-width: 640px) {
    border-radius: 18px;
    width: 100%;
  }
`;

const ToggleButton = styled.button`
  border: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? "#04110e" : theme.text_secondary};
  font-size: 14px;
  font-weight: 600;
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${({ $active, theme }) => ($active ? "#04110e" : theme.text_primary)};
  }
`;

const Count = styled.span`
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  background: ${({ $active }) =>
    $active ? "rgba(4, 17, 14, 0.16)" : "rgba(255, 255, 255, 0.06)"};
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 48px 20px;
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.text_secondary};
`;

const getCount = (id) =>
  id === "all"
    ? projects.length
    : projects.filter((item) => item.category === id).length;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const visibleProjects = projects.filter(
    (item) => toggle === "all" || item.category === toggle
  );

  return (
    <Section id="Projects">
      <SectionInner>
        <SectionHeader
          eyebrow="Selected work"
          title="Projects"
          description="A mix of web and mobile products — from AI image tools to ride-hailing and restaurant platforms."
        />
        <ToggleButtonGroup>
          {FILTERS.map((filter) => (
            <ToggleButton
              key={filter.id}
              $active={toggle === filter.id}
              onClick={() => setToggle(filter.id)}
            >
              {filter.label}
              <Count $active={toggle === filter.id}>{getCount(filter.id)}</Count>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <CardContainer>
          {visibleProjects.length === 0 ? (
            <EmptyState>
              Machine learning projects are on the way. Check the other tabs for
              shipped work.
            </EmptyState>
          ) : (
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </CardContainer>
      </SectionInner>
    </Section>
  );
};

export default Projects;
