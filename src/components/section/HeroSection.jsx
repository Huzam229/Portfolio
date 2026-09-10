import { lazy, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { Bio, experiences, projects } from "../../data/constants";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { fadeUp, headContainerAnimation, scaleIn, staggerContainer, staggerFast } from "../../utils/motion";
import { PrimaryButton, GhostButton } from "../shared/Buttons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const HeroBgAnimation = lazy(() => import("../HeroBgAnimation"));

const HeroContainer = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 72px 30px 96px;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 960px) {
    padding: 36px 16px 56px;
    text-align: center;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 28px;
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
    max-width: 520px;
    margin: 0 auto;
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
    transform: none;
    margin-top: 0;
    justify-content: center;
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
  text-wrap: balance;

  @media (max-width: 960px) {
    font-size: clamp(30px, 8.4vw, 42px);
    width: 100%;
  }
`;

const Profession = styled.p`
  margin-top: 10px;
  font-size: clamp(18px, 2.4vw, 22px);
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 0;
    gap: 4px;
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
    margin-left: auto;
    margin-right: auto;
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
  width: 100%;

  @media (max-width: 960px) {
    justify-content: center;
    align-items: center;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;

  @media (max-width: 960px) {
    justify-content: center;
    width: 100%;
  }
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

  @media (max-width: 960px) {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const Stat = styled.div`
  padding: 14px 12px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.025);

  @media (max-width: 960px) {
    text-align: center;
    padding: 12px 8px;
  }

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

const PortraitWrap = styled(motion.div)`
  position: relative;
  width: min(380px, 82vw);
  margin: 0 auto;
`;

const Glow = styled.div`
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.glow}, transparent 68%);
  filter: blur(18px);
  z-index: 0;
  animation: glowPulse 5.5s ease-in-out infinite;

  @keyframes glowPulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.85;
    }
    50% {
      transform: scale(1.08);
      opacity: 1;
    }
  }
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
    0 0 0 8px ${({ theme }) => theme.glow},
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

const CopyStack = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 960px) {
    align-items: center;
    text-align: center;

    & > * {
      width: 100%;
    }
  }
`;

export const HeroSection = () => {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const portrait = (
    <PortraitWrap variants={scaleIn} initial="hidden" animate="show">
      <Glow />
      <Img
        src="/profile.jpg"
        width={380}
        height={380}
        fetchPriority="high"
        alt="Muhammad Khuzama, Full Stack and Android developer"
      />
    </PortraitWrap>
  );

  return (
    <HeroContainer id="about" aria-labelledby="hero-name">
      {desktop && (
        <HeroBg>
          <Suspense fallback={null}>
            <HeroBgAnimation />
          </Suspense>
        </HeroBg>
      )}
      <motion.div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
        {...headContainerAnimation}
      >
        <HeroInnerContainer>
          <HeroLeftContainer>
            <CopyStack initial="hidden" animate="show" variants={staggerContainer}>
              <motion.div variants={fadeUp}>
                <Status>
                  <Pulse />
                  Open to new opportunities
                </Status>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Greeting>Hello, I am</Greeting>
                <Title id="hero-name">{Bio.name}</Title>
                <Profession>Full Stack &amp; Android Developer</Profession>
              </motion.div>
              <motion.div variants={fadeUp}>
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
              <motion.div variants={fadeUp}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>
              <motion.div variants={fadeUp}>
                <CtaRow>
                  <PrimaryButton href={Bio.resume} target="_blank" rel="noreferrer">
                    View Resume
                  </PrimaryButton>
                  <GhostButton href="#Projects">See work</GhostButton>
                </CtaRow>
              </motion.div>
              <motion.div variants={fadeUp}>
                <SocialRow>
                  <SocialLink href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </SocialLink>
                  <SocialLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </SocialLink>
                </SocialRow>
              </motion.div>
              <Stats as={motion.div} variants={staggerFast}>
                <Stat as={motion.div} variants={fadeUp}>
                  <strong>3+</strong>
                  <span>Years crafting products</span>
                </Stat>
                <Stat as={motion.div} variants={fadeUp}>
                  <strong>{projects.length}</strong>
                  <span>Shipped projects</span>
                </Stat>
                <Stat as={motion.div} variants={fadeUp}>
                  <strong>Now</strong>
                  <span>
                    {experiences[0]?.role} @ {experiences[0]?.company}
                  </span>
                </Stat>
              </Stats>
            </CopyStack>
          </HeroLeftContainer>
          <HeroRightContainer>
            {desktop ? (
              <Tilt glareEnable glareMaxOpacity={0.12} scale={1.02}>
                {portrait}
              </Tilt>
            ) : (
              portrait
            )}
          </HeroRightContainer>
        </HeroInnerContainer>
      </motion.div>
    </HeroContainer>
  );
};

