import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Bio } from "../data/constants";

const LINKS = [
  { href: "#Skills", label: "Skills" },
  { href: "#Projects", label: "Projects" },
  { href: "#Contact", label: "Contact" },
];

const FooterWrap = styled.footer`
  position: relative;
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: rgba(5, 6, 10, 0.7);
  backdrop-filter: blur(12px);
`;

const Inner = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 28px 24px;
  display: grid;
  grid-template-columns: 1.4fr auto auto;
  align-items: center;
  gap: 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const Copy = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.6;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
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

const Footer = () => {
  return (
    <FooterWrap>
      <Inner>
        <Copy>
          © {new Date().getFullYear()} <span>{Bio.name}</span> · Designed to
          feel like a product, not a template.
        </Copy>
        <NavLinks>
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </NavLinks>
        <Socials>
          <SocialLink href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </SocialLink>
          <SocialLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialLink>
        </Socials>
      </Inner>
    </FooterWrap>
  );
};

export default Footer;
