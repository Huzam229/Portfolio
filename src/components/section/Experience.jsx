import styled from "styled-components";
import { experiences } from "../../data/constants";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceCard from "../cards/ExperienceCard";
import { Section, SectionHeader, SectionInner } from "../shared/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../utils/motion";

const TimelineWrap = styled.div`
  width: 100%;
`;

const Experience = () => {
  return (
    <Section id="Experience">
      <SectionInner>
        <SectionHeader
          eyebrow="Career"
          title="Experience"
          description="Full-stack work across frontend, backend, and data — focused on shipping reliable software with teams."
        />
        <TimelineWrap
          as={motion.div}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <VerticalTimeline lineColor="rgba(46, 230, 199, 0.22)">
            {experiences.map((item) => (
              <ExperienceCard key={item.id} item={item} />
            ))}
          </VerticalTimeline>
        </TimelineWrap>
      </SectionInner>
    </Section>
  );
};

export default Experience;
