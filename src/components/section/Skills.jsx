import styled from "styled-components";
import { skills } from "../../data/constants";
import { Section, SectionHeader, SectionInner } from "../shared/Section";
import { motion } from "framer-motion";

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
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: rgba(46, 230, 199, 0.35);
    transform: translateY(-4px);
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

const SkillItem = styled.div`
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
          description="Tools I have spent the last three years refining — the stack I use to ship clean interfaces, reliable backends, and mobile products."
        />
        <SkillGrid>
          {skills.map((group, index) => (
            <SkillCard
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <SkillTitle>{group.title}</SkillTitle>
              <SkillList>
                {group.skills.map((skill) => (
                  <SkillItem key={skill.name}>
                    <SkillImage src={skill.image} alt="" />
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
