import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.bgLight};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: ${({ $position }) => $position || "center"};
  transition: transform 0.55s ease;

  [data-project-card]:hover & {
    transform: scale(1.06);
  }
`;

const Fallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 16px;
  text-align: center;
  font-family: "Syne", sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.text_primary};
  background:
    radial-gradient(circle at 20% 20%, rgba(46, 230, 199, 0.16), transparent 42%),
    radial-gradient(circle at 80% 80%, rgba(232, 192, 122, 0.12), transparent 46%),
    ${({ theme }) => theme.bgLight};
`;

const ProjectMedia = ({ src, alt, title, position, eager = false }) => {
  const [failed, setFailed] = useState(false);

  return (
    <Frame>
      {failed || !src ? (
        <Fallback>{title || alt}</Fallback>
      ) : (
        <Img
          src={src}
          alt={alt}
          width={1400}
          height={788}
          $position={position}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </Frame>
  );
};

export default ProjectMedia;
