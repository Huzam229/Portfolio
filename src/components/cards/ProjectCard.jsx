import styled from "styled-components";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  overflow: hidden;
  min-height: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  padding: 14px 14px 0;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 14px;
  transition: transform 0.45s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 14px 14px 0;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.overlay};
  color: ${({ theme }) => theme.white};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.25s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Category = styled.span`
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.onPrimary};
  background: ${({ theme }) => theme.primary};
  padding: 5px 9px;
  border-radius: 999px;
  z-index: 1;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 18px 8px;
  flex: 1;
`;

const Title = styled.h3`
  font-family: "Syne", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Date = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 18px 0;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: rgba(46, 230, 199, 0.08);
  border: 1px solid rgba(46, 230, 199, 0.16);
  border-radius: 999px;
  padding: 4px 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px 18px 18px;
  margin-top: auto;
`;

const Button = styled.a`
  flex: 1;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme, $filled }) => ($filled ? "transparent" : theme.border)};
  background: ${({ theme, $filled }) => ($filled ? theme.primary : "transparent")};
  color: ${({ theme, $filled }) => ($filled ? theme.onPrimary : theme.text_primary)};
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
`;

export const ProjectCard = ({ item, onOpen }) => {
  const visibleTags = item.tags?.slice(0, 4) || [];
  const extraTags = (item.tags?.length || 0) - visibleTags.length;

  return (
    <Card onClick={() => onOpen(item)}>
      <ImageWrap>
        <Image src={item.image} alt={item.title} />
        <Overlay>View details</Overlay>
        <Category>{item.category}</Category>
      </ImageWrap>
      <Details>
        <Title>{item.title}</Title>
        <Date>{item.date}</Date>
        <Description>{item.description}</Description>
      </Details>
      <Tags>
        {visibleTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {extraTags > 0 && <Tag>+{extraTags}</Tag>}
      </Tags>
      <ButtonContainer>
        <Button
          href={item.github}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          Code
        </Button>
        {item.live && (
          <Button
            href={item.live}
            target="_blank"
            rel="noreferrer"
            $filled
            onClick={(event) => event.stopPropagation()}
          >
            Live
          </Button>
        )}
      </ButtonContainer>
    </Card>
  );
};
