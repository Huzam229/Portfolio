import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 10px;
  background: #fff;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const School = styled.h3`
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: ${({ theme }) => theme.text_primary};
`;

const Degree = styled.p`
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

const Grade = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const EducationCard = ({ item }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={item.school}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={item.img}
        />
      }
      iconStyle={{
        background: "#fff",
        boxShadow: "0 0 0 4px #e8c07a",
      }}
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        color: "#fff",
        background: "rgba(13, 18, 27, 0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "18px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
        padding: "22px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 255, 255, 0.12)",
      }}
      date={item.date}
    >
      <Top>
        <Image src={item.img} alt={item.school} />
        <Body>
          <School>{item.school}</School>
          <Degree>{item.degree}</Degree>
          <Duration>{item.date}</Duration>
        </Body>
      </Top>
      <Grade>
        Grade: <span>{item.grade}</span>
      </Grade>
      {item.desc && <Description>{item.desc}</Description>}
    </VerticalTimelineElement>
  );
};

export default EducationCard;
