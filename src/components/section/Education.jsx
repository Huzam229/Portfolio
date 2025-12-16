import React from "react";
import styled from "styled-components";
import { education } from "../../data/constants";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import EducationCard from "../cards/EducationCard";
import EarthCanvas from "../Canvas/Earth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 40px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Description = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const Education = () => {
  return (
    <Container id="Education">
      <Wrapper>
        <Title>Education</Title>
        <Description style={{ marginBottom: "40px" }}>
          A summary of my academic journey, showcasing the qualifications and
          knowledge I have gained over the years. These educational milestones
          reflect the foundation of my skills and growth in the field of
          technology.
        </Description>
        <VerticalTimeline>
          {education.map((item, index) => (
            <EducationCard key={`education-${index}`} item={item} />
          ))}
        </VerticalTimeline>
        <EarthCanvas/>
      </Wrapper>
    </Container>
  );
};

export default Education;
