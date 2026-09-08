import styled from "styled-components";
import { skills } from "../data/constants";

const Wrap = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  padding: 0 0 28px;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: 12px;
  animation: marquee 38s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  font-weight: 500;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const uniqueSkills = skills
  .flatMap((group) => group.skills)
  .filter(
    (skill, index, list) =>
      list.findIndex((item) => item.name === skill.name) === index
  );

const loopedSkills = [...uniqueSkills, ...uniqueSkills];

const TechMarquee = () => {
  return (
    <Wrap aria-hidden="true">
      <Track>
        {loopedSkills.map((skill, index) => (
          <Chip key={`${skill.name}-${index}`}>
            <Icon src={skill.image} alt="" />
            {skill.name}
          </Chip>
        ))}
      </Track>
    </Wrap>
  );
};

export default TechMarquee;
