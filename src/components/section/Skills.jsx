import styled from "styled-components";
import { motion } from "framer-motion";
import { skills } from "../../data/constants";
import { Section, SectionHeader, SectionInner } from "../shared/Section";
import { fadeUp, staggerFast, viewportOnce } from "../../utils/motion";

const SkillGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.article)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 24px;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }

  @media (min-width: 861px) {
    &:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
  }
`;

const SkillTitle = styled.h3`
  font-family: "Syne", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.text_primary};
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillItem = styled(motion.div)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.02);
  border-radius: 999px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const SkillImage = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

const Skills = () => {
  return (
    <Section id="Skills">
      <SectionInner>
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills"
          description="React, Node.js, Spring Boot, and React Native — the stack I use to ship clean interfaces, reliable backends, and Android apps."
        />
        <SkillGrid>
          {skills.map((group, index) => (
            <SkillCard
              key={group.title}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, delay: index * 0.08, staggerChildren: 0.04 },
                },
              }}
              whileHover={{ y: -6 }}
            >
              <SkillTitle as={motion.h3} variants={fadeUp}>
                {group.title}
              </SkillTitle>
              <SkillList as={motion.div} variants={staggerFast}>
                {group.skills.map((skill) => (
                  <SkillItem key={skill.name} variants={fadeUp} whileHover={{ y: -2, scale: 1.03 }}>
                    <SkillImage
                      src={skill.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                    {skill.name}
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          ))}
        </SkillGrid>
      </SectionInner>
    </Section>
  );
};

export default Skills;
