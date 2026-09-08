import { useEffect, useState } from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 100%;
  z-index: 40;
  pointer-events: none;
  background: transparent;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: linear-gradient(90deg, #2ee6c7, #e8c07a);
  box-shadow: 0 0 12px rgba(46, 230, 199, 0.45);
  transition: width 0.08s linear;
`;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Bar aria-hidden="true">
      <Fill $progress={progress} />
    </Bar>
  );
};

export default ScrollProgress;
