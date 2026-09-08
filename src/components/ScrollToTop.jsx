import { useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardArrowUp } from "@mui/icons-material";

const Button = styled.button`
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 30;
  width: 46px;
  height: 46px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.primary};
  backdrop-filter: blur(14px);
  cursor: pointer;
  display: grid;
  place-items: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "12px")});
  transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 640px) {
    right: 16px;
    bottom: 16px;
  }
`;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      type="button"
      $visible={visible}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <KeyboardArrowUp />
    </Button>
  );
};

export default ScrollToTop;
