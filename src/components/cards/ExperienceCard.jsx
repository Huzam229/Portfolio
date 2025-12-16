import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;
const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768) {
    height: 40px;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Role = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary + 99};

  @media only screen and (max-width: 768) {
    font-size: 14px;
  }
`;
const Company = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary + 99};

  @media only screen and (max-width: 768) {
    font-size: 12px;
  }
`;
const Duration = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.text_primary + 80};

  @media only screen and (max-width: 768) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  margin-bottom: 10px;
  @media only screen and (max-width: 768) {
    font-size: 12px;
  }
`;
const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: -10px;
`;
const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const Skill = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768) {
    font-size: 12px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;


const ExperienceCard = ({ item }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={item.company}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={item.img}
        />
      }
      iconStyle={{
        background: "#fff",
        boxShadow: "0 0 0 4px #854CE6",
      }}
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255,255,255,0.125",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 255, 255, 0.3)",
      }}
      date={item.date}
    >
      <Top>
        <Image src={item.img}></Image>
        <Body>
          <Role>{item.role}</Role>
          <Company>{item.company}</Company>
          <Duration>{item.date}</Duration>
        </Body>
      </Top>
      <Description>
        {item?.desc && <Span>{item.desc}</Span>}
        {item?.skills && (
          <>
            <br />
            <Skills>
              <b>Skills</b>
              <ItemWrapper>
                {item?.skills?.map((skill, index) => (
                  <Skill key={`skill- ${index}`}>• {skill}</Skill>
                ))}
              </ItemWrapper>
            </Skills>
          </>
        )}
      </Description>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
