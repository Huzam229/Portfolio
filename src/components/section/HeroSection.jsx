import styled from "styled-components";
import { Bio, experiences, projects } from "../../data/constants";
import Typewriter from "typewriter-effect";
import my_image from "../../images/my_image.png";
import HeroBgAnimation from "../HeroBgAnimation";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { headContainerAnimation, headTextAnimation } from "../../utils/motion";
import { PrimaryButton, GhostButton } from "../shared/Buttons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const HeroContainer = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 72px 30px 96px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 48px 16px 72px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 1140px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 960px) {
    align-items: center;
    order: 2;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: start;
  transform: translateY(-28px);
  margin-top: 60px;

  @media (max-width: 960px) {
    order: 1;
    transform: translateY(-8px);
    margin-top: 0;
  }
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(46, 230, 199, 0.08);
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 18px;
`;

const Pulse = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 0 0 rgba(46, 230, 199, 0.6);
  animation: pulse 1.8s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(46, 230, 199, 0.55);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(46, 230, 199, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(46, 230, 199, 0);
    }
  }
`;

const Greeting = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: clamp(40px, 6vw, 64px);
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: ${({ theme }) => theme.text_primary};
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: clamp(20px, 3vw, 28px);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 0 18px;
  min-height: 42px;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.p`
  font-size: 17px;
  line-height: 1.75;
  max-width: 540px;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 960px) {
    font-size: 16px;
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialLink = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_primary};
  display: grid;
  place-items: center;
  font-size: 18px;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 480px;
  margin-top: 28px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  padding: 14px 12px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.025);

  strong {
    display: block;
    font-family: "Syne", sans-serif;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.2;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const PortraitWrap = styled.div`
  position: relative;
  width: min(380px, 82vw);
`;

const Glow = styled.div`
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46, 230, 199, 0.28), transparent 68%);
  filter: blur(18px);
  z-index: 0;
`;

const Img = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center 22%;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow:
    0 0 0 8px rgba(46, 230, 199, 0.08),
    0 20px 60px rgba(0, 0, 0, 0.4);
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
  opacity: 0.55;

  @media (max-width: 960px) {
    justify-content: center;
    opacity: 0.35;
  }
`;

export const HeroSection = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Status>
                  <Pulse />
                  Open to new opportunities
                </Status>
                <Greeting>Hello, I am</Greeting>
                <Title>{Bio.name}</Title>
                <TextLoop>
                  I build as a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>
              <SubTitle>{Bio.description}</SubTitle>
              <CtaRow>
                <PrimaryButton href={Bio.resume} target="_blank" rel="noreferrer">
                  View Resume
                </PrimaryButton>
                <GhostButton href="#Projects">See work</GhostButton>
              </CtaRow>
              <SocialRow>
                <SocialLink href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </SocialLink>
                <SocialLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </SocialLink>
              </SocialRow>
              <Stats>
                <Stat>
                  <strong>3+</strong>
                  <span>Years crafting products</span>
                </Stat>
                <Stat>
                  <strong>{projects.length}</strong>
                  <span>Shipped projects</span>
                </Stat>
                <Stat>
                  <strong>Now</strong>
                  <span>
                    {experiences[0]?.role} @ {experiences[0]?.company}
                  </span>
                </Stat>
              </Stats>
            </HeroLeftContainer>
            <HeroRightContainer>
              <Tilt glareEnable glareMaxOpacity={0.12} scale={1.02}>
                <PortraitWrap>
                  <Glow />
                  <Img src={my_image} alt="Muhammad Khuzama" />
                </PortraitWrap>
              </Tilt>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};
