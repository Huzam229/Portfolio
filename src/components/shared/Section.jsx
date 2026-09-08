import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 88px 24px;
  scroll-margin-top: 96px;

  @media (max-width: 768px) {
    padding: 64px 16px;
  }
`;

export const SectionInner = styled.div`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrap = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 720px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const Eyebrow = styled.span`
  font-family: "Syne", sans-serif;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-family: "Syne", sans-serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 14px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

export const SectionHeader = ({ eyebrow, title, description }) => (
  <HeaderWrap>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </HeaderWrap>
);
