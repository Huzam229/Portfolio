import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import ProjectMedia from "./ProjectMedia";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: ${({ theme }) => theme.overlay};
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 96px 16px 32px;
  overflow-y: auto;
`;

const Dialog = styled(motion.div)`
  width: min(760px, 100%);
  max-height: calc(100vh - 128px);
  overflow: auto;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  position: relative;
  margin: 0 auto;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: ${({ theme }) => theme.card};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const HeaderCopy = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 4px;
`;

const HeaderTitle = styled.h3`
  font-family: "Syne", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Close = styled.button`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: grid;
  place-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const MediaWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Body = styled.div`
  padding: 24px 28px 28px;

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const Category = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.onPrimary};
  background: ${({ theme }) => theme.primary};
  padding: 5px 9px;
  border-radius: 999px;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  font-family: "Syne", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text_primary};

`;

const Date = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 24px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: rgba(46, 230, 199, 0.08);
  border: 1px solid rgba(46, 230, 199, 0.16);
  border-radius: 999px;
  padding: 5px 10px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Action = styled.a`
  flex: 1;
  min-width: 140px;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $filled }) => ($filled ? "transparent" : theme.border)};
  background: ${({ theme, $filled }) => ($filled ? theme.primary : "transparent")};
  color: ${({ theme, $filled }) =>
    $filled ? theme.onPrimary : theme.text_primary};
`;

const ProjectModal = ({ item, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <Overlay
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Dialog
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <Header>
              <HeaderCopy>
                <Eyebrow>Project details</Eyebrow>
                <HeaderTitle>{item.title}</HeaderTitle>
              </HeaderCopy>
              <Close
                ref={closeRef}
                type="button"
                aria-label="Close project details"
                onClick={onClose}
              >
                <IoClose size={22} />
              </Close>
            </Header>
            <MediaWrap>
              <ProjectMedia
                src={item.image}
                alt={`${item.title} screenshot`}
                title={item.title}
                position={item.imagePosition}
                eager
              />
            </MediaWrap>
            <Body>
              <Category>{item.category}</Category>
              <Title id="project-modal-title">{item.title}</Title>
              <Date>{item.date}</Date>
              <Description>{item.description}</Description>
              <Tags>
                {item.tags?.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
              <Actions>
                <Action href={item.github} target="_blank" rel="noreferrer">
                  View code
                </Action>
                {item.live && (
                  <Action href={item.live} target="_blank" rel="noreferrer" $filled>
                    Live preview
                  </Action>
                )}
              </Actions>
            </Body>
          </Dialog>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
