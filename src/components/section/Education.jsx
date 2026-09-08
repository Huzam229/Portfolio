import styled from "styled-components";
import { education } from "../../data/constants";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import EducationCard from "../cards/EducationCard";
import EarthCanvas from "../Canvas/Earth";
import { Section, SectionHeader, SectionInner } from "../shared/Section";

const TimelineWrap = styled.div`
  width: 100%;
`;

const CanvasWrap = styled.div`
  width: 100%;
  max-width: 520px;
  height: 360px;
  margin-top: 24px;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const Education = () => {
  return (
    <Section id="Education">
      <SectionInner>
        <SectionHeader
          eyebrow="Background"
          title="Education"
          description="The academic path that shaped how I think about systems, software, and problem-solving."
        />
        <TimelineWrap>
          <VerticalTimeline lineColor="rgba(46, 230, 199, 0.22)">
            {education.map((item) => (
              <EducationCard key={item.id} item={item} />
            ))}
          </VerticalTimeline>
        </TimelineWrap>
        <CanvasWrap>
          <EarthCanvas />
        </CanvasWrap>
      </SectionInner>
    </Section>
  );
};

export default Education;
