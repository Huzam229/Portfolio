import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled, { useTheme } from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  height: 48px;
  width: 48px;
  object-fit: contain;
  border-radius: 10px;
  background: #fff;
  padding: 4px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Role = styled.h3`
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
`;

const Company = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
`;

const Duration = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`;

const SkillsLabel = styled.p`
  margin-top: 12px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Skill = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 4px 10px;
`;

const ExperienceCard = ({ item }) => {
  const theme = useTheme();
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
        boxShadow: `0 0 0 4px ${theme.primary}`,
      }}
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        color: theme.text_primary,
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "18px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        padding: "22px",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${theme.border}`,
      }}
      date={item.date}
    >
      <Top>
        <Image src={item.img} alt={item.company} />
        <Body>
          <Role>{item.role}</Role>
          <Company>{item.company}</Company>
          <Duration>{item.date}</Duration>
        </Body>
      </Top>
      {item.desc && <Description>{item.desc}</Description>}
      {item.skills && (
        <>
          <SkillsLabel>Skills</SkillsLabel>
          <ItemWrapper>
            {item.skills.map((skill) => (
              <Skill key={skill}>{skill}</Skill>
            ))}
          </ItemWrapper>
        </>
      )}
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
